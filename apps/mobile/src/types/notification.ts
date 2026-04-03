export type NotificationItem = {
    id: string
    userId: string
    channel: 'PUSH' | 'EMAIL' | 'SMS'
    type: string
    title: string
    body: string
    read: boolean
    status: string
    createdAt: string
    metadata?: Record<string, unknown> | null
}
