import { FastifyInstance } from 'fastify'
import { GetUserProfile } from '../../../application/usecases/getUserProfile'
import { ListUserReviews } from '../../../application/usecases/listUserReviews'
import { UpdateUserProfile } from '../../../application/usecases/updateUserProfile'
import { VerifyUserId } from '../../../application/usecases/verifyUserId'
import { DigiLockerProvider } from '../../../infrastructure/providers/digiLockerProvider'
import { PrismaUserRepository } from '../../../infrastructure/repositories/prismaUserRepository'

export async function registerUserRoutes(app: FastifyInstance) {
    const userRepository = new PrismaUserRepository()
    const digiLockerProvider = new DigiLockerProvider(
        process.env.DIGILOCKER_BASE_URL,
        process.env.DIGILOCKER_CLIENT_ID,
        process.env.DIGILOCKER_CLIENT_SECRET
    )

    const getUserProfile = new GetUserProfile(userRepository)
    const updateUserProfile = new UpdateUserProfile(userRepository)
    const listUserReviews = new ListUserReviews(userRepository)
    const verifyUserId = new VerifyUserId(userRepository, digiLockerProvider)

    app.get('/users/:id', async (request, reply) => {
        const params = request.params as { id: string }
        const result = await getUserProfile.execute(params.id)

        if (!result) {
            return reply.code(404).send({ message: 'user profile not found' })
        }

        return reply.send(result)
    })

    app.put('/users/profile', async (request, reply) => {
        try {
            const body = request.body as {
                userId?: string
                name?: string
                avatarUrl?: string
                bio?: string
            }
            if (!body?.userId || !body?.name) {
                return reply.code(400).send({ message: 'userId and name are required' })
            }

            const result = await updateUserProfile.execute({
                userId: body.userId,
                name: body.name,
                avatarUrl: body.avatarUrl,
                bio: body.bio,
            })

            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.get('/users/reviews', async (request, reply) => {
        const query = request.query as { userId?: string }
        if (!query?.userId) {
            return reply.code(400).send({ message: 'userId is required' })
        }

        const result = await listUserReviews.execute(query.userId)
        return reply.send(result)
    })

    app.post('/users/verify-id', async (request, reply) => {
        try {
            const body = request.body as { userId?: string; documentNumber?: string }
            if (!body?.userId || !body?.documentNumber) {
                return reply.code(400).send({ message: 'userId and documentNumber are required' })
            }

            const result = await verifyUserId.execute(body.userId, body.documentNumber)
            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })
}
