export interface UserProfileView {
    userId: string
    name: string
    avatarUrl: string | null
    bio: string | null
    averageRating: number
    trustScore: number
    reviewsCount: number
}

export interface UpdateUserProfileInput {
    userId: string
    name: string
    avatarUrl?: string
    bio?: string
}

export interface ReviewView {
    id: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string | null
    createdAt: Date
}

export interface VerificationInput {
    userId: string
    documentNumber: string
    provider: string
    providerRefId?: string
    status: 'PENDING' | 'VERIFIED' | 'REJECTED'
}

export interface UserRepository {
    getUserProfile(userId: string): Promise<UserProfileView | null>
    upsertUserProfile(input: UpdateUserProfileInput): Promise<UserProfileView>
    listReviews(userId: string): Promise<ReviewView[]>
    createVerification(input: VerificationInput): Promise<void>
}
