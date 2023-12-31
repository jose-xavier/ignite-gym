import { ReactNode, createContext, useEffect, useState } from 'react'
import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'

import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/StorageUser'
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/StorageAuthToken'

type AuthContextDataProps = {
    user: UserDTO
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    isLoadingUserStorage: boolean
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

    function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(userData)
    }

    async function updateUserProfile(userUpdated: UserDTO) {
        try {
            setUser(userUpdated)
            await storageUserSave(userUpdated)

        } catch (error) {
            throw error
        }
    }

    async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
        try {
            setIsLoadingUserStorage(true)

            await storageUserSave(userData)
            await storageAuthTokenSave({ token, refresh_token })
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorage(false)
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('sessions', { email, password })

            if (data.token && data.user && data.refresh_token) {
                await storageUserAndTokenSave(data.user, data.token, data.refresh_token)
                userAndTokenUpdate(data.user, data.token)
            }
        } catch (error) {
            throw error
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorage(true)

            setUser({} as UserDTO)
            await storageUserRemove()
            await storageAuthTokenRemove()

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorage(false)
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorage(true)

            const userLogged = await storageUserGet()
            const { token } = await storageAuthTokenGet()

            if (userLogged && token) {
                userAndTokenUpdate(userLogged, token)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorage(false)
        }
    }


    useEffect(() => {
        loadUserData()
    }, [])

    useEffect(() => {
        const subscribe = api.registerInterceptionTokenManage(signOut)

        return () => {
            subscribe()
        }
    }, [signOut])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            isLoadingUserStorage,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider >
    )
}