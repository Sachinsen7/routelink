import { FastifyInstance } from 'fastify'
import { registerHealthRoutes } from './routes/health'
import { registerPaymentRoutes } from './routes/payments'

export async function registerHttpRoutes(app: FastifyInstance) {
    await registerHealthRoutes(app)
    await registerPaymentRoutes(app)
}
