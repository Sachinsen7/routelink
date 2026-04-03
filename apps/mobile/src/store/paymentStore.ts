import { create } from 'zustand'

import { getErrorMessage } from '../api/errors'
import { createPaymentIntent, getPaymentStatus } from '../api/services/payments'
import type { PaymentIntent, PaymentStatus } from '../types/payment'
import { useSessionStore } from './sessionStore'

type PaymentState = {
    currentIntent: PaymentIntent | null
    status: PaymentStatus | null
    loading: boolean
    error: string | null
    createIntent: (payload: { routeRequestId: string; amount: number }) => Promise<boolean>
    pollStatus: (paymentId?: string) => Promise<void>
    reset: () => void
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
    currentIntent: null,
    status: null,
    loading: false,
    error: null,
    createIntent: async ({ routeRequestId, amount }) => {
        const userId = useSessionStore.getState().userId
        if (!userId) return false

        set({ loading: true, error: null })

        try {
            const currentIntent = await createPaymentIntent({
                routeRequestId,
                userId,
                amount,
            })

            set({ currentIntent, loading: false })
            return true
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
            return false
        }
    },
    pollStatus: async (paymentId) => {
        const target = paymentId || get().currentIntent?.paymentId
        if (!target) return

        try {
            const status = await getPaymentStatus(target)
            set({ status })
        } catch (error) {
            set({ error: getErrorMessage(error) })
        }
    },
    reset: () => set({ currentIntent: null, status: null, error: null }),
}))
