import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base'

import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'

import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
    data: ExerciseDTO
}


export function ExerciseCard({ data, ...rest }: Props) {

    return (
        <TouchableOpacity {...rest}>
            <HStack bg="gray.500" p={2} rounded="md" alignItems="center" mb={3}>
                <Image
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
                    h={16}
                    w={16}
                    alt="Foto do exercício"
                    rounded="sm"
                />
                <VStack flex={1} ml={4}>
                    <Heading color="white" fontSize="lg" fontFamily="heading">
                        {data.name}
                    </Heading>
                    <Text color="gray.200" fontSize="sm">
                        {`${data.series} séries x ${data.repetitions} repetições`}
                    </Text>
                </VStack>


                <Icon
                    as={Entypo}
                    name='chevron-thin-right'
                    color="gray.200"
                    mr={2}
                    size={5}
                />

            </HStack>
        </TouchableOpacity>
    )
}