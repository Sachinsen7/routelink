import {
    ChatRepository,
    CreateRoomInput,
    SendMessageInput,
} from '../../application/ports/chatRepository'
import { prisma } from '../db/prisma'

export class PrismaChatRepository implements ChatRepository {
    async createRoom(input: CreateRoomInput) {
        const room = await prisma.chatRoom.create({
            data: {
                routeId: input.routeId,
                routeRequestId: input.routeRequestId,
                participants: {
                    create: input.participantUserIds.map((userId) => ({ userId })),
                },
            },
        })

        return { id: room.id }
    }

    async listMessages(roomId: string) {
        return prisma.message.findMany({
            where: { roomId },
            orderBy: { createdAt: 'asc' },
        })
    }

    async sendMessage(input: SendMessageInput) {
        const message = await prisma.message.create({
            data: {
                roomId: input.roomId,
                senderId: input.senderId,
                type: input.type,
                content: input.content,
            },
        })

        return { id: message.id }
    }
}
