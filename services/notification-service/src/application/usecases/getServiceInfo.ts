import { ServiceInfoProvider } from '../ports/serviceInfoProvider'

export class GetServiceInfo {
    constructor(private readonly provider: ServiceInfoProvider) {}

    execute() {
        return this.provider.getInfo()
    }
}
