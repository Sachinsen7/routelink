export interface CreateRouteInput {
    userId: string
    fromCity: string
    toCity: string
    fromLat: number
    fromLng: number
    toLat: number
    toLng: number
    departureTime: Date
    transportMode: string
    seatsTotal: number
    price: number
    description?: string
}

export interface SearchRoutesInput {
    fromCity?: string
    toCity?: string
    departureAfter?: Date
}

export interface CreateRouteRequestInput {
    routeId: string
    requesterId: string
    type: 'RIDE' | 'PACKAGE'
    seatsRequested?: number
    packageSizeKg?: number
    message?: string
    package?: {
        weight: number
        description: string
        imageUrl?: string
    }
}

export interface RouteRepository {
    createRoute(input: CreateRouteInput): Promise<{ id: string }>
    searchRoutes(input: SearchRoutesInput): Promise<unknown[]>
    findRouteById(routeId: string): Promise<unknown | null>
    createRouteRequest(input: CreateRouteRequestInput): Promise<{ id: string }>
}
