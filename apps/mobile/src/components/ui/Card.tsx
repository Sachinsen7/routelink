import type { PropsWithChildren } from 'react'
import { View, type ViewProps } from 'react-native'

import { shadows } from '../../constants/shadows'
import { cn } from '../../utils/cn'

type CardProps = PropsWithChildren<
    ViewProps & {
        className?: string
    }
>

export function Card({ children, className, style, ...rest }: CardProps) {
    return (
        <View
            className={cn('rounded-[24px] bg-surface-card p-5', className)}
            style={[shadows.card, style]}
            {...rest}
        >
            {children}
        </View>
    )
}
