import { FastifyInstance } from 'fastify'
import { CreatePaymentIntent } from '../../../application/usecases/createPaymentIntent'
import { GetPaymentStatus } from '../../../application/usecases/getPaymentStatus'
import { ProcessPaymentWebhook } from '../../../application/usecases/processPaymentWebhook'
import { RazorpayProvider } from '../../../infrastructure/providers/razorpayProvider'
import { PrismaPaymentRepository } from '../../../infrastructure/repositories/prismaPaymentRepository'

export async function registerPaymentRoutes(app: FastifyInstance) {
    const paymentRepository = new PrismaPaymentRepository()
    const razorpayProvider = new RazorpayProvider(
        process.env.RAZORPAY_KEY_ID,
        process.env.RAZORPAY_KEY_SECRET
    )

    const createPaymentIntent = new CreatePaymentIntent(paymentRepository, razorpayProvider)
    const processPaymentWebhook = new ProcessPaymentWebhook(paymentRepository, razorpayProvider)
    const getPaymentStatus = new GetPaymentStatus(paymentRepository)

    app.post('/payments/create', async (request, reply) => {
        try {
            const body = request.body as {
                routeRequestId?: string
                userId?: string
                amount?: number
                currency?: string
            }

            if (!body?.routeRequestId || !body?.userId || !body?.amount) {
                return reply
                    .code(400)
                    .send({ message: 'routeRequestId, userId and amount are required' })
            }

            const result = await createPaymentIntent.execute({
                routeRequestId: body.routeRequestId,
                userId: body.userId,
                amount: Number(body.amount),
                currency: body.currency,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.post('/payments/webhook', async (request, reply) => {
        try {
            const body = request.body as {
                paymentId?: string
                orderId?: string
                gatewayRef?: string
                status?: 'SUCCESS' | 'FAILED' | 'PENDING'
                signature?: string
                payload?: unknown
            }

            if (!body?.paymentId || !body?.orderId || !body?.gatewayRef || !body?.status) {
                return reply
                    .code(400)
                    .send({ message: 'paymentId, orderId, gatewayRef and status are required' })
            }

            const result = await processPaymentWebhook.execute({
                paymentId: body.paymentId,
                orderId: body.orderId,
                gatewayRef: body.gatewayRef,
                status: body.status,
                signature: body.signature,
                payload: body.payload,
            })

            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.get('/payments/status', async (request, reply) => {
        const query = request.query as { paymentId?: string }

        if (!query?.paymentId) {
            return reply.code(400).send({ message: 'paymentId is required' })
        }

        const result = await getPaymentStatus.execute(query.paymentId)
        if (!result) {
            return reply.code(404).send({ message: 'payment not found' })
        }

        return reply.send(result)
    })
}
