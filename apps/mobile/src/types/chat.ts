export type ChatMessage = {
    id: string
    roomId: string
    senderId: string
    type: 'TEXT' | 'IMAGE' | 'SYSTEM'
    content: string
    createdAt: string
    optimistic?: boolean
}

export type ChatRoom = {
    id: string
}
