export interface CreateRoomInput {
    routeId: string
    routeRequestId?: string
    participantUserIds: string[]
}

export interface SendMessageInput {
    roomId: string
    senderId: string
    type: 'TEXT' | 'IMAGE' | 'SYSTEM'
    content: string
}

export interface ChatRepository {
    createRoom(input: CreateRoomInput): Promise<{ id: string }>
    listMessages(roomId: string): Promise<unknown[]>
    sendMessage(input: SendMessageInput): Promise<{ id: string }>
}
