# BaseTap Smart Contract - Quick Setup Guide

## 🎯 Overview

Your BaseTap smart contract is ready! Players earn **10,000 BASETAP tokens** for each level completed (10 levels = 100,000 tokens max).

## 📋 Token Details

- **Name**: BaseTap
- **Symbol**: BASETAP  
- **Total Supply**: 100,000,000,000 (100 billion)
- **Reward**: 10,000 tokens per level
- **Network**: Base (Chain ID: 8453)

## 🚀 Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Hardhat (development framework)
- OpenZeppelin Contracts (ERC20 standard)
- Other required packages

### 2. Get Test Tokens (Base Sepolia)

Before deploying to mainnet, test on Base Sepolia:
- Visit: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- Request test ETH

### 3. Configure Environment

Create/update `.env` file:

```env
# For Base Sepolia Testnet
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_wallet_private_key

# For Base Mainnet (after testing)
BASE_RPC_URL=https://mainnet.base.org
PRIVATE_KEY=your_wallet_private_key
```

**⚠️ Security**: Never commit your `.env` file or private keys!

### 4. Compile Contract

```bash
npm run compile
```

### 5. Deploy to Testnet (Base Sepolia)

```bash
npm run deploy:baseSepolia
```

After deployment, you'll see:
```
BaseTap deployed to: 0x...
Token Name: BaseTap
Token Symbol: BASETAP
Total Supply: 100,000,000,000 BASETAP
Reward per level: 10,000 BASETAP
```

### 6. Update Frontend

Copy the contract address and update:

**Option 1**: Update `.env` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
```

**Option 2**: Update `hooks/useBaseTapContract.ts`:
```typescript
const CONTRACT_ADDRESS = '0xYourContractAddressHere' as `0x${string}`
```

### 7. Deploy to Base Mainnet

Once tested, deploy to mainnet:

```bash
npm run deploy:base
```

**Important**: Make sure you have ETH on Base mainnet for gas fees!

## 🎮 How It Works

1. Player completes a level in the game
2. Player clicks "Claim" button for that level
3. Smart contract mints 10,000 BASETAP tokens
4. Tokens are sent to player's wallet
5. Each level can only be claimed once per player

## 📝 Contract Functions

### For Players:
- `claimLevelReward(level)` - Claim tokens for one level
- `claimMultipleLevels([levels])` - Claim multiple levels at once
- `balanceOf(address)` - Check token balance

### For Checking:
- `hasClaimedLevel(player, level)` - Check if level was claimed
- `getClaimableReward(player, levels)` - Calculate claimable amount

## 🔐 Security Features

- ✅ Uses OpenZeppelin's audited ERC20 contract
- ✅ Prevents duplicate claims (one claim per level)
- ✅ Owner holds initial supply and distributes rewards
- ✅ Standard ERC20 functionality (transfer, approve, etc.)

## 💰 Token Distribution

- **Initial Supply**: 100 billion tokens minted to contract owner
- **Distribution**: Owner transfers tokens to players as rewards
- **Reward Structure**: 10,000 tokens per level × 10 levels = 100,000 tokens max per player

## 🐛 Troubleshooting

### "Insufficient funds"
- Make sure you have ETH on Base network for gas fees

### "Contract not deployed"
- Verify contract address in `.env` or `useBaseTapContract.ts`
- Make sure you deployed the contract

### "Level reward already claimed"
- Each level can only be claimed once per wallet
- This is by design to prevent duplicate claims

## 📚 Next Steps

1. ✅ Deploy contract to Base Sepolia testnet
2. ✅ Test claiming tokens in the game
3. ✅ Deploy to Base mainnet
4. ✅ Update contract address in frontend
5. ✅ Start earning BASETAP tokens! 🎉

## 📞 Support

If you encounter issues:
- Check the deployment logs
- Verify your wallet has ETH for gas
- Ensure contract address is correctly set in frontend
- Review `contracts/README.md` for detailed documentation

