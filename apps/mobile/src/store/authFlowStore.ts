import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { getErrorMessage } from '../api/errors'
import { requestOtp, verifyOtp } from '../api/services/auth'
import type { OtpPurpose } from '../types/auth'
import { useSessionStore } from './sessionStore'

type AuthFlowState = {
    onboardingCompleted: boolean
    mode: OtpPurpose
    phone: string
    name: string
    email: string
    expiresAt: string | null
    loading: boolean
    error: string | null
    setMode: (mode: OtpPurpose) => void
    setField: (field: 'phone' | 'name' | 'email', value: string) => void
    completeOnboarding: () => void
    requestOtpCode: () => Promise<boolean>
    verifyOtpCode: (code: string) => Promise<boolean>
    resetChallenge: () => void
}

export const useAuthFlowStore = create<AuthFlowState>()(
    persist(
        (set, get) => ({
            onboardingCompleted: false,
            mode: 'LOGIN',
            phone: '',
            name: '',
            email: '',
            expiresAt: null,
            loading: false,
            error: null,
            setMode: (mode) => set({ mode, error: null }),
            setField: (field, value) => set({ [field]: value } as Partial<AuthFlowState>),
            completeOnboarding: () => set({ onboardingCompleted: true }),
            requestOtpCode: async () => {
                const { mode, phone, name, email } = get()
                set({ loading: true, error: null })

                try {
                    const result = await requestOtp({
                        phone,
                        purpose: mode,
                        name: mode === 'SIGNUP' ? name : undefined,
                        email: mode === 'SIGNUP' ? email || undefined : undefined,
                    })

                    set({
                        expiresAt: result.expiresAt,
                        loading: false,
                    })

                    return true
                } catch (error) {
                    set({
                        loading: false,
                        error: getErrorMessage(error),
                    })

                    return false
                }
            },
            verifyOtpCode: async (code) => {
                const { mode, phone } = get()
                set({ loading: true, error: null })

                try {
                    const result = await verifyOtp({
                        phone,
                        code,
                        purpose: mode,
                    })

                    useSessionStore.getState().setSession({
                        accessToken: result.tokens.accessToken,
                        refreshToken: result.tokens.refreshToken,
                        userId: result.userId,
                    })

                    set({
                        onboardingCompleted: true,
                        loading: false,
                        error: null,
                    })

                    return true
                } catch (error) {
                    set({
                        loading: false,
                        error: getErrorMessage(error),
                    })

                    return false
                }
            },
            resetChallenge: () => set({ expiresAt: null, error: null }),
        }),
        {
            name: 'routelink-auth-flow',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                onboardingCompleted: state.onboardingCompleted,
                mode: state.mode,
                phone: state.phone,
                name: state.name,
                email: state.email,
            }),
        }
    )
)
