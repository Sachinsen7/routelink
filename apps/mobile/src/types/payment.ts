export type PaymentIntent = {
    paymentId: string
    gatewayOrderId: string
    amountPaise: number
    currency: string
}

export type PaymentStatus = {
    paymentId: string
    status: string
}
