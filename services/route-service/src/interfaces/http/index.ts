import { FastifyInstance } from 'fastify'
import { registerHealthRoutes } from './routes/health'
import { registerRouteRoutes } from './routes/routes'

export async function registerHttpRoutes(app: FastifyInstance) {
    await registerHealthRoutes(app)
    await registerRouteRoutes(app)
}
