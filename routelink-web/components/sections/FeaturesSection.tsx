'use client'

import { motion } from 'framer-motion'

import { PackageIcon, RouteIcon, ShieldIcon } from '@/components/shared/Icons'
import { features } from '@/lib/site-content'

const iconMap = {
    route: RouteIcon,
    package: PackageIcon,
    shield: ShieldIcon,
}

const containerTransition = {
    duration: 0.85,
    ease: [0.22, 1, 0.36, 1] as const,
}

export function FeaturesSection() {
    const [primaryFeature, ...secondaryFeatures] = features
    const PrimaryIcon = iconMap[primaryFeature.icon as keyof typeof iconMap]

    return (
        <section className="features-section" id="features">
            <div className="shell">
                <motion.div
                    className="features-header"
                    initial={{ opacity: 0, y: 30 }}
                    transition={containerTransition}
                    viewport={{ once: true, amount: 0.45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <div className="features-header__eyebrow">Feature System</div>
                    <div className="features-header__content">
                        <div>
                            <h2>Reimagining Logistics</h2>
                        </div>
                        <p>
                            Built for speed, efficiency, and social trust. RouteLink should feel
                            closer to a modern travel product than a tired courier dashboard.
                        </p>
                    </div>
                </motion.div>

                <div className="features-composition">
                    <motion.article
                        className="feature-spotlight"
                        initial={{ opacity: 0, y: 44 }}
                        transition={{ ...containerTransition, delay: 0.08 }}
                        viewport={{ once: true, amount: 0.28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <div className="feature-spotlight__media">
                            <img alt={primaryFeature.alt} src={primaryFeature.image} />
                            <div className="feature-spotlight__badge">
                                <PrimaryIcon className="icon-md" />
                                <span>{primaryFeature.eyebrow}</span>
                            </div>
                        </div>

                        <div className="feature-spotlight__body">
                            <div className="feature-spotlight__copy">
                                <h3>{primaryFeature.title}</h3>
                                <p>{primaryFeature.description}</p>
                            </div>

                            <div className="feature-spotlight__stats">
                                {primaryFeature.stats.map((stat) => (
                                    <div className="feature-pill" key={stat}>
                                        {stat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.article>

                    <div className="feature-stack">
                        {secondaryFeatures.map((feature, index) => {
                            const Icon = iconMap[feature.icon as keyof typeof iconMap]

                            return (
                                <motion.article
                                    className={`feature-story feature-story--${feature.tone}`}
                                    initial={{ opacity: 0, x: 30, y: 24 }}
                                    key={feature.title}
                                    transition={{
                                        ...containerTransition,
                                        delay: 0.14 + index * 0.1,
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                >
                                    <div className="feature-story__image">
                                        <img alt={feature.alt} src={feature.image} />
                                    </div>
                                    <div className="feature-story__body">
                                        <div className="feature-story__topline">
                                            <div
                                                className={`feature-story__icon feature-story__icon--${feature.tone}`}
                                            >
                                                <Icon className="icon-md" />
                                            </div>
                                            <span>{feature.eyebrow}</span>
                                        </div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                        <div className="feature-story__list">
                                            {feature.stats.map((stat) => (
                                                <div
                                                    className="feature-story__list-item"
                                                    key={stat}
                                                >
                                                    <span className="feature-story__dot" />
                                                    <span>{stat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
