import { FastifyInstance } from 'fastify'
import { CreateChatRoom } from '../../../application/usecases/createChatRoom'
import { ListMessages } from '../../../application/usecases/listMessages'
import { SendMessage } from '../../../application/usecases/sendMessage'
import { PrismaChatRepository } from '../../../infrastructure/repositories/prismaChatRepository'

export async function registerChatRoutes(app: FastifyInstance) {
    const chatRepository = new PrismaChatRepository()
    const createChatRoom = new CreateChatRoom(chatRepository)
    const listMessages = new ListMessages(chatRepository)
    const sendMessage = new SendMessage(chatRepository)

    app.post('/chat/rooms', async (request, reply) => {
        try {
            const body = request.body as {
                routeId?: string
                routeRequestId?: string
                participantUserIds?: string[]
            }

            if (!body?.routeId || !body.participantUserIds?.length) {
                return reply
                    .code(400)
                    .send({ message: 'routeId and participantUserIds are required' })
            }

            const result = await createChatRoom.execute({
                routeId: body.routeId,
                routeRequestId: body.routeRequestId,
                participantUserIds: body.participantUserIds,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.get('/chat/messages', async (request, reply) => {
        const query = request.query as { roomId?: string }
        if (!query?.roomId) {
            return reply.code(400).send({ message: 'roomId is required' })
        }

        const messages = await listMessages.execute(query.roomId)
        return reply.send(messages)
    })

    app.post('/chat/send', async (request, reply) => {
        try {
            const body = request.body as {
                roomId?: string
                senderId?: string
                type?: 'TEXT' | 'IMAGE' | 'SYSTEM'
                content?: string
            }

            if (!body?.roomId || !body?.senderId || !body?.content) {
                return reply
                    .code(400)
                    .send({ message: 'roomId, senderId and content are required' })
            }

            const result = await sendMessage.execute({
                roomId: body.roomId,
                senderId: body.senderId,
                type: body.type || 'TEXT',
                content: body.content,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })
}
