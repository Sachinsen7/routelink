import type { ReactNode } from 'react'
import { memo } from 'react'
import { Text, View } from 'react-native'

import { typography } from '../../constants/typography'
import { cn } from '../../utils/cn'

const variantClasses = {
    neutral: 'bg-surface-container',
    brand: 'bg-brand-100',
    success: 'bg-success-100',
    warning: 'bg-warning-100',
    secondary: 'bg-secondary-fixed',
}

const textClasses = {
    neutral: 'text-text-secondary',
    brand: 'text-brand-900',
    success: 'text-success-500',
    warning: 'text-warning-500',
    secondary: 'text-brand-950',
}

type BadgeProps = {
    label: string
    icon?: ReactNode
    className?: string
    variant?: keyof typeof variantClasses
}

function BadgeComponent({ label, icon, className, variant = 'neutral' }: BadgeProps) {
    return (
        <View
            className={cn(
                'flex-row items-center gap-1.5 self-start rounded-pill px-3 py-1.5',
                variantClasses[variant],
                className
            )}
        >
            {icon}
            <Text
                className={cn(
                    typography.classes.label,
                    'text-[11px] uppercase',
                    textClasses[variant]
                )}
            >
                {label}
            </Text>
        </View>
    )
}

export const Badge = memo(BadgeComponent)
