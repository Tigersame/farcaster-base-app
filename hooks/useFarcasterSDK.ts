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
        const { createAppClient } = await import('@farcaster/miniapp-sdk')
        const client = createAppClient()
        
        // Connect to the Farcaster client
        await client.connect()
        
        setSdk(client as FarcasterSDK)
        setIsReady(true)
      } catch (error) {
        // SDK might not be available if not running in Farcaster environment
        console.warn('Farcaster SDK not available:', error)
        setIsReady(false)
      }
    }

    initSDK()
  }, [])

  return { sdk, isReady }
}

