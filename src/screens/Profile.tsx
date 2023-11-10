import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, VStack, Heading, ScrollView, Skeleton, useToast } from 'native-base'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import * as yup from 'yup'
import { AppError } from '@utils/AppError'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import defaultUserPhotoImg from '../assets/userPhotoDefault.png'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreensHeader } from '@components/ScreensHeader'

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

const profileSchema = yup.object({
    name: yup
        .string()
        .required('Informe o nome'),
    password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        .nullable()
        .transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
        .when('password', {
            is: (Field: any) => Field,
            then: yup
                .string()
                .nullable()
                .required('Informe a confirmação da senha.')
                .transform((value) => !!value ? value : null)
        }),
})

export function Profile() {
    const [isUpdating, setIsUpdating] = useState(false)
    const [userPhotoIsLoading, setUserPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState()

    const toast = useToast()
    const { user, updateUserProfile } = useAuth()

    const PHOTO_SIZE = 33

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    })

    async function handleUserUpdate(data: FormDataProps) {
        try {
            setIsUpdating(true)

            const userUpdated = user
            userUpdated.name = data.name

            await api.put('/users', data)
            await updateUserProfile(userUpdated)

            toast.show({
                title: 'Perfil atualizado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível atualizar as informações do usuário.'

            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsUpdating(false)
        }
    }

    async function handleSelectUserPhoto() {
        try {
            setUserPhotoIsLoading(true)
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                selectionLimit: 1
            })

            if (photoSelected.canceled) {
                return
            }

            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
            }

            const fileExtension = photoSelected.assets[0].uri.split('.').pop()

            const photoFile = {
                name: `${user.name}.${fileExtension}`.toLowerCase(),
                uri: photoSelected.assets[0].uri,
                type: `${photoSelected.assets[0].type}/${fileExtension}`
            } as any

            const userPhotoUploadForm = new FormData()

            userPhotoUploadForm.append('avatar', photoFile)

            const userPhotoDataResponse = await api.patch('users/avatar', userPhotoUploadForm, {
                headers: {
                    'Content- Type': 'multipart/form-data'
                }
            })

            const userUpdated = user
            userUpdated.avatar = userPhotoDataResponse.data.avatar

            await updateUserProfile(userUpdated)

        } catch (error) {
            console.log(error)
        } finally {
            setUserPhotoIsLoading(false)
        }
    }

    return (
        <VStack flex={1}>
            <ScreensHeader
                title="Perfil"
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
                <Center mt={6}>

                    {
                        userPhotoIsLoading ?
                            <Skeleton
                                h={PHOTO_SIZE}
                                w={PHOTO_SIZE}
                                startColor="gray.400"
                                endColor="gray.600"
                                rounded="full"
                            />
                            :
                            <Avatar
                                source={user.avatar
                                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                                    : defaultUserPhotoImg}
                                alt="Foto do usuario"
                                size={PHOTO_SIZE}
                                rounded="full"
                            />
                    }

                    <TouchableOpacity onPress={handleSelectUserPhoto}>
                        <Heading color="green.500" fontSize="md" mt={3} mb={6}>
                            Alterar foto
                        </Heading>
                    </TouchableOpacity>
                </Center>

                <VStack px={10}>


                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                bg="gray.600"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                bg="gray.600"
                                placeholder="E-mail"
                                isDisabled
                                _disabled={{
                                    bgColor: 'gray.500'
                                }}
                                isReadOnly
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                </VStack>

                <VStack mt={6} px={10}>
                    <Heading fontSize="md" color="gray.200" mb={2}>
                        Alterar senha
                    </Heading>

                    <Controller
                        name="old_password"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha antiga"
                                bg="gray.600"
                                onChangeText={onChange}
                                errorMessage={errors.old_password?.message}
                                secureTextEntry
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Nova senha"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />

                        )}
                    />

                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field: { onChange } }) => (

                            <Input
                                placeholder="Confirme a nova senha"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />



                    <Button
                        onPress={handleSubmit(handleUserUpdate)}
                        title="Atualizar"
                        isLoading={isUpdating}
                        mt={6}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}