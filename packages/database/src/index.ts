import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

import * as dotenv from 'dotenv'
import path from 'path'

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') })
}

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_59JjVhTEQDil@ep-billowing-surf-awuonu2f.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require'

const pool = new Pool({
  connectionString,
})

export const db = drizzle(pool, { schema })
export * from './schema'
