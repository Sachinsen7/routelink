import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('DATABASE_URL is required')
}

const schema = new URL(connectionString).searchParams.get('schema') || undefined

const adapter = new PrismaPg({ connectionString }, { schema })

export const prisma = new PrismaClient({ adapter })

