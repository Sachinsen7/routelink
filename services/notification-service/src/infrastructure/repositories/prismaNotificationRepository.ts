import { Prisma } from '../../generated/prisma/client'
import {
    NotificationRecord,
    NotificationRepository,
    SendNotificationInput,
} from '../../application/ports/notificationRepository'
import { prisma } from '../db/prisma'

export class PrismaNotificationRepository implements NotificationRepository {
    async createQueued(input: SendNotificationInput): Promise<NotificationRecord> {
        const notification = await prisma.notification.create({
            data: {
                userId: input.userId,
                channel: input.channel,
                type: input.type,
                title: input.title,
                body: input.body,
                status: 'QUEUED',
                metadata: input.metadata as Prisma.InputJsonValue,
            },
        })

        return {
            id: notification.id,
            userId: notification.userId,
            channel: notification.channel,
            status: notification.status,
            createdAt: notification.createdAt,
        }
    }

    async markSent(notificationId: string) {
        await prisma.notification.update({
            where: { id: notificationId },
            data: {
                status: 'SENT',
                sentAt: new Date(),
            },
        })
    }

    async markFailed(notificationId: string) {
        await prisma.notification.update({
            where: { id: notificationId },
            data: {
                status: 'FAILED',
            },
        })
    }

    async listByUser(userId: string) {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        })
    }
}
