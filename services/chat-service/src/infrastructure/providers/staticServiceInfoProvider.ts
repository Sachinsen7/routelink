import { ServiceInfo } from '../../domain/serviceInfo'
import { ServiceInfoProvider } from '../../application/ports/serviceInfoProvider'

export class StaticServiceInfoProvider implements ServiceInfoProvider {
    constructor(
        private readonly name: string,
        private readonly version: string,
        private readonly description: string
    ) {}

    getInfo(): ServiceInfo {
        return {
            name: this.name,
            version: this.version,
            description: this.description,
            uptimeSeconds: Math.round(process.uptime()),
        }
    }
}
