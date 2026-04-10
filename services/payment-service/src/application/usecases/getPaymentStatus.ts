import { PaymentRepository } from '../ports/paymentRepository'

export class GetPaymentStatus {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    execute(paymentId: string) {
        return this.paymentRepository.getPaymentStatus(paymentId)
    }
}
