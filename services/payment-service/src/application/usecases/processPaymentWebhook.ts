import { PaymentRepository, ProcessWebhookInput } from '../ports/paymentRepository'
import { RazorpayProvider } from '../../infrastructure/providers/razorpayProvider'

export class ProcessPaymentWebhook {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly razorpayProvider: RazorpayProvider
    ) {}

    async execute(input: ProcessWebhookInput) {
        if (input.signature) {
            const isValid = this.razorpayProvider.verifySignature(
                input.orderId,
                input.gatewayRef,
                input.signature
            )
            if (!isValid) {
                throw new Error('invalid webhook signature')
            }
        }

        await this.paymentRepository.setPaymentStatus(input.paymentId, input.status)
        await this.paymentRepository.addTransaction(
            input.paymentId,
            input.gatewayRef,
            input.status,
            input.payload
        )

        return {
            paymentId: input.paymentId,
            status: input.status,
        }
    }
}
