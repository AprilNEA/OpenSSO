import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from '@db/schema'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
