import { create } from 'zustand'

import { getErrorMessage } from '../api/errors'
import { createChatRoom, listMessages, sendMessage } from '../api/services/chat'
import type { ChatMessage } from '../types/chat'
import { useSessionStore } from './sessionStore'

type ChatState = {
    activeRoomId: string | null
    activeRouteId: string | null
    partnerName: string
    partnerSubtitle: string
    messages: ChatMessage[]
    loading: boolean
    sending: boolean
    error: string | null
    openRoom: (payload: {
        roomId: string
        routeId?: string
        partnerName?: string
        partnerSubtitle?: string
    }) => void
    ensureRoom: (payload: {
        routeId: string
        routeRequestId?: string
        participantUserIds: string[]
        partnerName?: string
        partnerSubtitle?: string
    }) => Promise<string | null>
    loadMessages: (roomId?: string) => Promise<void>
    sendTextMessage: (content: string) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
    activeRoomId: null,
    activeRouteId: null,
    partnerName: 'Verified traveler',
    partnerSubtitle: 'Traveling soon',
    messages: [],
    loading: false,
    sending: false,
    error: null,
    openRoom: ({ roomId, routeId, partnerName, partnerSubtitle }) =>
        set({
            activeRoomId: roomId,
            activeRouteId: routeId || null,
            partnerName: partnerName || 'Verified traveler',
            partnerSubtitle: partnerSubtitle || 'Traveling soon',
        }),
    ensureRoom: async (payload) => {
        try {
            const room = await createChatRoom({
                routeId: payload.routeId,
                routeRequestId: payload.routeRequestId,
                participantUserIds: payload.participantUserIds,
            })

            get().openRoom({
                roomId: room.id,
                routeId: payload.routeId,
                partnerName: payload.partnerName,
                partnerSubtitle: payload.partnerSubtitle,
            })

            return room.id
        } catch (error) {
            set({ error: getErrorMessage(error) })
            return null
        }
    },
    loadMessages: async (roomId) => {
        const targetRoomId = roomId || get().activeRoomId
        if (!targetRoomId) return

        set({ loading: true, error: null })

        try {
            const messages = await listMessages(targetRoomId)
            set({ messages, loading: false })
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
        }
    },
    sendTextMessage: async (content) => {
        const roomId = get().activeRoomId
        const senderId = useSessionStore.getState().userId
        if (!roomId || !senderId || !content.trim()) return

        const optimisticMessage: ChatMessage = {
            id: `optimistic-${Date.now()}`,
            roomId,
            senderId,
            type: 'TEXT',
            content,
            createdAt: new Date().toISOString(),
            optimistic: true,
        }

        set((state) => ({
            sending: true,
            messages: [...state.messages, optimisticMessage],
        }))

        try {
            const response = await sendMessage({
                roomId,
                senderId,
                content,
            })

            set((state) => ({
                sending: false,
                messages: state.messages.map((message) =>
                    message.id === optimisticMessage.id
                        ? { ...message, id: response.id, optimistic: false }
                        : message
                ),
            }))
        } catch (error) {
            set((state) => ({
                sending: false,
                error: getErrorMessage(error),
                messages: state.messages.filter((message) => message.id !== optimisticMessage.id),
            }))
        }
    },
}))
