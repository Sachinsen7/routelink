import { apiRequest } from '../http'
import type { ChatMessage, ChatRoom } from '../../types/chat'

export function createChatRoom(payload: {
    routeId: string
    routeRequestId?: string
    participantUserIds: string[]
}) {
    return apiRequest<ChatRoom>('chat', '/chat/rooms', {
        method: 'POST',
        auth: true,
        body: payload,
    })
}

export function listMessages(roomId: string) {
    return apiRequest<ChatMessage[]>(`chat`, `/chat/messages?roomId=${roomId}`, {
        auth: true,
    })
}

export function sendMessage(payload: {
    roomId: string
    senderId: string
    type?: 'TEXT' | 'IMAGE' | 'SYSTEM'
    content: string
}) {
    return apiRequest<{ id: string }>('chat', '/chat/send', {
        method: 'POST',
        auth: true,
        body: payload,
    })
}
