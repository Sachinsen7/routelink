import {
    ReviewView,
    UpdateUserProfileInput,
    UserProfileView,
    UserRepository,
    VerificationInput,
} from '../../application/ports/userRepository'
import { prisma } from '../db/prisma'

export class PrismaUserRepository implements UserRepository {
    async getUserProfile(userId: string): Promise<UserProfileView | null> {
        const [profile, reputation] = await Promise.all([
            prisma.userProfile.findUnique({
                where: { userId },
            }),
            prisma.userReputation.findUnique({
                where: { userId },
            }),
        ])

        if (!profile && !reputation) {
            return null
        }

        return {
            userId,
            name: profile?.name || 'RouteLink User',
            avatarUrl: profile?.avatarUrl || null,
            bio: profile?.bio || null,
            averageRating: reputation?.averageRating || 0,
            trustScore: reputation?.trustScore || 0,
            reviewsCount: reputation?.reviewsCount || 0,
        }
    }

    async upsertUserProfile(input: UpdateUserProfileInput): Promise<UserProfileView> {
        const profile = await prisma.userProfile.upsert({
            where: { userId: input.userId },
            update: {
                name: input.name,
                avatarUrl: input.avatarUrl,
                bio: input.bio,
            },
            create: {
                userId: input.userId,
                name: input.name,
                avatarUrl: input.avatarUrl,
                bio: input.bio,
            },
        })

        await prisma.userReputation.upsert({
            where: { userId: input.userId },
            update: {},
            create: { userId: input.userId },
        })

        const reputation = await prisma.userReputation.findUnique({
            where: { userId: input.userId },
        })

        return {
            userId: profile.userId,
            name: profile.name,
            avatarUrl: profile.avatarUrl,
            bio: profile.bio,
            averageRating: reputation?.averageRating || 0,
            trustScore: reputation?.trustScore || 0,
            reviewsCount: reputation?.reviewsCount || 0,
        }
    }

    async listReviews(userId: string): Promise<ReviewView[]> {
        const reviews = await prisma.review.findMany({
            where: {
                revieweeId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return reviews.map((review) => ({
            id: review.id,
            reviewerId: review.reviewerId,
            revieweeId: review.revieweeId,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
        }))
    }

    async createVerification(input: VerificationInput) {
        await prisma.userVerificationRecord.create({
            data: {
                userId: input.userId,
                documentNumber: input.documentNumber,
                provider: input.provider,
                providerRefId: input.providerRefId,
                status: input.status,
            },
        })
    }
}
