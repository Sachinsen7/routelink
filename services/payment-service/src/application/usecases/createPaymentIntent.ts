import {
    PaymentRepository,
    CreatePaymentInput,
    CreatePaymentResult,
} from '../ports/paymentRepository'
import { RazorpayProvider } from '../../infrastructure/providers/razorpayProvider'

export class CreatePaymentIntent {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly razorpayProvider: RazorpayProvider
    ) {}

    async execute(input: CreatePaymentInput): Promise<CreatePaymentResult> {
        if (input.amount <= 0) {
            throw new Error('amount must be greater than zero')
        }

        const payment = await this.paymentRepository.createPayment(input)

        const order = await this.razorpayProvider.createOrder({
            amountPaise: payment.amountPaise,
            receipt: payment.id,
            currency: payment.currency,
        })

        await this.paymentRepository.addTransaction(payment.id, order.id, 'PENDING', order)

        return {
            paymentId: payment.id,
            gatewayOrderId: order.id,
            amountPaise: payment.amountPaise,
            currency: payment.currency,
        }
    }
}
