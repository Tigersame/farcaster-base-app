# Quick Start - Environment Variables

## Create Your .env File

Create a `.env` file in the root directory with this content:

```env
# ============================================
# Base Network RPC URLs (Alchemy)
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
# BaseScan API Key (for contract verification)
# ============================================
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
# View API key usage: https://etherscan.io/myapikey_stats?apikey=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI

# ============================================
# Optional: Wallet Private Key (only if deploying)
# ============================================
# PRIVATE_KEY=your_private_key_here

# ============================================
# Optional: Farcaster/CDP
# ============================================
# NEXT_PUBLIC_CDP_CLIENT_API_KEY=your_cdp_client_api_key_here
# NEXT_PUBLIC_URL=http://localhost:3000
```

## Next Steps

1. **Verify your contract** (now that you have the API key):
   ```bash
   npx hardhat verify --network base 0x2e0c500476b6f45886259f8e97fcf93fa800ee78
   ```

2. **Run your app**:
   ```bash
   npm run dev
   ```

## Important Security Notes

- ⚠️ **Never commit your `.env` file** to Git
- ⚠️ **Keep API keys private** - don't share them publicly
- ✅ The `.env` file is already in `.gitignore` for safety

