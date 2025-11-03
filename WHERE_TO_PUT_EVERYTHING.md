# 📍 WHERE TO PUT API KEY AND RPC URL - Complete Guide

## ✅ GOOD NEWS: You Only Need ONE File!

**Everything goes in ONE `.env` file in the root directory.**

The code automatically reads from this file - you don't need to modify any other files!

---

## 📁 File Location

Create this file in your **root directory** (same folder as `package.json`):

```
farcaster-base-app/
├── .env                    ← CREATE THIS FILE HERE!
├── package.json
├── hardhat.config.js
├── components/
├── contracts/
└── ...
```

---

## 📝 Complete .env File Content

Create a file named `.env` in the root directory and copy ALL of this:

```env
# ============================================
# BaseScan API Key (for contract verification)
# ============================================
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
# View API key usage: https://etherscan.io/myapikey_stats?apikey=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI

# ============================================
# Alchemy RPC URLs (Base Mainnet)
# ============================================
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj

# ============================================
# Base Sepolia Testnet RPC URLs
# ============================================
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# ============================================
# Contract Addresses
# ============================================
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21

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

---

## 🔍 Where Each Variable is Used

### 1. BaseScan API Key
**Variable:** `BASESCAN_API_KEY`  
**Used in:**
- `hardhat.config.js` (line 32) - Contract verification
- `contracts/hardhat.config.js` (line 33) - Contract verification

### 2. Base Mainnet RPC URL (Alchemy)
**Variables:** 
- `BASE_RPC_URL` - Used by Hardhat
- `NEXT_PUBLIC_BASE_RPC_URL` - Used by frontend

**Used in:**
- `hardhat.config.js` (line 17) - Contract deployment/verification
- `contracts/hardhat.config.js` (line 18) - Contract operations
- `components/OnchainKitProvider.tsx` (line 21) - Frontend wallet connections

### 3. Contract Addresses
**Variables:**
- `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET`
- `NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA`

**Used in:**
- `hooks/useBaseTapContract.ts` - Contract interactions

---

## ⚙️ How It Works

1. **Code reads from `.env` automatically** - All config files use `process.env.VARIABLE_NAME`
2. **Defaults are already set** - If `.env` is missing, it uses hardcoded defaults
3. **`.env` file takes priority** - When you create `.env`, it overrides the defaults

---

## 📋 Step-by-Step Instructions

### Step 1: Create the .env File

1. Open your project root folder: `C:\Users\om\farcaster-base-app`
2. Create a new file named `.env` (no extension, just `.env`)
3. Copy the complete content from above into it
4. Save the file

### Step 2: Verify It Works

After creating `.env`, you can:

**Test contract verification:**
```bash
npx hardhat verify --network base 0x2e0c500476b6f45886259f8e97fcf93fa800ee78
```

**Run your app:**
```bash
npm run dev
```

---

## ⚠️ Important Security Notes

- ✅ **`.env` is already in `.gitignore`** - It won't be committed to Git
- ⚠️ **Never commit your `.env` file** - Keep it local only
- ⚠️ **Don't share API keys publicly** - They're private credentials

---

## ✅ Summary

**ONE file, ONE location:**
- **File:** `.env`
- **Location:** Root directory (`C:\Users\om\farcaster-base-app\.env`)
- **Contains:** All API keys, RPC URLs, and contract addresses
- **Used by:** All config files automatically read from it

That's it! No need to modify any other files. 🎉

