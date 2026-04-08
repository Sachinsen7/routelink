import type { ReactNode } from 'react'

type IconProps = {
    className?: string
}

function Svg({
    children,
    className,
    viewBox = '0 0 24 24',
}: IconProps & { children: ReactNode; viewBox?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            viewBox={viewBox}
        >
            {children}
        </svg>
    )
}

export function ArrowRightIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
        </Svg>
    )
}

export function ChevronLeftIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="m15 18-6-6 6-6" />
        </Svg>
    )
}

export function ChevronRightIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="m9 18 6-6-6-6" />
        </Svg>
    )
}

export function RouteIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M7 17c2.5-5.5 6.5-9 10-10" />
            <path d="M10 7h4" />
        </Svg>
    )
}

export function PackageIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="m3 7 9-4 9 4-9 4-9-4Z" />
            <path d="M3 7v10l9 4 9-4V7" />
            <path d="M12 11v10" />
        </Svg>
    )
}

export function ShieldIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="m12 3 7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
            <path d="m9.5 12 1.8 1.8 3.8-4" />
        </Svg>
    )
}

export function SecurityIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="M12 3 4 7v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4Z" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
        </Svg>
    )
}

export function FingerprintIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="M9 10a3 3 0 0 1 6 0v2" />
            <path d="M6 10a6 6 0 0 1 12 0v2" />
            <path d="M12 16v4" />
            <path d="M8 13v3a4 4 0 0 0 8 0v-1" />
            <path d="M5 13v2a7 7 0 0 0 14 0v-2" />
        </Svg>
    )
}

export function GlobeIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a15 15 0 0 1 0 18" />
            <path d="M12 3a15 15 0 0 0 0 18" />
        </Svg>
    )
}

export function ChatIcon({ className }: IconProps) {
    return (
        <Svg className={className}>
            <path d="M5 18h10l4 3V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z" />
            <path d="M8 10h8" />
            <path d="M8 14h5" />
        </Svg>
    )
}

export function AppleIcon({ className }: IconProps) {
    return (
        <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.78 12.27c.02 1.94 1.71 2.58 1.73 2.59-.01.05-.27.96-.9 1.9-.55.81-1.11 1.62-2 1.64-.87.02-1.15-.52-2.15-.52-.99 0-1.31.5-2.13.54-.86.03-1.52-.88-2.08-1.69-1.14-1.65-2.01-4.66-.84-6.69.58-1 1.62-1.64 2.76-1.66.86-.01 1.68.58 2.15.58.47 0 1.43-.72 2.42-.61.41.02 1.57.17 2.32 1.28-.06.04-1.38.81-1.36 2.64Zm-1.99-5.14c.45-.55.76-1.32.67-2.08-.65.03-1.44.44-1.91 1-.42.49-.79 1.27-.69 2.01.72.06 1.46-.36 1.93-.93Z" />
        </svg>
    )
}

export function GooglePlayIcon({ className }: IconProps) {
    return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
            <path
                d="M4.61 3.22c-.27.28-.43.69-.43 1.2v15.16c0 .5.16.92.43 1.19l.07.06L13.18 12 4.68 3.16l-.07.06Z"
                fill="#00d17a"
            />
            <path
                d="M16.04 14.94 13.18 12l2.86-2.94.06.03 3.4 1.93c.97.55.97 1.44 0 2l-3.4 1.93-.06-.01Z"
                fill="#ffd24d"
            />
            <path
                d="M16.1 14.91 13.18 12 4.61 20.84c.43.45 1.1.5 1.86.07l9.63-5.47"
                fill="#ff5252"
            />
            <path
                d="M16.1 9.09 6.47 3.62c-.76-.43-1.43-.38-1.86.07L13.18 12l2.92-2.91Z"
                fill="#4d8dff"
            />
        </svg>
    )
}
