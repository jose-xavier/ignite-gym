import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import BackgroundImg from './../assets/background.png'
import Logo from './../assets/logo.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'

export function SignUp() {
    const navigation = useNavigation()

    function handleGoBack() {
        navigation.goBack()
    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} bg="gray.700" px={10} pb={16}>
                <Image
                    source={BackgroundImg}
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


                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"

                    />


                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Input
                        placeholder="Confirme a senha"
                        secureTextEntry
                    />

                    <Button
                        title="Criar e acessar"
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