import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"


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
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })
    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }

    function handleSignUp(data: FormDataProps) {
        console.log(data)
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