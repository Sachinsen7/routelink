export type UserProfile = {
    userId: string
    name: string
    avatarUrl: string | null
    bio: string | null
    averageRating: number
    trustScore: number
    reviewsCount: number
}

export type UserReview = {
    id: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string | null
    createdAt: string
}

export type UpdateProfilePayload = {
    name: string
    avatarUrl?: string
    bio?: string
}
