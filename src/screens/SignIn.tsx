import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

import BackgroundImg from './../assets/background.png'
import Logo from './../assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

type FormDataProps = {
    email: string
    password: string

}

const signInSchema = yup.object({
    email: yup.string().required('Informe seu email.').email('O email informado não é válido.'),
    password: yup.string().required('Informe sua senha')
})

export function SignIn() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    })
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleNewAccount() {
        try {
            navigation.navigate('signUp')
        } catch (error) {
            console.error('Navigation error:', error)
        }
    }

    function handleSignIn(data: FormDataProps) {
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

                <Center>
                    <Heading mb="18" color="gray.100" fontSize="xl" fontFamily="heading">
                        Acesse sua conta
                    </Heading>

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
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType="send"
                            />

                        )}
                    />

                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)}
                    />
                </Center>



                <Center mt={24}>
                    <Text color="gray.100" mb={2} fontSize="md" fontFamily="body" >
                        Ainda não tem acesso?
                    </Text>

                    <Button
                        title="Criar conta"
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>


            </VStack>
        </ScrollView>
    )
}