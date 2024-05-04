import { hash } from 'bcrypt'
import { generateIdFromEntropySize } from 'lucia'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { procedure, router } from '@/server'
import { lucia } from '@/server/lib/auth'
import { db } from '@/server/lib/db'
import { userTable } from '@db/schema'
import { TRPCError } from '@trpc/server'

export default router({
  hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return {
      msg: `hello ${input.name}`,
    }
  }),
  createUser: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(64),
      }),
    )
    .mutation(async ({ input }) => {
      const passwordHash = await hash(input.password, 10)

      if (
        await db.query.userTable.findFirst({
          where: (table, { eq }) => eq(table.email, input.email),
        })
      ) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already exists',
        })
      }

      const userId = generateIdFromEntropySize(32)
      const user = await db.insert(userTable).values({
        id: userId,
        email: input.email,
        password: passwordHash,
      })

      const session = await lucia.createSession(userId, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
      return {
        success: true,
      }
    }),
})
