import Razorpay from 'razorpay'
import crypto from 'crypto'

export interface CreatePaymentOrderInput {
    amountPaise: number
    receipt: string
    currency?: string
}

export class RazorpayProvider {
    private readonly client: Razorpay | null
    private readonly keySecret: string | null

    constructor(keyId?: string, keySecret?: string) {
        this.client =
            keyId && keySecret ? new Razorpay({ key_id: keyId, key_secret: keySecret }) : null
        this.keySecret = keySecret || null
    }

    async createOrder(input: CreatePaymentOrderInput) {
        if (!this.client) {
            throw new Error('Razorpay is not configured')
        }

        return this.client.orders.create({
            amount: input.amountPaise,
            currency: input.currency || 'INR',
            receipt: input.receipt,
        })
    }

    verifySignature(orderId: string, paymentId: string, signature: string) {
        if (!this.keySecret) {
            return false
        }

        const expected = crypto
            .createHmac('sha256', this.keySecret)
            .update(`${orderId}|${paymentId}`)
            .digest('hex')

        return expected === signature
    }
}
