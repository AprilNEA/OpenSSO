import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'

export const userRoleEnum = pgEnum('user_role', ['admin', 'user'])

export const userTable = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .$defaultFn(() => ulid()),

  role: userRoleEnum('role').notNull().default('user'),

  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),

  isDeleted: boolean('is_deleted').default(false).notNull(),
  isBlocked: boolean('is_blocked').default(false).notNull(),

  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).$onUpdate(() => new Date()),
})

export const sessionTable = pgTable('session', {
  id: varchar('id').primaryKey(),
  userId: varchar('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})
