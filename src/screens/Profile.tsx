import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Center, VStack, Heading, ScrollView, Skeleton } from 'native-base'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreensHeader } from '@components/ScreensHeader'

export function Profile() {
    const [userPhotoIsLoading, setUserPhotoIsLoading] = useState(false)

    const PHOTO_SIZE = 33

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
                                source={{ uri: "http://github.com/jose-xavier.png" }}
                                alt="Foto do usuario"
                                size={PHOTO_SIZE}
                                rounded="full"
                            />
                    }

                    <TouchableOpacity>
                        <Heading color="green.500" fontSize="md" mt={3} mb={6}>
                            Alterar foto
                        </Heading>
                    </TouchableOpacity>
                </Center>

                <VStack px={10}>
                    <Input
                        placeholder="Nome"
                        bg="gray.600"
                    />

                    <Input
                        placeholder="nettoxavier23@gmail.com"
                        isDisabled
                        _disabled={{
                            bg: "gray.500"
                        }}
                    />
                </VStack>

                <VStack mt={6} px={10}>
                    <Heading fontSize="md" color="gray.200" mb={2}>
                        Alterar senha
                    </Heading>

                    <Input
                        placeholder="Senha antiga"
                        bg="gray.600"
                        secureTextEntry
                    />

                    <Input
                        placeholder="Nova senha"
                        bg="gray.600"
                        secureTextEntry
                    />

                    <Input
                        placeholder="Confirme a nova senha"
                        bg="gray.600"
                        secureTextEntry
                    />

                    <Button
                        title="Atualizar"
                        mt={6}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    )
}