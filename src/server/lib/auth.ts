import { Lucia } from 'lucia'

import { db } from '@/server/lib/db'
import { sessionTable, userTable } from '@db/schema/user'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
})

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
  }
}
