import { apiRequest } from '../http'
import type {
    CreateRoutePayload,
    RouteDetail,
    RouteItem,
    RouteRequestType,
} from '../../types/route'

export function searchRoutes(params?: {
    fromCity?: string
    toCity?: string
    departureAfter?: string
}) {
    const search = new URLSearchParams()

    if (params?.fromCity) {
        search.set('fromCity', params.fromCity)
    }

    if (params?.toCity) {
        search.set('toCity', params.toCity)
    }

    if (params?.departureAfter) {
        search.set('departureAfter', params.departureAfter)
    }

    const suffix = search.toString() ? `?${search.toString()}` : ''

    return apiRequest<RouteItem[]>('route', `/routes/search${suffix}`, { auth: true })
}

export function getRouteById(routeId: string) {
    return apiRequest<RouteDetail>('route', `/routes/${routeId}`, { auth: true })
}

export function createRoute(userId: string, payload: CreateRoutePayload) {
    const departureTime = new Date(
        `${payload.departureDate}T${payload.departureTime}:00`
    ).toISOString()

    return apiRequest<{ id: string }>('route', '/routes', {
        method: 'POST',
        auth: true,
        body: {
            userId,
            fromCity: payload.fromCity,
            toCity: payload.toCity,
            fromLat: 0,
            fromLng: 0,
            toLat: 0,
            toLng: 0,
            departureTime,
            transportMode: payload.transportMode,
            seatsTotal: payload.seatsTotal,
            price: payload.price,
            description: payload.description,
        },
    })
}

export function createRouteRequest(input: {
    routeId: string
    requesterId: string
    type: RouteRequestType
    seatsRequested?: number
    packageSizeKg?: number
    message?: string
    package?: {
        weight: number
        description: string
        imageUrl?: string
    }
}) {
    return apiRequest<{ id: string }>('route', '/routes/request', {
        method: 'POST',
        auth: true,
        body: input,
    })
}
