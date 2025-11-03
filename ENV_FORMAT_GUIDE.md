# Environment Variables Format Guide

## Fixing "Multi-line input is not supported" Error

This error occurs when environment variables contain line breaks or are formatted incorrectly.

## ✅ Correct Format (.env file)

Each variable must be on a **single line**:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_private_key_here_without_any_line_breaks
```

## ❌ Incorrect Format (will cause errors)

```env
# WRONG - Multi-line values
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
0x1234567890abcdef

# WRONG - Line breaks in value
PRIVATE_KEY=0x123
456789abcdef

# WRONG - Multi-line strings
NEXT_PUBLIC_URL=https://example.com
/api
```

## Common Causes

1. **Private Key with line breaks**: Private keys must be on one line
2. **Contract address split across lines**: Addresses must be complete on one line
3. **URLs with line breaks**: URLs must be complete on one line
4. **Copy-paste errors**: Sometimes copying values adds hidden line breaks

## How to Fix

1. **Check your `.env` file**:
   - Open `.env` in a text editor
   - Make sure each variable is on exactly ONE line
   - No line breaks within values

2. **For Private Keys**:
   - Remove any spaces or line breaks
   - Should be: `PRIVATE_KEY=0x1234567890abcdef...` (all on one line)

3. **For Contract Addresses**:
   - Must be complete: `0x2e0c500476b6f45886259f8e97fcf93fa800ee78`
   - No line breaks in the middle

## Quick Example (.env)

```env
# Base Network Configuration
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Contract Addresses (ONE LINE EACH)
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21

# Wallet Private Key (MUST BE ONE LINE - NO LINE BREAKS!)
PRIVATE_KEY=your_complete_private_key_on_single_line_here

# Optional API Keys
BASESCAN_API_KEY=your_api_key_here
NEXT_PUBLIC_CDP_CLIENT_API_KEY=your_cdp_key_here
```

## After Fixing

1. Save the `.env` file
2. Restart your dev server: `npm run dev`
3. The error should be resolved

