import { RouteRepository, SearchRoutesInput } from '../ports/routeRepository'

export class SearchRoutes {
    constructor(private readonly routeRepository: RouteRepository) {}

    execute(input: SearchRoutesInput) {
        return this.routeRepository.searchRoutes(input)
    }
}
