'use client'

import { useEffect, useState } from 'react'

interface FarcasterSDK {
  context: Promise<any>
  actions: {
    openUrl: (url: string) => void
    close: () => void
  }
}

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<FarcasterSDK | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if we're running in a Farcaster Mini App environment
    if (typeof window === 'undefined') return

    const initSDK = async () => {
      try {
        // Dynamically import the SDK to avoid SSR issues
        const farcasterSDK = await import('@farcaster/miniapp-sdk')
        
        // Initialize the Mini App SDK
        // The SDK automatically detects if it's running in a Farcaster environment
        if (farcasterSDK) {
          // Try to initialize the actual SDK
          // The SDK API may vary, so we handle both cases
          let initializedSDK: FarcasterSDK | null = null

          // Check if we're in a Farcaster environment (iframe or mini app context)
          const isFarcasterEnv = 
            window.parent !== window || // Running in iframe
            (window as any).farcaster // Farcaster global available

          if (isFarcasterEnv && farcasterSDK.MiniAppSDK) {
            // Use the actual SDK when in Farcaster environment
            try {
              const miniAppSDK = new farcasterSDK.MiniAppSDK()
              initializedSDK = {
                context: miniAppSDK.context || Promise.resolve(null),
                actions: {
                  openUrl: (url: string) => miniAppSDK.openUrl?.(url) || window.open(url, '_blank'),
                  close: () => miniAppSDK.close?.() || {},
                },
              }
            } catch (e) {
              console.log('SDK initialization in Farcaster context failed, using fallback')
            }
          }

          // Fallback SDK for development/testing outside Farcaster
          if (!initializedSDK) {
            initializedSDK = {
              context: Promise.resolve({
                user: null,
                channel: null,
              }),
              actions: {
                openUrl: (url: string) => {
                  if (typeof window !== 'undefined') {
                    window.open(url, '_blank')
                  }
                },
                close: () => {
                  // Close handler - works in Farcaster environment
                },
              },
            }
          }

          setSdk(initializedSDK)
          setIsReady(true)
        }
      } catch (error) {
        console.log('Farcaster SDK not available, using fallback:', error)
        // Fallback SDK for development outside Farcaster
        const fallbackSDK: FarcasterSDK = {
          context: Promise.resolve({
            user: null,
            channel: null,
          }),
          actions: {
            openUrl: (url: string) => {
              if (typeof window !== 'undefined') {
                window.open(url, '_blank')
              }
            },
            close: () => {},
          },
        }
        setSdk(fallbackSDK)
        setIsReady(true) // Still mark as ready so app works in development
      }
    }

    initSDK()
  }, [])

  return { sdk, isReady }
}

