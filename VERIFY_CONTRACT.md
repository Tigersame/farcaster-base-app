# How to Verify Your Contract on Base Mainnet

## Quick Verification Command

Once you have your BaseScan API key, run:

```bash
npx hardhat verify --network base 0x2e0c500476b6f45886259f8e97fcf93fa800ee78
```

## Step 1: Get BaseScan API Key

1. Go to: https://basescan.org/apis
2. Sign up or log in
3. Create a new API key (free tier is fine)
4. Copy your API key

**Your API Key Stats:**
- View usage: https://etherscan.io/myapikey_stats?apikey=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI

## Step 2: Add to .env File

Add this line to your `.env` file (in the root directory):

```env
BASESCAN_API_KEY=your_api_key_here
```

**Important**: Make sure it's on a SINGLE LINE with no line breaks!

## Step 3: Verify Contract

Run the verification command:

```bash
npx hardhat verify --network base 0x2e0c500476b6f45886259f8e97fcf93fa800ee78
```

## Manual Verification (Alternative)

If you prefer to verify manually:

1. Go to: https://basescan.org/verifyContract?a=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
2. Select:
   - Compiler Version: `v0.8.20+commit.a1b79de6`
   - License: `MIT`
   - Optimization: `Yes` (200 runs)
3. Paste your contract source code from `contracts/BaseTap.sol`
4. Click "Verify and Publish"

## Your Contract Details

- **Contract Address**: `0x2e0c500476b6f45886259f8e97fcf93fa800ee78`
- **Network**: Base Mainnet (Chain ID: 8453)
- **Compiler**: Solidity 0.8.20
- **Optimizer**: Enabled, 200 runs
- **Constructor**: No parameters (empty constructor)

## Current Status

✅ Contract deployed  
✅ BaseScan API key provided  
✅ Ready to verify contract

Once verified, the ABI will be publicly available on BaseScan!

