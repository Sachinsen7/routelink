import { NotificationRepository } from '../ports/notificationRepository'

export class ListUserNotifications {
    constructor(private readonly notificationRepository: NotificationRepository) {}

    execute(userId: string) {
        return this.notificationRepository.listByUser(userId)
    }
}
