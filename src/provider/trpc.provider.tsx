'use client'

import { useState } from 'react'
import { SWRConfig } from 'swr'

import { api } from '@/utils/trpc'

export const TRPCProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [client] = useState(() => api.createClient())

  return (
    <SWRConfig>
      <api.Provider client={client}>{children}</api.Provider>
    </SWRConfig>
  )
}
