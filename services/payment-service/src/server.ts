import { buildApp } from './app'
import { loadConfig } from './config/env'

async function start() {
    const config = loadConfig()
    const app = buildApp()

    try {
        await app.listen({ port: config.port, host: '0.0.0.0' })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
