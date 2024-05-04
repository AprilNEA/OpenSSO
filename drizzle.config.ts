import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/schema/*',
  out: './db/migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
