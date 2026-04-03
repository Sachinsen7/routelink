import { ServiceInfo } from '../../domain/serviceInfo'

export interface ServiceInfoProvider {
    getInfo(): ServiceInfo
}
