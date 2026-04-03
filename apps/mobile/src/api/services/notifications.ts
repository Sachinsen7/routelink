import { apiRequest } from '../http'
import type { NotificationItem } from '../../types/notification'

export function listNotifications(userId: string) {
    return apiRequest<NotificationItem[]>(`notification`, `/notifications/${userId}`, {
        auth: true,
    })
}
