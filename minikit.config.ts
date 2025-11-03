// Base Mini App Configuration
// This file configures your manifest at app/.well-known/farcaster.json

const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'https://farcaster-base-apps.vercel.app/'

export const minikitConfig = {
  accountAssociation: {
    // These will be generated in Step 5 after deployment
    // Get from: https://www.base.dev/preview?tab=account
    "header": "eyJmaWQiOjYzOTczNCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDM4YmM1ODA5RTNCMTQyMkU2RDAzZjIwOGNmNTNEMDUyQTFlQ0E4RDMifQ",
    "payload": "eyJkb21haW4iOiJmYXJjYXN0ZXItYmFzZS1hcHBzLnZlcmNlbC5hcHAifQ",
    "signature": "uJgkWUju1Vt2P9fCMNr/qvgUpQYwiiuMiUYQ9Z5R291Gl2exRFuqc0uQB87Uil1z1nexB86fmiTiGX25mCb6HBs="
  },

  miniapp: {
    version: "1",
    name: "Base Tap Game",
    subtitle: "Earn BASETAP tokens by playing!",
    description: "Play the Tap Tap Game and complete 10 challenging levels to earn BASETAP tokens on Base network. Connect your wallet and start earning rewards!",
    screenshotUrls: [
      `${ROOT_URL}/screenshot-portrait.png`,
      `${ROOT_URL}/screenshot-landscape.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0052FF",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["game", "base", "tokens", "rewards", "tap-game", "basetap"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Tap your way to BASETAP tokens!",
    ogTitle: "Base Tap Game - Earn BASETAP Tokens",
    ogDescription: "Play Tap Tap Game and earn BASETAP tokens by completing 10 challenging levels on Base network!",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
  },
} as const

