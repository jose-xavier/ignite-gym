import { useCallback, useState } from 'react'
import { VStack, SectionList, Heading, Text, Center, useToast } from 'native-base'

import { HistoryCard } from '@components/HistoryCard'
import { ScreensHeader } from '@components/ScreensHeader'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import { Loading } from '@components/Loading'


export function History() {
    const [isLoading, setIsLoading] = useState(false)
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

    const toast = useToast()

    async function fetchHistoryExercise() {
        try {
            setIsLoading(true)

            const { data } = await api.get('/history')
            setExercises(data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar a lista de grupos musculares'

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
        fetchHistoryExercise()
    }, []))

    return (
        <VStack flex={1}>
            <ScreensHeader
                title="Histórico de Exercícios"
            />

            {!isLoading ?
                <SectionList
                    sections={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <HistoryCard data={item} />
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
                                Não há exercícios registrados ainda. {'\n'}
                                Vamos fazer exercícios hoje?
                            </Text>
                        </Center>
                    )}
                />
                : <Loading />
            }

        </VStack>
    )
}