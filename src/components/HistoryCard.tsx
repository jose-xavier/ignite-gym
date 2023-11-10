import { HStack, Heading, Text, VStack } from 'native-base'
import { HistoryDTO } from '@dtos/HistoryDTO'

type Props = {
    data: HistoryDTO
}

export function HistoryCard({ data }: Props) {

    return (
        <HStack
            bg="gray.600"
            py={4} px={5}
            mb={3}
            rounded="sm"
            w="full"
            justifyContent="space-between"
            alignItems="center"
        >

            <VStack>
                <Heading fontSize="md" color="white" textTransform="capitalize">
                    {data.group}
                </Heading>

                <Text fontSize="lg" color="gray.100" numberOfLines={1}>
                    {data.name}
                </Text>
            </VStack>

            <Text fontSize="md" color="gray.300" >
                {data.hour}
            </Text>
        </HStack>
    )
}