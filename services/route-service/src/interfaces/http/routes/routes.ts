import { FastifyInstance } from 'fastify'
import { CreateRoute } from '../../../application/usecases/createRoute'
import { GetRouteById } from '../../../application/usecases/getRouteById'
import { RequestRoute } from '../../../application/usecases/requestRoute'
import { SearchRoutes } from '../../../application/usecases/searchRoutes'
import { PrismaRouteRepository } from '../../../infrastructure/repositories/prismaRouteRepository'

export async function registerRouteRoutes(app: FastifyInstance) {
    const routeRepository = new PrismaRouteRepository()
    const createRoute = new CreateRoute(routeRepository)
    const searchRoutes = new SearchRoutes(routeRepository)
    const getRouteById = new GetRouteById(routeRepository)
    const requestRoute = new RequestRoute(routeRepository)

    app.post('/routes', async (request, reply) => {
        try {
            const body = request.body as {
                userId?: string
                fromCity?: string
                toCity?: string
                fromLat?: number
                fromLng?: number
                toLat?: number
                toLng?: number
                departureTime?: string
                transportMode?: string
                seatsTotal?: number
                price?: number
                description?: string
            }

            if (
                !body?.userId ||
                !body?.fromCity ||
                !body?.toCity ||
                !body?.departureTime ||
                !body?.transportMode
            ) {
                return reply.code(400).send({ message: 'missing required route fields' })
            }

            const result = await createRoute.execute({
                userId: body.userId,
                fromCity: body.fromCity,
                toCity: body.toCity,
                fromLat: Number(body.fromLat || 0),
                fromLng: Number(body.fromLng || 0),
                toLat: Number(body.toLat || 0),
                toLng: Number(body.toLng || 0),
                departureTime: new Date(body.departureTime),
                transportMode: body.transportMode,
                seatsTotal: Number(body.seatsTotal || 0),
                price: Number(body.price || 0),
                description: body.description,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.get('/routes/search', async (request, reply) => {
        const query = request.query as {
            fromCity?: string
            toCity?: string
            departureAfter?: string
        }

        const result = await searchRoutes.execute({
            fromCity: query.fromCity,
            toCity: query.toCity,
            departureAfter: query.departureAfter ? new Date(query.departureAfter) : undefined,
        })

        return reply.send(result)
    })

    app.get('/routes/:id', async (request, reply) => {
        const params = request.params as { id: string }
        const result = await getRouteById.execute(params.id)

        if (!result) {
            return reply.code(404).send({ message: 'route not found' })
        }

        return reply.send(result)
    })

    app.post('/routes/request', async (request, reply) => {
        try {
            const body = request.body as {
                routeId?: string
                requesterId?: string
                type?: 'RIDE' | 'PACKAGE'
                seatsRequested?: number
                packageSizeKg?: number
                message?: string
                package?: {
                    weight: number
                    description: string
                    imageUrl?: string
                }
            }

            if (!body?.routeId || !body?.requesterId || !body?.type) {
                return reply
                    .code(400)
                    .send({ message: 'routeId, requesterId and type are required' })
            }

            const result = await requestRoute.execute({
                routeId: body.routeId,
                requesterId: body.requesterId,
                type: body.type,
                seatsRequested: body.seatsRequested,
                packageSizeKg: body.packageSizeKg,
                message: body.message,
                package: body.package,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })
}
