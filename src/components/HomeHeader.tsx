import { HStack, VStack, Text, Heading, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { Avatar } from './Avatar'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
    return (
        <HStack bg="gray.600" px={8} pt={16} pb={5} alignItems="center">
            <Avatar
                source={{ uri: "https://github.com/jose-xavier.png" }}
                size={16}
            />
            <VStack flex={1} ml={4}>
                <Text color="gray.100" fontSize="md">
                    Olá,
                </Text>

                <Heading color="gray.100" fontSize="md">
                    José Xavier
                </Heading>
            </VStack>

            <TouchableOpacity>
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