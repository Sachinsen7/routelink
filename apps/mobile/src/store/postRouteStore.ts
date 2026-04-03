import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { getErrorMessage } from '../api/errors'
import { createRoute } from '../api/services/routes'
import type { CreateRoutePayload } from '../types/route'
import { useSessionStore } from './sessionStore'

const initialDraft: CreateRoutePayload = {
    fromCity: 'Indiranagar, Bangalore',
    toCity: '',
    departureDate: '',
    departureTime: '',
    transportMode: 'Private SUV',
    seatsTotal: 2,
    price: 1450,
    description: '',
}

type PostRouteState = {
    draft: CreateRoutePayload
    saving: boolean
    error: string | null
    updateDraft: (patch: Partial<CreateRoutePayload>) => void
    resetDraft: () => void
    submitDraft: () => Promise<string | null>
}

export const usePostRouteStore = create<PostRouteState>()(
    persist(
        (set, get) => ({
            draft: initialDraft,
            saving: false,
            error: null,
            updateDraft: (patch) =>
                set((state) => ({
                    draft: {
                        ...state.draft,
                        ...patch,
                    },
                })),
            resetDraft: () => set({ draft: initialDraft, error: null }),
            submitDraft: async () => {
                const userId = useSessionStore.getState().userId
                if (!userId) return null

                set({ saving: true, error: null })

                try {
                    const result = await createRoute(userId, get().draft)
                    set({ saving: false, draft: initialDraft })
                    return result.id
                } catch (error) {
                    set({ saving: false, error: getErrorMessage(error) })
                    return null
                }
            },
        }),
        {
            name: 'routelink-post-route-draft',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                draft: state.draft,
            }),
        }
    )
)
