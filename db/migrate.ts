import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

;(async () => {
  // for migrations
  const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 })

  await migrate(drizzle(migrationClient), {
    migrationsFolder: './db/migration',
  })

  process.exit(0)
})()
