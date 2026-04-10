import { CreateRouteInput, RouteRepository } from '../ports/routeRepository'

export class CreateRoute {
    constructor(private readonly routeRepository: RouteRepository) {}

    execute(input: CreateRouteInput) {
        if (input.seatsTotal <= 0) {
            throw new Error('seatsTotal must be greater than zero')
        }

        return this.routeRepository.createRoute(input)
    }
}
