'use client'

import { OnchainKitProvider as BaseOnchainKitProvider } from '@base-org/onchainkit'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
  },
})

interface OnchainKitProviderProps {
  children: React.ReactNode
}

export function OnchainKitProvider({ children }: OnchainKitProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BaseOnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY}
          chain={base}
        >
          {children}
        </BaseOnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

