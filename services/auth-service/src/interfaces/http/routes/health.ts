import { FastifyInstance } from 'fastify'
import { GetServiceInfo } from '../../../application/usecases/getServiceInfo'
import { StaticServiceInfoProvider } from '../../../infrastructure/providers/staticServiceInfoProvider'

export async function registerHealthRoutes(app: FastifyInstance) {
    const provider = new StaticServiceInfoProvider(
        'auth-service',
        app.serviceVersion,
        'Authentication and identity management'
    )
    const usecase = new GetServiceInfo(provider)

    app.get('/health', async () => ({ status: 'ok' }))
    app.get('/info', async () => usecase.execute())
}
