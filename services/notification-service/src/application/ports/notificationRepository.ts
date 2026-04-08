export interface SendNotificationInput {
    userId: string
    channel: 'PUSH' | 'EMAIL' | 'SMS'
    type: string
    title: string
    body: string
    toEmail?: string
    toPhone?: string
    metadata?: unknown
}

export interface NotificationRecord {
    id: string
    userId: string
    channel: string
    status: string
    createdAt: Date
}

export interface NotificationRepository {
    createQueued(input: SendNotificationInput): Promise<NotificationRecord>
    markSent(notificationId: string): Promise<void>
    markFailed(notificationId: string): Promise<void>
    listByUser(userId: string): Promise<unknown[]>
}
