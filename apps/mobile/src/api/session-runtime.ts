import type { AuthSession } from '../types/auth'

let currentSession: AuthSession | null = null
let syncHandler: ((session: AuthSession | null) => void) | null = null

export function getRuntimeSession() {
    return currentSession
}

export function setRuntimeSession(session: AuthSession | null) {
    currentSession = session
    syncHandler?.(session)
}

export function registerSessionSync(handler: (session: AuthSession | null) => void) {
    syncHandler = handler
}
