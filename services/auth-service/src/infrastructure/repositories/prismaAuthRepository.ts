import {
    AuthRepository,
    CreateOtpInput,
    CreateUserInput,
    OtpPurpose,
    OtpRecord,
    UpsertOAuthInput,
} from '../../application/ports/authRepository'
import { prisma } from '../db/prisma'

export class PrismaAuthRepository implements AuthRepository {
    async findUserByPhone(phone: string) {
        return prisma.user.findUnique({
            where: { phone },
        })
    }

    async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        })
    }

    async findUserById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        })
    }

    async createUser(input: CreateUserInput) {
        return prisma.user.create({
            data: {
                name: input.name,
                phone: input.phone,
                email: input.email,
            },
        })
    }

    async markPhoneVerified(userId: string) {
        await prisma.user.update({
            where: { id: userId },
            data: { phoneVerified: true },
        })
    }

    async upsertOAuthAccount(input: UpsertOAuthInput) {
        await prisma.oAuthAccount.upsert({
            where: {
                provider_providerId: {
                    provider: input.provider,
                    providerId: input.providerId,
                },
            },
            update: {
                accessToken: input.accessToken,
                refreshToken: input.refreshToken,
            },
            create: {
                userId: input.userId,
                provider: input.provider,
                providerId: input.providerId,
                accessToken: input.accessToken,
                refreshToken: input.refreshToken,
            },
        })
    }

    async createOtp(input: CreateOtpInput) {
        await prisma.oTPCode.create({
            data: {
                phone: input.phone,
                code: input.code,
                purpose: input.purpose,
                name: input.name,
                email: input.email,
                expiresAt: input.expiresAt,
            },
        })
    }

    async findValidOtp(
        phone: string,
        code: string,
        purpose: OtpPurpose
    ): Promise<OtpRecord | null> {
        return prisma.oTPCode.findFirst({
            where: {
                phone,
                code,
                purpose,
                verified: false,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async findLatestPendingOtp(phone: string, purpose: OtpPurpose): Promise<OtpRecord | null> {
        return prisma.oTPCode.findFirst({
            where: {
                phone,
                purpose,
                verified: false,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    async markOtpVerified(otpId: string) {
        await prisma.oTPCode.update({
            where: { id: otpId },
            data: { verified: true },
        })
    }
}
