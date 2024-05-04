'use client'

import type { AppRouter } from '@/server/router'

import { createSWRProxyHooks } from '@trpc-swr/client'
import { httpBatchLink } from '@trpc/client'

const getBaseUrl = () =>
  typeof window !== 'undefined'
    ? ''
    : `http://localhost:${process.env.PORT ?? 3000}`

/* tRPC Client */
export const api = createSWRProxyHooks<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})
