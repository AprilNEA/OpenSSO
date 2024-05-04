import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import '@/globals.css'

import { TRPCProvider } from '@/provider/trpc.provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenSSO',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
