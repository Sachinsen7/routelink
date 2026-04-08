import { FastifyInstance } from 'fastify'
import { registerChatRoutes } from './routes/chat'
import { registerHealthRoutes } from './routes/health'

export async function registerHttpRoutes(app: FastifyInstance) {
    await registerHealthRoutes(app)
    await registerChatRoutes(app)
}
