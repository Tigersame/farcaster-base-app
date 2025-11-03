'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function useBaseWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const connectWallet = () => {
    connect({ connector: injected() })
  }

  const disconnectWallet = () => {
    disconnect()
  }

  return {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
  }
}

