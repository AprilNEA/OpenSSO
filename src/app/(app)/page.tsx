'use client'

import Image from 'next/image'

import { api } from '@/utils/trpc'

export default function Home() {
  const { data } = api.user.hello.useSWR({ name: 'world' })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <p>{JSON.stringify(data)}</p>}
    </main>
  )
}
