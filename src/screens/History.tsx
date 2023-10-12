import { useState } from 'react'
import { VStack, SectionList, Heading, Text, Flex, Center } from 'native-base';

import { HistoryCard } from '@components/HistoryCard';
import { ScreensHeader } from '@components/ScreensHeader';

export function History() {
    const [exercises, setExercises] = useState([
        {
            title: '10.10.2023',
            data: ['Puxada frontal', 'Remada unilateral'],
        },
        {
            title: '11.10.2023',
            data: ['Remada curvada'],
        },
    ])

    return (
        <VStack flex={1}>
            <ScreensHeader
                title="Histórico de Exercícios"
            />

            <SectionList
                sections={exercises}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Heading color="gray.200" fontSize="md" mb={3} mt={8}>
                        {title}
                    </Heading>
                )}
                px={8}
                contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: "center" }}
                ListEmptyComponent={() => (
                    <Center>
                        <Text color="gray.100" textAlign="center">
                            Não há exercícios registrados ainda. {'/n'}
                            Vamos fazer exercícios hoje?
                        </Text>
                    </Center>
                )}
            />

        </VStack>
    )
}