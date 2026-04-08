import { FastifyInstance } from 'fastify'
import { GetServiceInfo } from '../../../application/usecases/getServiceInfo'
import { StaticServiceInfoProvider } from '../../../infrastructure/providers/staticServiceInfoProvider'

export async function registerHealthRoutes(app: FastifyInstance) {
    const provider = new StaticServiceInfoProvider(
        'notification-service',
        app.serviceVersion,
        'Push, email, and SMS notifications'
    )
    const usecase = new GetServiceInfo(provider)

    app.get('/health', async () => ({ status: 'ok' }))
    app.get('/info', async () => usecase.execute())
}
