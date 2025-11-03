# BaseTap Smart Contract

## Overview

BaseTap is an ERC20 token contract for the Base Tap Game. Players earn BASETAP tokens by completing game levels.

## Token Details

- **Token Name**: BaseTap
- **Token Symbol**: BASETAP
- **Total Supply**: 100,000,000,000 BASETAP (100 billion)
- **Reward Per Level**: 10,000 BASETAP

## Features

- Players can claim 10,000 BASETAP tokens for each level completed (10 levels total)
- Prevents duplicate claims for the same level
- Supports claiming multiple levels at once
- Standard ERC20 token functionality

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Base Network RPC URL
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Your wallet private key (for deployment)
PRIVATE_KEY=your_private_key_here

# Basescan API key (optional, for verification)
BASESCAN_API_KEY=your_api_key_here
```

### 3. Compile the Contract

```bash
npm run compile
```

### 4. Deploy to Base Sepolia (Testnet)

First, deploy to testnet to test:

```bash
npm run deploy:baseSepolia
```

After successful deployment, you'll get a contract address. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env` file.

### 5. Deploy to Base Mainnet

Once tested, deploy to mainnet:

```bash
npm run deploy:base
```

**Important**: Make sure you have enough ETH on Base network to pay for gas fees.

### 6. Update Frontend

After deployment, update the contract address in:
- `hooks/useBaseTapContract.ts` - Update `CONTRACT_ADDRESS`
- `.env` file - Add `NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address`

## Contract Functions

### `claimLevelReward(uint256 level)`
Claim tokens for completing a specific level (1-10).

### `claimMultipleLevels(uint256[] levels)`
Claim tokens for multiple levels at once.

### `hasClaimedLevel(address player, uint256 level)`
Check if a player has already claimed rewards for a specific level.

### `getClaimableReward(address player, uint256[] completedLevels)`
Calculate total claimable reward for a player based on completed levels.

### `balanceOf(address account)`
Get token balance for an address.

## Security Notes

- The contract uses OpenZeppelin's audited contracts
- Level rewards can only be claimed once per player
- Contract owner holds initial supply and distributes rewards

## Network Information

- **Base Mainnet**: Chain ID 8453
- **Base Sepolia**: Chain ID 84532

## Getting Test ETH

For Base Sepolia testnet:
- Base Sepolia Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

For Base Mainnet:
- Bridge ETH from Ethereum mainnet
- Use a DEX to swap

## Verification

To verify your contract on Basescan:

```bash
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

