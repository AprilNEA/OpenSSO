import { ZodError } from 'zod'

import { initTRPC } from '@trpc/server'

import { Context } from './context'

const trpc = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

export const middleware = trpc.middleware
export const router = trpc.router

export const procedure = trpc.procedure
