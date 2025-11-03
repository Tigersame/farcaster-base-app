# BaseTap Mainnet Contract Information

## Contract Address (Base Mainnet)

**Base Mainnet:**
```
0x2e0c500476b6f45886259f8e97fcf93fa800ee78
```

**BaseScan Explorer:**
- Base Mainnet: https://basescan.org/address/0x2e0c500476b6f45886259f8e97fcf93fa800ee78

## Where to Find the ABI

The ABI (Application Binary Interface) for your contract can be found in:

### Option 1: Your Local Project (Recommended)
The ABI is already in your project at:
- `contracts/BaseTap.abi.json` - Complete ABI file
- `hooks/useBaseTapContract.ts` - Minimal ABI (only functions used in frontend)

Since your contract was deployed from the same source code, the ABI in `contracts/BaseTap.abi.json` matches your mainnet contract.

### Option 2: After Verification on BaseScan
Once you verify your contract on BaseScan:
1. Go to: https://basescan.org/address/0x2e0c500476b6f45886259f8e97fcf93fa800ee78#code
2. Click "Contract" tab
3. Click "Verify and Publish"
4. After verification, the ABI will be available in the "Contract" tab
5. You can copy the ABI directly from BaseScan

### Option 3: BaseScan API (if verified)
```
https://api.basescan.org/api?module=contract&action=getabi&address=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
```

## Environment Variables

Add to your `.env` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
```

Or the app will use the default addresses and RPC URLs set in the code.

## Contract Status

- ✅ Contract deployed to Base Mainnet
- ⏳ Contract not yet verified on BaseScan
- ✅ ABI available in local project files

## Verify Contract on BaseScan

To verify your contract:
1. Visit: https://basescan.org/verifyContract?a=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
2. Select compiler version (check `hardhat.config.js` for your version)
3. Select "Standard JSON Input" or "Solidity (Single file)"
4. Upload your source code
5. Complete verification

After verification, the ABI will be publicly available on BaseScan.

## Current Setup

The frontend is already configured to use your mainnet contract address:
- ✅ Mainnet address: `0x2e0c500476b6f45886259f8e97fcf93fa800ee78`
- ✅ ABI loaded from `contracts/BaseTap.abi.json`
- ✅ Network detection (automatically uses mainnet/testnet addresses)

