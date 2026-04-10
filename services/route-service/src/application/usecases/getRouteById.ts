import { RouteRepository } from '../ports/routeRepository'

export class GetRouteById {
    constructor(private readonly routeRepository: RouteRepository) {}

    execute(routeId: string) {
        return this.routeRepository.findRouteById(routeId)
    }
}
