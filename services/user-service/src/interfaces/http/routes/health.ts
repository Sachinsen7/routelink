import { FastifyInstance } from 'fastify'
import { GetServiceInfo } from '../../../application/usecases/getServiceInfo'
import { StaticServiceInfoProvider } from '../../../infrastructure/providers/staticServiceInfoProvider'

export async function registerHealthRoutes(app: FastifyInstance) {
    const provider = new StaticServiceInfoProvider(
        'user-service',
        app.serviceVersion,
        'User profiles, ratings, and trust'
    )
    const usecase = new GetServiceInfo(provider)

    app.get('/health', async () => ({ status: 'ok' }))
    app.get('/info', async () => usecase.execute())
}
