# Farcaster Base App

A Next.js application integrated with Farcaster SDK and Base network support.

## Features

- 🚀 Next.js 14 with App Router
- 🔗 Farcaster Mini App SDK integration
- ⛓️ Base network support via OnchainKit
- 💼 Wallet connection with Wagmi
- 📱 TypeScript support
- 🎮 **Tap Tap Game** - 10-level tapping game with points system

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
│   ├── OnchainKitProvider.tsx  # OnchainKit provider setup
│   └── TapTapGame.tsx          # Tap Tap Game component (10 levels)
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

## 🎮 Tap Tap Game

The app includes a fun 10-level tap game where players earn points by tapping a button:

- **10 Progressive Levels**: Each level requires more taps (10 to 200)
- **Points System**: Earn points based on your current level (Level × 10 points per tap)
- **Time Limits**: Each level has a countdown timer
- **High Score Tracking**: Your best score is saved locally
- **Visual Feedback**: Progress bars, animations, and level indicators

### How to Play

1. Click "Start Game" on the home page
2. Tap the red button as fast as you can to earn points
3. Complete the required number of taps before time runs out
4. Advance through 10 increasingly challenging levels
5. Try to beat your high score!

## GitHub Setup

Your repository is already initialized with Git! To push to GitHub:

### Option 1: Using GitHub Website (Recommended)

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name your repository (e.g., `farcaster-base-app`)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**
6. Copy the repository URL (e.g., `https://github.com/yourusername/farcaster-base-app.git`)
7. Run these commands in your project directory:

```bash
cd C:\Users\om\Desktop\farcaster-base-app
git remote add origin https://github.com/yourusername/farcaster-base-app.git
git branch -M main
git push -u origin main
```

### Option 2: Using GitHub CLI

If you have GitHub CLI installed:

```bash
cd C:\Users\om\Desktop\farcaster-base-app
gh repo create farcaster-base-app --public --source=. --remote=origin --push
```

## License

MIT

