'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { DeviceFrame } from '@/components/shared/DeviceFrame'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/shared/Icons'
import { showcaseImages } from '@/lib/site-content'

const showcaseAlts = [
    'Available delivery requests screen',
    'Map tracking screen',
    'Verified profile screen',
    'Booking confirmation screen',
]

export function ShowcaseSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const railRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const railY = useTransform(scrollYProgress, [0, 0.5, 1], [42, 0, -28])
    const cardTransforms = [
        {
            y: useTransform(scrollYProgress, [0, 0.5, 1], [54, -8, -32]),
            rotate: useTransform(scrollYProgress, [0, 0.5, 1], [-3, -1.5, -1]),
        },
        {
            y: useTransform(scrollYProgress, [0, 0.5, 1], [86, 30, -8]),
            rotate: useTransform(scrollYProgress, [0, 0.5, 1], [-1, -0.25, 0.75]),
        },
        {
            y: useTransform(scrollYProgress, [0, 0.5, 1], [52, -2, -26]),
            rotate: useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 0.25, -0.75]),
        },
        {
            y: useTransform(scrollYProgress, [0, 0.5, 1], [88, 34, -6]),
            rotate: useTransform(scrollYProgress, [0, 0.5, 1], [3, 1.5, 1]),
        },
    ]

    function scrollRail(direction: 'left' | 'right') {
        railRef.current?.scrollBy({
            left: direction === 'left' ? -360 : 360,
            behavior: 'smooth',
        })
    }

    return (
        <section className="showcase-section" ref={sectionRef}>
            <div className="shell showcase-shell">
                <motion.div
                    className="showcase-header"
                    initial={{ opacity: 0, y: 28 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.55 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <div className="showcase-eyebrow">Product Preview</div>
                    <h2>See it in action</h2>
                    <p>
                        A cleaner preview rail for your real Android screens, centered on the page
                        with calm motion as the section enters view.
                    </p>
                </motion.div>

                <div className="showcase-controls">
                    <button
                        className="icon-button"
                        onClick={() => scrollRail('left')}
                        type="button"
                    >
                        <ChevronLeftIcon className="icon-md" />
                    </button>
                    <button
                        className="icon-button"
                        onClick={() => scrollRail('right')}
                        type="button"
                    >
                        <ChevronRightIcon className="icon-md" />
                    </button>
                </div>

                <div className="showcase-stage">
                    <div className="showcase-stage__glow showcase-stage__glow--left" />
                    <div className="showcase-stage__glow showcase-stage__glow--right" />
                    <motion.div className="showcase-rail" ref={railRef} style={{ y: railY }}>
                        {showcaseImages.map((image, index) => (
                            <motion.div
                                className="showcase-card"
                                initial={{ opacity: 0, y: 56, scale: 0.92 }}
                                key={image}
                                style={cardTransforms[index]}
                                transition={{
                                    duration: 0.85,
                                    delay: index * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                viewport={{ once: true, amount: 0.45 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            >
                                <DeviceFrame
                                    alt={showcaseAlts[index] ?? 'RouteLink product screen'}
                                    src={image}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
