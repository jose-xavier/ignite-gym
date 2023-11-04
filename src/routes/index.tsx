import { Box, useTheme } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'


export function Routes() {
    const { user, isLoadingUserStorage } = useAuth()
    const { colors } = useTheme()

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    if (isLoadingUserStorage) {
        return <Loading />
    }

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>

    )
}