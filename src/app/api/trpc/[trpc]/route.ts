import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

import { createInnerContext } from '@/server/context'
import { appRouter } from '@/server/router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

export const dynamic = 'force-dynamic'

const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  // Fetch stuff that depends on the request

  return await createInnerContext({
    ...opts,
    req: opts.req as NextRequest,
  })
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            )
          }
        : undefined,
  })

export { handler as GET, handler as POST }
