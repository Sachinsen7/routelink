import { FastifyInstance } from 'fastify'
import { ListUserNotifications } from '../../../application/usecases/listUserNotifications'
import { SendNotification } from '../../../application/usecases/sendNotification'
import { EmailProvider } from '../../../infrastructure/providers/emailProvider'
import { PrismaNotificationRepository } from '../../../infrastructure/repositories/prismaNotificationRepository'
import { SmsProvider } from '../../../infrastructure/providers/smsProvider'

export async function registerNotificationRoutes(app: FastifyInstance) {
    const notificationRepository = new PrismaNotificationRepository()
    const emailProvider = new EmailProvider(
        process.env.SMTP_HOST,
        process.env.SMTP_PORT,
        process.env.SMTP_USER,
        process.env.SMTP_PASS,
        process.env.SMTP_FROM_EMAIL
    )
    const smsProvider = new SmsProvider(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
        process.env.TWILIO_FROM_PHONE
    )

    const sendNotification = new SendNotification(
        notificationRepository,
        emailProvider,
        smsProvider
    )
    const listUserNotifications = new ListUserNotifications(notificationRepository)

    app.post('/notifications/send', async (request, reply) => {
        try {
            const body = request.body as {
                userId?: string
                channel?: 'PUSH' | 'EMAIL' | 'SMS'
                type?: string
                title?: string
                body?: string
                toEmail?: string
                toPhone?: string
                metadata?: unknown
            }

            if (!body?.userId || !body?.channel || !body?.type || !body?.title || !body?.body) {
                return reply.code(400).send({ message: 'missing required notification fields' })
            }

            const result = await sendNotification.execute({
                userId: body.userId,
                channel: body.channel,
                type: body.type,
                title: body.title,
                body: body.body,
                toEmail: body.toEmail,
                toPhone: body.toPhone,
                metadata: body.metadata,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.get('/notifications/:userId', async (request, reply) => {
        const params = request.params as { userId: string }
        const result = await listUserNotifications.execute(params.userId)
        return reply.send(result)
    })
}
