import { Platform } from 'react-native'

export type ServiceName = 'auth' | 'user' | 'route' | 'chat' | 'payment' | 'notification'

function getLocalhost() {
    if (Platform.OS === 'android') {
        return '10.0.2.2'
    }

    return 'localhost'
}

const localhost = getLocalhost()

const serviceBaseUrls: Record<ServiceName, string> = {
    auth: process.env.EXPO_PUBLIC_AUTH_API_URL || `http://${localhost}:4001`,
    user: process.env.EXPO_PUBLIC_USER_API_URL || `http://${localhost}:4002`,
    route: process.env.EXPO_PUBLIC_ROUTE_API_URL || `http://${localhost}:4003`,
    chat: process.env.EXPO_PUBLIC_CHAT_API_URL || `http://${localhost}:4004`,
    payment: process.env.EXPO_PUBLIC_PAYMENT_API_URL || `http://${localhost}:4005`,
    notification: process.env.EXPO_PUBLIC_NOTIFICATION_API_URL || `http://${localhost}:4006`,
}

export function getServiceUrl(service: ServiceName) {
    return serviceBaseUrls[service]
}
