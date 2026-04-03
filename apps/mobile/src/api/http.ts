import { ApiError } from './errors'
import { getServiceUrl, type ServiceName } from './config'
import { getRuntimeSession, setRuntimeSession } from './session-runtime'
import type { AuthTokens } from '../types/auth'

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    auth?: boolean
    retryOnAuthFailure?: boolean
}

let refreshPromise: Promise<AuthTokens | null> | null = null

async function parseResponse<T>(response: Response): Promise<T> {
    const text = await response.text()
    const json = text ? (JSON.parse(text) as T | { message?: string }) : null

    if (!response.ok) {
        const message =
            typeof json === 'object' && json && 'message' in json && json.message
                ? json.message
                : `Request failed with status ${response.status}`

        throw new ApiError(String(message), response.status)
    }

    return json as T
}

async function refreshTokens() {
    const session = getRuntimeSession()
    if (!session?.refreshToken) {
        return null
    }

    if (!refreshPromise) {
        refreshPromise = fetch(`${getServiceUrl('auth')}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: session.refreshToken }),
        })
            .then((response) => parseResponse<AuthTokens>(response))
            .then((tokens) => {
                setRuntimeSession({
                    ...session,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                })

                return tokens
            })
            .catch(() => {
                setRuntimeSession(null)
                return null
            })
            .finally(() => {
                refreshPromise = null
            })
    }

    return refreshPromise
}

export async function apiRequest<T>(
    service: ServiceName,
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const session = getRuntimeSession()
    const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    if (options.auth && session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`
    }

    const response = await fetch(`${getServiceUrl(service)}${path}`, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (response.status === 401 && options.auth && options.retryOnAuthFailure !== false) {
        const refreshed = await refreshTokens()
        if (!refreshed) {
            throw new ApiError('Your session expired. Please sign in again.', 401)
        }

        return apiRequest<T>(service, path, { ...options, retryOnAuthFailure: false })
    }

    return parseResponse<T>(response)
}
