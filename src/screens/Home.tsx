import { useState } from 'react'
import { VStack, FlatList, Text, Heading, HStack, ScrollView } from 'native-base'

import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/ExerciseCard'

export function Home() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro'])
    const [groupSelected, setGroupSelected] = useState('Costas')
    const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terra'])

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        onPress={() => setGroupSelected(item)}
                        isActive={groupSelected === item}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
            />


            <VStack px={8} flex={1}>
                <HStack justifyContent="space-between" mb={3}>
                    <Heading
                        color="gray.200"
                        fontFamily="heading"
                        fontSize="md"
                    >
                        Exercícios
                    </Heading>

                    <Text
                        color="gray.200"
                        fontFamily="body"
                        fontSize="sm"
                        numberOfLines={2}
                        mt={1}
                    >
                        4
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 16 }}
                />

            </VStack>
        </VStack>
    )
}