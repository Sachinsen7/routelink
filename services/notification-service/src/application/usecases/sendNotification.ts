import { NotificationRepository, SendNotificationInput } from '../ports/notificationRepository'
import { EmailProvider } from '../../infrastructure/providers/emailProvider'
import { SmsProvider } from '../../infrastructure/providers/smsProvider'

export class SendNotification {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly emailProvider: EmailProvider,
        private readonly smsProvider: SmsProvider
    ) {}

    async execute(input: SendNotificationInput) {
        const notification = await this.notificationRepository.createQueued(input)

        try {
            if (input.channel === 'EMAIL') {
                if (!input.toEmail) {
                    throw new Error('toEmail is required for EMAIL channel')
                }

                await this.emailProvider.send({
                    to: input.toEmail,
                    subject: input.title,
                    html: input.body,
                })
            }

            if (input.channel === 'SMS') {
                if (!input.toPhone) {
                    throw new Error('toPhone is required for SMS channel')
                }

                await this.smsProvider.send(input.toPhone, input.body)
            }

            await this.notificationRepository.markSent(notification.id)

            return {
                id: notification.id,
                status: 'SENT',
            }
        } catch (error) {
            await this.notificationRepository.markFailed(notification.id)
            throw error
        }
    }
}
