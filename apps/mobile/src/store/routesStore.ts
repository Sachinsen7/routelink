import { create } from 'zustand'

import { getErrorMessage } from '../api/errors'
import { createRouteRequest, getRouteById, searchRoutes } from '../api/services/routes'
import type { RouteDetail, RouteItem, RouteRequestType } from '../types/route'
import { useSessionStore } from './sessionStore'

type RoutesState = {
    recommendedRoutes: RouteItem[]
    discoverRoutes: RouteItem[]
    selectedRoute: RouteDetail | null
    loading: boolean
    requesting: boolean
    error: string | null
    loadRecommended: () => Promise<void>
    searchDiscover: (query?: {
        fromCity?: string
        toCity?: string
        departureAfter?: string
    }) => Promise<void>
    loadRouteDetail: (routeId: string) => Promise<void>
    requestSpace: (input: {
        routeId: string
        type: RouteRequestType
        message?: string
        seatsRequested?: number
        packageSizeKg?: number
    }) => Promise<string | null>
}

export const useRoutesStore = create<RoutesState>((set) => ({
    recommendedRoutes: [],
    discoverRoutes: [],
    selectedRoute: null,
    loading: false,
    requesting: false,
    error: null,
    loadRecommended: async () => {
        set({ loading: true, error: null })

        try {
            const routes = await searchRoutes({
                departureAfter: new Date().toISOString(),
            })

            set({
                recommendedRoutes: routes.slice(0, 6),
                loading: false,
            })
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
        }
    },
    searchDiscover: async (query) => {
        set({ loading: true, error: null })

        try {
            const routes = await searchRoutes(query)
            set({
                discoverRoutes: routes,
                loading: false,
            })
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
        }
    },
    loadRouteDetail: async (routeId) => {
        set({ loading: true, error: null })

        try {
            const route = await getRouteById(routeId)
            set({
                selectedRoute: route,
                loading: false,
            })
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error) })
        }
    },
    requestSpace: async (input) => {
        const requesterId = useSessionStore.getState().userId
        if (!requesterId) return null

        set({ requesting: true, error: null })

        try {
            const result = await createRouteRequest({
                routeId: input.routeId,
                requesterId,
                type: input.type,
                message: input.message,
                seatsRequested: input.seatsRequested,
                packageSizeKg: input.packageSizeKg,
                package:
                    input.type === 'PACKAGE'
                        ? {
                              weight: input.packageSizeKg || 1,
                              description: input.message || 'RouteLink package request',
                          }
                        : undefined,
            })

            set({ requesting: false })
            return result.id
        } catch (error) {
            set({ requesting: false, error: getErrorMessage(error) })
            return null
        }
    },
}))
