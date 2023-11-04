import { useState } from 'react'
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '@hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import * as yup from "yup"

import { AppError } from '@utils/AppError'

import BackgroundImg from './../assets/background.png'
import Logo from './../assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'


type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe seu nome.'),
    email: yup.string().required('Informe seu email.').email('O email informado não é valido'),
    password: yup.string().required('Informe sua senha').min(6, 'A senha deve ter no minimo 6 caracteres.'),
    password_confirm: yup.string().required('Informe a confirmação da senha').oneOf([yup.ref('password'), 'A confirmação da senha não confere'])
})


export function SignUp() {
    const [isLoading, setIsLoading] = useState(false)

    const { signIn } = useAuth()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })
    const navigation = useNavigation()
    const toast = useToast()

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp({ name, email, password }: FormDataProps) {
        try {
            setIsLoading(true)

            await api.post('/users', {
                name,
                email,
                password
            })

            await signIn(email, password)

        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível criar a conta tente mais tarde.'

            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} bg="gray.700" px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>
                    <Logo />
                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center mb={'20'}>
                    <Heading mb="18" color="gray.100" fontSize="xl" fontFamily="heading">
                        Crie sua conta
                    </Heading>


                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}

                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />


                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />

                        )}
                    />

                    <Controller
                        name="password_confirm"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password_confirm?.message}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                            />

                        )}
                    />


                    <Button
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>


                <Button
                    title="Voltar para o login"
                    variant="outline"
                    onPress={handleGoBack}
                />

            </VStack>
        </ScrollView>
    )
}