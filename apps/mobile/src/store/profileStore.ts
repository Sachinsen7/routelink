import { create } from 'zustand'

import { getErrorMessage } from '../api/errors'
import {
    getUserProfile,
    listUserReviews,
    updateUserProfile,
    verifyUserId,
} from '../api/services/user'
import type { UpdateProfilePayload, UserProfile, UserReview } from '../types/user'
import { useSessionStore } from './sessionStore'

type ProfileState = {
    profile: UserProfile | null
    reviews: UserReview[]
    loading: boolean
    saving: boolean
    verifying: boolean
    error: string | null
    loadProfile: () => Promise<void>
    saveProfile: (payload: UpdateProfilePayload) => Promise<boolean>
    loadReviews: () => Promise<void>
    submitVerification: (documentNumber: string) => Promise<boolean>
}

export const useProfileStore = create<ProfileState>((set) => ({
    profile: null,
    reviews: [],
    loading: false,
    saving: false,
    verifying: false,
    error: null,
    loadProfile: async () => {
        const userId = useSessionStore.getState().userId
        if (!userId) return

        set({ loading: true, error: null })

        try {
            const profile = await getUserProfile(userId)
            set({ profile, loading: false })
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
        }
    },
    saveProfile: async (payload) => {
        const userId = useSessionStore.getState().userId
        if (!userId) return false

        set({ saving: true, error: null })

        try {
            const profile = await updateUserProfile(userId, payload)
            set({ profile, saving: false })
            return true
        } catch (error) {
            set({ saving: false, error: getErrorMessage(error) })
            return false
        }
    },
    loadReviews: async () => {
        const userId = useSessionStore.getState().userId
        if (!userId) return

        try {
            const reviews = await listUserReviews(userId)
            set({ reviews })
        } catch (error) {
            set({ error: getErrorMessage(error) })
        }
    },
    submitVerification: async (documentNumber) => {
        const userId = useSessionStore.getState().userId
        if (!userId) return false

        set({ verifying: true, error: null })

        try {
            await verifyUserId(userId, documentNumber)
            set({ verifying: false })
            return true
        } catch (error) {
            set({ verifying: false, error: getErrorMessage(error) })
            return false
        }
    },
}))
