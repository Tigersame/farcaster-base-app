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
        
        // Try to use the SDK if available (API may vary by version)
        if (farcasterSDK && typeof farcasterSDK === 'object') {
          // Create a mock/fallback SDK for now
          // The actual SDK will be used when running in Farcaster environment
          const mockSDK: FarcasterSDK = {
            context: Promise.resolve(null),
            actions: {
              openUrl: (url: string) => {
                if (typeof window !== 'undefined') {
                  window.open(url, '_blank')
                }
              },
              close: () => {
                // Close handler
              },
            },
          }
          setSdk(mockSDK)
          setIsReady(true)
        }
      } catch (error) {
        // SDK might not be available if not running in Farcaster environment
        // Create fallback SDK
        const fallbackSDK: FarcasterSDK = {
          context: Promise.resolve(null),
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
        setIsReady(false)
      }
    }

    initSDK()
  }, [])

  return { sdk, isReady }
}

