import { FastifyInstance } from 'fastify'
import { registerAuthRoutes } from './routes/auth'
import { registerHealthRoutes } from './routes/health'

export async function registerHttpRoutes(app: FastifyInstance) {
    await registerHealthRoutes(app)
    await registerAuthRoutes(app)
}
