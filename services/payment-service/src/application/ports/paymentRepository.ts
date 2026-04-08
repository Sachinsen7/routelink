export interface CreatePaymentInput {
    routeRequestId: string
    userId: string
    amount: number
    currency?: string
}

export interface CreatePaymentResult {
    paymentId: string
    gatewayOrderId: string
    amountPaise: number
    currency: string
}

export interface PaymentStatusResult {
    paymentId: string
    status: string
}

export interface ProcessWebhookInput {
    paymentId: string
    orderId: string
    gatewayRef: string
    status: 'SUCCESS' | 'FAILED' | 'PENDING'
    signature?: string
    payload?: unknown
}

export interface PaymentRepository {
    createPayment(
        input: CreatePaymentInput
    ): Promise<{ id: string; amountPaise: number; currency: string }>
    setPaymentStatus(paymentId: string, status: string): Promise<void>
    addTransaction(
        paymentId: string,
        gatewayRef: string,
        status: string,
        responseData?: unknown
    ): Promise<void>
    getPaymentStatus(paymentId: string): Promise<PaymentStatusResult | null>
}
