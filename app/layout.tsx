import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { OnchainKitProvider } from '@/components/OnchainKitProvider'
import { minikitConfig } from '@/minikit.config'

const inter = Inter({ subsets: ['latin'] })

// Dynamic metadata from minikit config
const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'https://your-deployed-url.vercel.app'

export const metadata: Metadata = {
  title: minikitConfig.miniapp.ogTitle,
  description: minikitConfig.miniapp.ogDescription,
  openGraph: {
    title: minikitConfig.miniapp.ogTitle,
    description: minikitConfig.miniapp.ogDescription,
    type: 'website',
    images: [minikitConfig.miniapp.ogImageUrl],
    url: ROOT_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: minikitConfig.miniapp.ogTitle,
    description: minikitConfig.miniapp.ogDescription,
    images: [minikitConfig.miniapp.ogImageUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="farcaster:frame" content="vNext" />
      </head>
      <body className={inter.className}>
        <OnchainKitProvider>
          {children}
        </OnchainKitProvider>
      </body>
    </html>
  )
}

