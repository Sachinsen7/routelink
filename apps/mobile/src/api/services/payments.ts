import { apiRequest } from '../http'
import type { PaymentIntent, PaymentStatus } from '../../types/payment'

export function createPaymentIntent(payload: {
    routeRequestId: string
    userId: string
    amount: number
    currency?: string
}) {
    return apiRequest<PaymentIntent>('payment', '/payments/create', {
        method: 'POST',
        auth: true,
        body: payload,
    })
}

export function getPaymentStatus(paymentId: string) {
    return apiRequest<PaymentStatus>('payment', `/payments/status?paymentId=${paymentId}`, {
        auth: true,
    })
}
