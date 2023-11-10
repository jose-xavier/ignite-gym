import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { VStack, FlatList, Text, Heading, HStack, ScrollView, useToast } from 'native-base'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { AppError } from '@utils/AppError'

import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/ExerciseCard'
import { Loading } from '@components/Loading'

export function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<string[]>([])
    const [groupSelected, setGroupSelected] = useState('antebraço')
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const toast = useToast()

    function handleOpenExerciseDatails(exerciseId: string) {
        navigation.navigate('exercise', { exerciseId })
    }

    async function fetchGroups() {
        try {
            const { data } = await api.get('/groups')
            setGroups(data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar a lista de grupos musculares'

            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsLoading(true)
            const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
            setExercises(data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível carregar a lista de excercícios"

            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup()
    }, [groupSelected]))

    useEffect(() => {
        fetchGroups()
    }, [])

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

            {isLoading ? <Loading /> :
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
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard
                                data={item}
                                onPress={() => handleOpenExerciseDatails(item.id)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ paddingBottom: 16 }}
                    />

                </VStack>
            }
        </VStack>
    )
}