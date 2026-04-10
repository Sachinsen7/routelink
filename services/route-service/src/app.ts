import Fastify from 'fastify'
import { registerHttpRoutes } from './interfaces/http'

declare module 'fastify' {
    interface FastifyInstance {
        serviceVersion: string
    }
}

export function buildApp() {
    const app = Fastify({ logger: true })
    app.decorate('serviceVersion', '0.1.0')

    app.register(registerHttpRoutes)

    return app
}
