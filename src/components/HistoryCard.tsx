import { HStack, Heading, Text, VStack } from 'native-base';

export function HistoryCard() {
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
                    Costas
                </Heading>

                <Text fontSize="lg" color="gray.100" numberOfLines={1}>
                    Puxada frontal
                </Text>
            </VStack>

            <Text fontSize="md" color="gray.300" >
                08:56
            </Text>
        </HStack>
    )
}