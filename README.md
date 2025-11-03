# Farcaster Base App

A Next.js application integrated with Farcaster SDK and Base network support.

## Features

- 🚀 Next.js 14 with App Router
- 🔗 Farcaster Mini App SDK integration
- ⛓️ Base network support via OnchainKit
- 💼 Wallet connection with Wagmi
- 📱 TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Farcaster account
- Optional: Coinbase Developer Platform (CDP) API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
copy .env.example .env
```

3. Update `.env` with your configuration:
   - Add your CDP Client API key if you have one
   - Set your app URLs (for deployment)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
farcaster-base-app/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   └── OnchainKitProvider.tsx  # OnchainKit provider setup
├── hooks/
│   ├── useFarcasterSDK.ts  # Farcaster SDK hook
│   └── useBaseWallet.ts    # Wallet connection hook
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## Environment Variables

- `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL
- `NEXT_PUBLIC_CDP_CLIENT_API_KEY`: Coinbase Developer Platform API key
- `NEXT_PUBLIC_URL`: Your deployed app URL
- `NEXT_PUBLIC_IMAGE_URL`: App image URL (optional)
- `NEXT_PUBLIC_SPLASH_IMAGE_URL`: Splash screen image URL (optional)
- `NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR`: Splash screen background color (optional)

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Update your `.env` file with the deployed URL

## Testing in Warpcast

1. Deploy your app (e.g., to Vercel)
2. Copy your deployed URL
3. Use Warpcast Frames Developer Tools to preview and test your Mini App

## Resources

- [Farcaster Docs](https://docs.farcaster.xyz/)
- [Base Docs](https://docs.base.org/)
- [OnchainKit Docs](https://docs.base.org/base-app/build-with-minikit/overview)
- [Next.js Docs](https://nextjs.org/docs)

## License

MIT

