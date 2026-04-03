import { FastifyInstance } from 'fastify'
import type { OtpPurpose } from '../../../application/ports/authRepository'
import { LoginWithGoogle } from '../../../application/usecases/loginWithGoogle'
import { RefreshSession } from '../../../application/usecases/refreshSession'
import { RequestOtpLogin } from '../../../application/usecases/requestOtpLogin'
import { SignupUser } from '../../../application/usecases/signupUser'
import { VerifyOtpLogin } from '../../../application/usecases/verifyOtpLogin'
import { GoogleOAuthProvider } from '../../../infrastructure/providers/googleOAuthProvider'
import { TwilioOtpProvider } from '../../../infrastructure/providers/twilioOtpProvider'
import { PrismaAuthRepository } from '../../../infrastructure/repositories/prismaAuthRepository'
import { JwtTokenService } from '../../../infrastructure/security/jwtTokenService'

export async function registerAuthRoutes(app: FastifyInstance) {
    const authRepository = new PrismaAuthRepository()
    const tokenService = new JwtTokenService(
        process.env.JWT_ACCESS_SECRET || 'routelink-access-secret',
        process.env.JWT_REFRESH_SECRET || 'routelink-refresh-secret'
    )

    const otpProvider = new TwilioOtpProvider(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
        process.env.TWILIO_FROM_PHONE,
        process.env.TWILIO_VERIFY_SERVICE_SID
    )
    const googleOAuthProvider = new GoogleOAuthProvider(process.env.GOOGLE_OAUTH_CLIENT_ID)

    const signupUser = new SignupUser(authRepository, tokenService)
    const requestOtpLogin = new RequestOtpLogin(authRepository, otpProvider)
    const verifyOtpLogin = new VerifyOtpLogin(authRepository, tokenService, otpProvider)
    const loginWithGoogle = new LoginWithGoogle(authRepository, googleOAuthProvider, tokenService)
    const refreshSession = new RefreshSession(authRepository, tokenService)

    app.post('/auth/signup', async (request, reply) => {
        try {
            const body = request.body as { name?: string; phone?: string; email?: string }
            if (!body?.name) {
                return reply.code(400).send({ message: 'name is required' })
            }

            const result = await signupUser.execute({
                name: body.name,
                phone: body.phone,
                email: body.email,
            })

            return reply.code(201).send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.post('/auth/login', async (request, reply) => {
        try {
            const body = request.body as { phone?: string }
            if (!body?.phone) {
                return reply.code(400).send({ message: 'phone is required' })
            }

            const result = await requestOtpLogin.execute({
                phone: body.phone,
                purpose: 'LOGIN',
            })
            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.post('/auth/request-otp', async (request, reply) => {
        try {
            const body = request.body as {
                phone?: string
                purpose?: OtpPurpose
                name?: string
                email?: string
            }
            if (!body?.phone || !body?.purpose) {
                return reply.code(400).send({ message: 'phone and purpose are required' })
            }

            if (body.purpose !== 'LOGIN' && body.purpose !== 'SIGNUP') {
                return reply.code(400).send({ message: 'purpose must be LOGIN or SIGNUP' })
            }

            const result = await requestOtpLogin.execute({
                phone: body.phone,
                purpose: body.purpose,
                name: body.name,
                email: body.email,
            })
            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.post('/auth/verify-otp', async (request, reply) => {
        try {
            const body = request.body as { phone?: string; code?: string; purpose?: OtpPurpose }
            if (!body?.phone || !body?.code) {
                return reply.code(400).send({ message: 'phone and code are required' })
            }

            if (body.purpose && body.purpose !== 'LOGIN' && body.purpose !== 'SIGNUP') {
                return reply.code(400).send({ message: 'purpose must be LOGIN or SIGNUP' })
            }

            const result = await verifyOtpLogin.execute({
                phone: body.phone,
                code: body.code,
                purpose: body.purpose || 'LOGIN',
            })
            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.post('/auth/oauth', async (request, reply) => {
        try {
            const body = request.body as { idToken?: string }
            if (!body?.idToken) {
                return reply.code(400).send({ message: 'idToken is required' })
            }

            const result = await loginWithGoogle.execute(body.idToken)
            return reply.send(result)
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message })
        }
    })

    app.post('/auth/refresh', async (request, reply) => {
        try {
            const body = request.body as { refreshToken?: string }
            if (!body?.refreshToken) {
                return reply.code(400).send({ message: 'refreshToken is required' })
            }

            const tokens = await refreshSession.execute(body.refreshToken)
            return reply.send(tokens)
        } catch (error) {
            return reply.code(401).send({ message: (error as Error).message })
        }
    })
}
