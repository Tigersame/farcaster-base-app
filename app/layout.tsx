import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { OnchainKitProvider } from '@/components/OnchainKitProvider'
import { minikitConfig } from '../minikit.config'
import { APP_CONFIG } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

// Dynamic metadata from minikit config with fallbacks
const ROOT_URL = (globalThis as any)?.process?.env?.NEXT_PUBLIC_URL || APP_CONFIG.DEFAULT_URL

export const metadata: Metadata = {
  title: minikitConfig.miniapp.ogTitle || APP_CONFIG.GAME_NAME,
  description: minikitConfig.miniapp.ogDescription || 'Play Tap Tap Game and earn BASETAP tokens on Base network!',
  metadataBase: new URL(ROOT_URL),
  openGraph: {
    title: minikitConfig.miniapp.ogTitle || APP_CONFIG.GAME_NAME,
    description: minikitConfig.miniapp.ogDescription || 'Play Tap Tap Game and earn BASETAP tokens!',
    type: 'website',
    images: [minikitConfig.miniapp.ogImageUrl || `${ROOT_URL}/og-image.png`],
    url: ROOT_URL,
    siteName: APP_CONFIG.APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: minikitConfig.miniapp.ogTitle || APP_CONFIG.GAME_NAME,
    description: minikitConfig.miniapp.ogDescription || 'Play Tap Tap Game and earn BASETAP tokens!',
    images: [minikitConfig.miniapp.ogImageUrl || `${ROOT_URL}/og-image.png`],
  },
  other: {
    'fc:miniapp': JSON.stringify({
      version: minikitConfig.miniapp.version,
      imageUrl: minikitConfig.miniapp.heroImageUrl,
      button: {
        title: 'Play Now',
        action: {
          type: 'launch_frame',
          name: minikitConfig.miniapp.name,
          url: minikitConfig.miniapp.homeUrl,
          splashImageUrl: minikitConfig.miniapp.splashImageUrl,
          splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
        },
      },
    }),
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
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

