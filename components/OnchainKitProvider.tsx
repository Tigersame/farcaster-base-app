'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [base, baseSepolia], // Support both mainnet and testnet
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ 
      appName: 'Farcaster Base App',
      // Base Smart Wallet (Formally) support is built into coinbaseWallet connector
    }),
  ],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj'),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'),
  },
})

interface OnchainKitProviderProps {
  children: React.ReactNode
}

export function OnchainKitProvider({ children }: OnchainKitProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

