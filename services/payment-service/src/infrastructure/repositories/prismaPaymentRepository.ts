import { Prisma } from '../../generated/prisma/client'
import {
    CreatePaymentInput,
    PaymentRepository,
    PaymentStatusResult,
} from '../../application/ports/paymentRepository'
import { prisma } from '../db/prisma'

export class PrismaPaymentRepository implements PaymentRepository {
    async createPayment(input: CreatePaymentInput) {
        const currency = input.currency || 'INR'
        const amountPaise = Math.round(input.amount * 100)

        const payment = await prisma.payment.create({
            data: {
                routeRequestId: input.routeRequestId,
                userId: input.userId,
                amount: new Prisma.Decimal(input.amount),
                currency,
                gateway: 'RAZORPAY',
                status: 'CREATED',
            },
        })

        return {
            id: payment.id,
            amountPaise,
            currency,
        }
    }

    async setPaymentStatus(paymentId: string, status: string) {
        await prisma.payment.update({
            where: { id: paymentId },
            data: {
                status: status as 'CREATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED',
            },
        })
    }

    async addTransaction(
        paymentId: string,
        gatewayRef: string,
        status: string,
        responseData?: unknown
    ) {
        await prisma.transaction.create({
            data: {
                paymentId,
                gatewayRef,
                status: status as 'CREATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED',
                responseData: responseData as Prisma.InputJsonValue,
            },
        })
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentStatusResult | null> {
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
        })

        if (!payment) {
            return null
        }

        return {
            paymentId: payment.id,
            status: payment.status,
        }
    }
}
