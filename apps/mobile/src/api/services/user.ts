import { apiRequest } from '../http'
import type { UpdateProfilePayload, UserProfile, UserReview } from '../../types/user'

export function getUserProfile(userId: string) {
    return apiRequest<UserProfile>('user', `/users/${userId}`, { auth: true })
}

export function updateUserProfile(userId: string, payload: UpdateProfilePayload) {
    return apiRequest<UserProfile>('user', '/users/profile', {
        method: 'PUT',
        auth: true,
        body: {
            userId,
            ...payload,
        },
    })
}

export function listUserReviews(userId: string) {
    return apiRequest<UserReview[]>('user', `/users/reviews?userId=${userId}`, { auth: true })
}

export function verifyUserId(userId: string, documentNumber: string) {
    return apiRequest<{ status: string }>('user', '/users/verify-id', {
        method: 'POST',
        auth: true,
        body: {
            userId,
            documentNumber,
        },
    })
}
