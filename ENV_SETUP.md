# Environment Variables Setup Guide

## Quick Setup

Create a `.env` file in the root directory and add your configuration:

## Required Variables

### Base Network RPC URLs (Your Alchemy API Key)

```env
# Your Alchemy Base Mainnet RPC URL
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj

# Base Sepolia Testnet RPC URL
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

### Contract Addresses

```env
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21
```

## Optional Variables

### For Contract Deployment/Verification

```env
# Wallet Private Key (for deployment/verification only)
# ⚠️ SECURITY: Never commit this file! Keep it secure.
PRIVATE_KEY=your_private_key_here

# BaseScan API Key (for contract verification)
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
# View API key usage: https://etherscan.io/myapikey_stats?apikey=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
```

### For Farcaster/CDP Integration

```env
NEXT_PUBLIC_CDP_CLIENT_API_KEY=your_cdp_client_api_key_here
NEXT_PUBLIC_URL=http://localhost:3000
```

## Complete .env File Example

Copy this into your `.env` file (create it if it doesn't exist):

```env
# ============================================
# Base Network RPC URLs
# ============================================
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# ============================================
# Contract Addresses
# ============================================
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21

# ============================================
# Optional: Deployment/Verification
# ============================================
# PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI

# ============================================
# Optional: Farcaster/CDP
# ============================================
# NEXT_PUBLIC_CDP_CLIENT_API_KEY=your_cdp_client_api_key_here
# NEXT_PUBLIC_URL=http://localhost:3000
```

## Where the RPC URL is Used

Your Alchemy RPC URL (`https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj`) is configured in:

1. **Frontend (Wagmi)** - `components/OnchainKitProvider.tsx`
   - Used for wallet connections and contract interactions
   - Environment variable: `NEXT_PUBLIC_BASE_RPC_URL`

2. **Hardhat (Root)** - `hardhat.config.js`
   - Used for contract deployment and verification
   - Environment variable: `BASE_RPC_URL`

3. **Hardhat (Contracts)** - `contracts/hardhat.config.js`
   - Used for contract operations in contracts directory
   - Environment variable: `BASE_RPC_URL`

## Important Notes

- ✅ **The RPC URL is already set as default** in the code, so it will work even without `.env`
- ✅ **Adding it to `.env`** allows you to easily change it later without modifying code
- ⚠️ **Never commit your `.env` file** - it may contain sensitive keys
- ⚠️ **Keep private keys secure** - only add `PRIVATE_KEY` if you need to deploy/verify contracts

## After Setup

1. Save the `.env` file
2. Restart your dev server if running: `npm run dev`
3. The app will now use your Alchemy RPC endpoint!

