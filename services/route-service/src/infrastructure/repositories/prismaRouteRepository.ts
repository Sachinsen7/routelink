import { Prisma } from '../../generated/prisma/client'
import {
    CreateRouteInput,
    CreateRouteRequestInput,
    RouteRepository,
    SearchRoutesInput,
} from '../../application/ports/routeRepository'
import { prisma } from '../db/prisma'

export class PrismaRouteRepository implements RouteRepository {
    async createRoute(input: CreateRouteInput) {
        const route = await prisma.route.create({
            data: {
                userId: input.userId,
                fromCity: input.fromCity,
                toCity: input.toCity,
                fromLat: input.fromLat,
                fromLng: input.fromLng,
                toLat: input.toLat,
                toLng: input.toLng,
                departureTime: input.departureTime,
                transportMode: input.transportMode,
                seatsTotal: input.seatsTotal,
                seatsAvailable: input.seatsTotal,
                price: input.price,
                description: input.description,
            },
        })

        return { id: route.id }
    }

    async searchRoutes(input: SearchRoutesInput) {
        const where: Prisma.RouteWhereInput = {
            status: 'ACTIVE',
            fromCity: input.fromCity,
            toCity: input.toCity,
            departureTime: input.departureAfter
                ? {
                      gte: input.departureAfter,
                  }
                : undefined,
        }

        return prisma.route.findMany({
            where,
            orderBy: {
                departureTime: 'asc',
            },
        })
    }

    findRouteById(routeId: string) {
        return prisma.route.findUnique({
            where: {
                id: routeId,
            },
            include: {
                requests: true,
            },
        })
    }

    async createRouteRequest(input: CreateRouteRequestInput) {
        const routeRequest = await prisma.routeRequest.create({
            data: {
                routeId: input.routeId,
                requesterId: input.requesterId,
                type: input.type,
                seatsRequested: input.seatsRequested,
                packageSizeKg: input.packageSizeKg,
                message: input.message,
                package: input.package
                    ? {
                          create: {
                              weight: input.package.weight,
                              description: input.package.description,
                              imageUrl: input.package.imageUrl,
                          },
                      }
                    : undefined,
            },
        })

        return { id: routeRequest.id }
    }
}
