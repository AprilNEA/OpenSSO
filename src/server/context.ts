import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export interface NextRequestContentFnOptions
  extends FetchCreateContextFnOptions {
  req: NextRequest
}

export async function createInnerContext({
  req,
  resHeaders,
}: NextRequestContentFnOptions) {
  return {}
}

export type Context = Awaited<ReturnType<typeof createInnerContext>>
