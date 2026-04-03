import { View } from 'react-native'

import { cn } from '../../utils/cn'

type RouteTrackerProps = {
    progress?: number
    className?: string
}

export function RouteTracker({ progress = 0.5, className }: RouteTrackerProps) {
    const clampedProgress = Math.max(0, Math.min(1, progress))

    return (
        <View className={cn('relative h-2 w-full rounded-pill bg-brand-100', className)}>
            <View
                className="h-2 rounded-pill bg-brand-500"
                style={{ width: `${clampedProgress * 100}%` }}
            />
            <View
                className="absolute top-1/2 h-4 w-4 -translate-y-2 rounded-pill border-4 border-white bg-brand-700"
                style={{ left: `${Math.max(0, clampedProgress * 100 - 6)}%` }}
            />
        </View>
    )
}
