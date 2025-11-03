'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useConnectors } from 'wagmi'

export function useBaseWallet() {
  const { address, isConnected } = useAccount()
  const { connect, error: connectError, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const connectors = useConnectors()
  const [error, setError] = useState<string | null>(null)

  const connectWallet = (walletType: 'metamask' | 'coinbase' | 'smartwallet' | 'injected' = 'metamask') => {
    try {
      setError(null)
      
      // Find the appropriate connector
      let connector
      if (walletType === 'metamask') {
        connector = connectors.find((c) => c.id === 'metaMask' || c.name?.toLowerCase().includes('metamask'))
      } else if (walletType === 'coinbase' || walletType === 'smartwallet') {
        // Base Smart Wallet (Formally) is accessed via coinbaseWallet connector
        connector = connectors.find((c) => c.id === 'coinbaseWallet' || c.name?.toLowerCase().includes('coinbase'))
      } else {
        connector = connectors.find((c) => c.id === 'injected' || c.type === 'injected')
      }

      // Fallback to first available connector
      if (!connector && connectors.length > 0) {
        connector = connectors[0]
      }

      if (!connector) {
        setError('No wallet connector available. Please install a wallet extension like MetaMask.')
        return
      }

      connect({ connector })
    } catch (err: any) {
      setError(err?.message || 'Failed to connect wallet. Please make sure you have a wallet extension installed.')
    }
  }

  const disconnectWallet = () => {
    setError(null)
    disconnect()
  }

  return {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
    isConnecting: isPending,
    error: error || (connectError?.message || null),
  }
}

