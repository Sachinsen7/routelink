import { FastifyInstance } from 'fastify'
import { registerHealthRoutes } from './routes/health'
import { registerUserRoutes } from './routes/users'

export async function registerHttpRoutes(app: FastifyInstance) {
    await registerHealthRoutes(app)
    await registerUserRoutes(app)
}
