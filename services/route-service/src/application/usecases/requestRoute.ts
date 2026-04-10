import { CreateRouteRequestInput, RouteRepository } from '../ports/routeRepository'

export class RequestRoute {
    constructor(private readonly routeRepository: RouteRepository) {}

    execute(input: CreateRouteRequestInput) {
        return this.routeRepository.createRouteRequest(input)
    }
}
