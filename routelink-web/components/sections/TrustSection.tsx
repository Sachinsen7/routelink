import { FingerprintIcon, SecurityIcon, ShieldIcon } from '@/components/shared/Icons'
import { trustImage, trustPoints } from '@/lib/site-content'

const iconMap = {
    fingerprint: FingerprintIcon,
    shield: ShieldIcon,
}

export function TrustSection() {
    return (
        <section className="trust-section" id="trust">
            <div className="shell">
                <div className="trust-panel">
                    <div className="trust-copy">
                        <div className="trust-tag">
                            <SecurityIcon className="icon-sm" />
                            <span>Safety First</span>
                        </div>
                        <h2>Trust built into every route.</h2>
                        <p className="trust-intro">
                            Every important moment in RouteLink is designed to feel calm,
                            transparent, and verified from first match to final handoff.
                        </p>
                        <div className="trust-points">
                            {trustPoints.map((point) => {
                                const Icon = iconMap[point.icon as keyof typeof iconMap]

                                return (
                                    <div className="trust-point" key={point.title}>
                                        <div className="trust-point__icon">
                                            <Icon className="icon-md" />
                                        </div>
                                        <div>
                                            <h3>{point.title}</h3>
                                            <p>{point.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="trust-media">
                        <img
                            alt="RouteLink trust and verification themed imagery"
                            src={trustImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
