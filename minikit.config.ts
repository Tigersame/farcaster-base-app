// Base Mini App Configuration
// This file configures your manifest at app/.well-known/farcaster.json

const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'https://farcaster-base-gw7otsg7i-devsminiapp.vercel.app'

export const minikitConfig = {
  accountAssociation: {
    "header": "eyJmaWQiOjI3OTA1NSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDRCMjEwOTE1MjJGMDA5OUI4Rjc2Mzk2OGQzNzliMGY4M2E1NWNBYjMifQ",
    "payload": "eyJkb21haW4iOiJmYXJjYXN0ZXItYmFzZS1hcHBzLnZlcmNlbC5hcHAifQ",
    "signature": "zzbF+ZWyCB/QT+/4VWZUI0rxlAbQFJDAZZ5KZpYMofgjneQTWY0HGWcn0kdEmu4dsNfpoxsbney4Bb6d0XU7RBw="
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

