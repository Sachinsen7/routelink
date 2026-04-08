import { FastifyInstance } from 'fastify'
import { registerHealthRoutes } from './routes/health'
import { registerNotificationRoutes } from './routes/notifications'

export async function registerHttpRoutes(app: FastifyInstance) {
    await registerHealthRoutes(app)
    await registerNotificationRoutes(app)
}
