import { apiRequest } from '../http'
import type {
    AuthTokens,
    RequestOtpPayload,
    RequestOtpResponse,
    VerifyOtpPayload,
    VerifyOtpResponse,
} from '../../types/auth'

export function requestOtp(payload: RequestOtpPayload) {
    return apiRequest<RequestOtpResponse>('auth', '/auth/request-otp', {
        method: 'POST',
        body: payload,
    })
}

export function verifyOtp(payload: VerifyOtpPayload) {
    return apiRequest<VerifyOtpResponse>('auth', '/auth/verify-otp', {
        method: 'POST',
        body: payload,
    })
}

export function refreshAuth(refreshToken: string) {
    return apiRequest<AuthTokens>('auth', '/auth/refresh', {
        method: 'POST',
        body: { refreshToken },
    })
}
