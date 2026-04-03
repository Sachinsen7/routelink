import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { registerSessionSync, setRuntimeSession } from '../api/session-runtime'
import type { AuthSession } from '../types/auth'

type SessionState = {
    accessToken: string | null
    refreshToken: string | null
    userId: string | null
    hasHydrated: boolean
    setSession: (session: AuthSession) => void
    logout: () => void
    setHasHydrated: (value: boolean) => void
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            userId: null,
            hasHydrated: false,
            setSession: (session) => {
                setRuntimeSession(session)
                set({
                    accessToken: session.accessToken,
                    refreshToken: session.refreshToken,
                    userId: session.userId,
                })
            },
            logout: () => {
                setRuntimeSession(null)
                set({
                    accessToken: null,
                    refreshToken: null,
                    userId: null,
                })
            },
            setHasHydrated: (value) => set({ hasHydrated: value }),
        }),
        {
            name: 'routelink-session',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                userId: state.userId,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)

                if (state?.accessToken && state.refreshToken && state.userId) {
                    setRuntimeSession({
                        accessToken: state.accessToken,
                        refreshToken: state.refreshToken,
                        userId: state.userId,
                    })
                }
            },
        }
    )
)

registerSessionSync((session) => {
    if (!session) {
        useSessionStore.setState({
            accessToken: null,
            refreshToken: null,
            userId: null,
        })
        return
    }

    useSessionStore.setState({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        userId: session.userId,
    })
})
