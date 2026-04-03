import { create } from 'zustand'

import { getErrorMessage } from '../api/errors'
import { listNotifications } from '../api/services/notifications'
import type { NotificationItem } from '../types/notification'
import { useSessionStore } from './sessionStore'

type NotificationsFilter = 'ALL' | 'MESSAGES' | 'REQUESTS' | 'PAYMENTS'

type NotificationsState = {
    items: NotificationItem[]
    filter: NotificationsFilter
    loading: boolean
    error: string | null
    setFilter: (filter: NotificationsFilter) => void
    loadNotifications: () => Promise<void>
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
    items: [],
    filter: 'ALL',
    loading: false,
    error: null,
    setFilter: (filter) => set({ filter }),
    loadNotifications: async () => {
        const userId = useSessionStore.getState().userId
        if (!userId) return

        set({ loading: true, error: null })

        try {
            const items = await listNotifications(userId)
            set({ items, loading: false })
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
        }
    },
}))
