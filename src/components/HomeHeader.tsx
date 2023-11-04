import { HStack, VStack, Text, Heading, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { useAuth } from '@hooks/useAuth'

import { MaterialIcons } from '@expo/vector-icons'
import { Avatar } from './Avatar'
import defaultUserPhotoImg from '../assets/userPhotoDefault.png'

export function HomeHeader() {
    const { user, signOut } = useAuth()

    return (
        <HStack bg="gray.600" px={8} pt={16} pb={5} alignItems="center">
            <Avatar
                source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
                size={16}
            />
            <VStack flex={1} ml={4}>
                <Text color="gray.100" fontSize="md">
                    Olá,
                </Text>

                <Heading color="gray.100" fontSize="md">
                    {user.name}
                </Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>
                <Icon
                    as={MaterialIcons}
                    size={7}
                    name="logout"
                    color="gray.200"
                />
            </TouchableOpacity>
        </HStack>
    )
}