export type RouteRequestType = 'RIDE' | 'PACKAGE'

export type RouteItem = {
    id: string
    userId: string
    fromCity: string
    toCity: string
    fromLat: number
    fromLng: number
    toLat: number
    toLng: number
    departureTime: string
    transportMode: string
    seatsTotal: number
    seatsAvailable: number
    price: number
    description?: string | null
    status: 'ACTIVE' | 'FULL' | 'COMPLETED' | 'CANCELLED'
    createdAt?: string
    updatedAt?: string
}

export type RouteDetail = RouteItem & {
    requests: RouteRequest[]
}

export type RouteRequest = {
    id: string
    routeId: string
    requesterId: string
    type: RouteRequestType
    seatsRequested?: number | null
    packageSizeKg?: number | null
    message?: string | null
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED'
    paymentRefId?: string | null
    createdAt?: string
}

export type CreateRoutePayload = {
    fromCity: string
    toCity: string
    departureDate: string
    departureTime: string
    transportMode: string
    seatsTotal: number
    price: number
    description: string
}
