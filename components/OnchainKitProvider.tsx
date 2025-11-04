'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

const baseChain = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
  blockExplorers: { default: { name: 'Basescan', url: 'https://basescan.org' } },
  testnet: false,
}

const baseSepoliaChain = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: { decimals: 18, name: 'Sepolia Ether', symbol: 'ETH' },
  rpcUrls: { default: { http: ['https://sepolia.base.org'] } },
  blockExplorers: { default: { name: 'Basescan', url: 'https://sepolia.basescan.org' } },
  testnet: true,
}

const config = createConfig({
  chains: [baseChain, baseSepoliaChain],
  connectors: [injected(), metaMask(), coinbaseWallet({ appName: 'Farcaster Base App' })],
  transports: {
    [baseChain.id]: http('https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj'),
    [baseSepoliaChain.id]: http('https://sepolia.base.org'),
  },
})

const queryClient = new QueryClient()

export function OnchainKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
