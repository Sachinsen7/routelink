import 'dotenv/config'

export interface AppConfig {
    port: number
    databaseUrl: string
    redisUrl: string
}

export function loadConfig(): AppConfig {
    const port = Number(process.env.PORT || 4003)
    const databaseUrl = process.env.DATABASE_URL || ''
    const redisUrl = process.env.REDIS_URL || ''

    if (!databaseUrl) {
        throw new Error('DATABASE_URL is required')
    }

    return {
        port,
        databaseUrl,
        redisUrl,
    }
}
