import { TouchableOpacity } from 'react-native'
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base'

import { Entypo } from '@expo/vector-icons'

export function ExerciseCard() {
    return (
        <HStack bg="gray.500" p={2} rounded="md" alignItems="center" mb={3}>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcgUueK2HZPalWhdGbEOylLsudEeYcBjqXx7fRL-xXzyQxBk_rMzpMisfMTDaWF79Xgg&usqp=CAU' }}
                h={16}
                w={16}
                alt="Foto do exercício"
                rounded="sm"
            />
            <VStack flex={1} ml={4}>
                <Heading color="white" fontSize="lg" fontFamily="heading">
                    Puxada Frontal
                </Heading>
                <Text color="gray.200" fontSize="sm">
                    3 séries x 12 repetições
                </Text>
            </VStack>

            <TouchableOpacity>
                <Icon
                    as={Entypo}
                    name='chevron-thin-right'
                    color="gray.200"
                    mr={2}
                    size={5}
                />
            </TouchableOpacity>
        </HStack>
    )
}