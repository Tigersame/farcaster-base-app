/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_CDP_CLIENT_API_KEY: process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY,
    NEXT_PUBLIC_BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL,
    NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL,
    NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET,
    NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@farcaster/miniapp-sdk', 'wagmi', 'viem'],
  },

  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure .well-known routes are accessible
  async headers() {
    return [
      {
        source: '/.well-known/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

