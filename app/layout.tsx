import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { OnchainKitProvider } from '@/components/OnchainKitProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Farcaster Base App',
  description: 'A Next.js app with Farcaster SDK on Base network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnchainKitProvider>
          {children}
        </OnchainKitProvider>
      </body>
    </html>
  )
}

