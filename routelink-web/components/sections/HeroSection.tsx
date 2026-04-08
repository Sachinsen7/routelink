'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { SiteButton } from '@/components/shared/Buttons'
import { ArrowRightIcon } from '@/components/shared/Icons'
import { heroAvatars, heroImage } from '@/lib/site-content'

const heroLines = [
    { text: 'The Future of', accent: false },
    { text: 'Inter-city', accent: true },
    { text: 'Travel &', accent: true },
    { text: 'Delivery', accent: false },
]

const transition = {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1] as const,
}

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const copyY = useTransform(scrollYProgress, [0, 1], [0, 56])
    const phoneY = useTransform(scrollYProgress, [0, 1], [0, -72])
    const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])

    return (
        <section className="hero-section" ref={sectionRef}>
            <div className="shell hero-grid">
                <motion.div className="hero-copy" style={{ y: copyY }}>
                    <motion.div
                        className="hero-copy__inner"
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 24 }}
                        transition={transition}
                    >
                        <div className="hero-eyebrow">Peer-to-peer logistics</div>

                        <h1>
                            {heroLines.map((line, index) => (
                                <span className="hero-title-line" key={line.text}>
                                    <span
                                        className={`hero-title-word${line.accent ? ' hero-title-accent' : ''}`}
                                        style={{
                                            animationDelay: `${0.08 + index * 0.12}s`,
                                        }}
                                    >
                                        {line.text}
                                    </span>
                                </span>
                            ))}
                        </h1>

                        <motion.p
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 26 }}
                            transition={{ ...transition, delay: 0.45 }}
                        >
                            Peer-to-peer logistics reimagined for the modern professional. Send
                            packages or share your travel route to earn while you move across India.
                        </motion.p>

                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-actions"
                            initial={{ opacity: 0, y: 24 }}
                            transition={{ ...transition, delay: 0.56 }}
                        >
                            <SiteButton
                                href="#download"
                                icon={<ArrowRightIcon className="icon-sm" />}
                            >
                                Get Started Now
                            </SiteButton>
                            <SiteButton href="#features" variant="secondary">
                                Learn More
                            </SiteButton>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-proof"
                            initial={{ opacity: 0, y: 22 }}
                            transition={{ ...transition, delay: 0.7 }}
                        >
                            <div className="avatar-stack">
                                {heroAvatars.map((avatar, index) => (
                                    <img
                                        alt={`Verified RouteLink user ${index + 1}`}
                                        className="avatar-stack__image"
                                        key={avatar}
                                        src={avatar}
                                    />
                                ))}
                            </div>
                            <p>
                                <strong>15k+ Verified Users</strong> across India
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div className="hero-visual" style={{ y: phoneY }}>
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-floating-card hero-floating-card--top"
                        initial={{ opacity: 0, y: 18 }}
                        transition={{ ...transition, delay: 0.75 }}
                    >
                        Verified travel routes
                    </motion.div>
                    <motion.div
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="hero-phone"
                        initial={{ opacity: 0, scale: 0.94, y: 36 }}
                        transition={{ ...transition, delay: 0.3 }}
                    >
                        <img
                            alt="RouteLink mobile interface showing active travel and delivery tracking"
                            className="hero-phone__image"
                            src={heroImage}
                        />
                    </motion.div>
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-floating-card hero-floating-card--bottom"
                        initial={{ opacity: 0, y: 18 }}
                        transition={{ ...transition, delay: 0.92 }}
                    >
                        Fast matching, calm delivery
                    </motion.div>
                    <motion.div className="hero-glow" style={{ scale: glowScale }} />
                </motion.div>
            </div>
        </section>
    )
}
