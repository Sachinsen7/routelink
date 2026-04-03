export function formatCurrency(amount: number) {
    return `Rs. ${Math.round(amount).toLocaleString('en-IN')}`
}

export function formatCompactDate(dateTime: string) {
    const value = new Date(dateTime)

    return new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(value)
}

export function formatTimeAgo(dateTime: string) {
    const diffMinutes = Math.max(1, Math.round((Date.now() - new Date(dateTime).getTime()) / 60000))

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`
    }

    const diffHours = Math.round(diffMinutes / 60)
    if (diffHours < 24) {
        return `${diffHours}h ago`
    }

    const diffDays = Math.round(diffHours / 24)
    return `${diffDays}d ago`
}
