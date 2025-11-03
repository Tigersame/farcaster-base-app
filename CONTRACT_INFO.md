# BaseTap Contract Information

## Contract Address

**Base Sepolia Testnet:**
```
0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21
```

**BaseScan Explorer:**
- Base Sepolia: https://sepolia.basescan.org/address/0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21

## Contract Details

- **Token Name**: BaseTap
- **Token Symbol**: BASETAP
- **Total Supply**: 100,000,000,000 BASETAP (100 billion)
- **Reward Per Level**: 10,000 BASETAP
- **Network**: Base Sepolia (Chain ID: 84532)
- **Standard**: ERC20

## ABI (Application Binary Interface)

The complete ABI is available in:
- `contracts/BaseTap.abi.json` - Full ABI file
- `hooks/useBaseTapContract.ts` - Minimal ABI for frontend (includes only needed functions)

### Key Functions

#### For Players:
1. **`claimLevelReward(uint256 level)`**
   - Claim 10,000 BASETAP tokens for completing a level (1-10)
   - Each level can only be claimed once per wallet

2. **`claimMultipleLevels(uint256[] levels)`**
   - Claim rewards for multiple levels at once
   - More gas efficient than claiming individually

3. **`balanceOf(address account)`**
   - Check token balance for an address

#### View Functions:
1. **`hasClaimedLevel(address player, uint256 level)`**
   - Check if a specific level has been claimed

2. **`getClaimableReward(address player, uint256[] completedLevels)`**
   - Calculate total claimable reward based on completed levels

3. **`REWARD_PER_LEVEL()`**
   - Returns the reward amount per level (10,000 * 10^18)

4. **`TOTAL_LEVELS()`**
   - Returns total number of levels (10)

## Frontend Integration

The contract is already integrated in your frontend:
- Hook: `hooks/useBaseTapContract.ts`
- Contract address is set: `0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21`
- Game component: `components/TapTapGame.tsx`

## Environment Variables

Add to your `.env` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21
```

## Testing

1. **Get Test ETH**: 
   - Base Sepolia Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

2. **Connect Wallet**: 
   - Make sure you're connected to Base Sepolia network

3. **Play Game**: 
   - Complete levels in the Tap Tap Game
   - Click "Claim" buttons to receive BASETAP tokens

4. **Check Balance**: 
   - View your BASETAP token balance in the game UI
   - Or check on BaseScan explorer

## Contract Verification

To verify your contract on BaseScan:
```bash
npx hardhat verify --network baseSepolia 0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21
```

## Next Steps

1. ✅ Contract deployed to Base Sepolia
2. ✅ Frontend updated with contract address
3. ⏳ Test the game and token claiming
4. ⏳ Deploy to Base Mainnet when ready

## Support

- Contract Explorer: https://sepolia.basescan.org/address/0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21
- Base Docs: https://docs.base.org/

