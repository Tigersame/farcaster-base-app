# 🚀 Base Mini App - Complete Setup Guide

## ✅ Current Status

Your Base Mini App is fully configured and ready for deployment! Here's what has been set up:

### ✅ Configuration Files
- **`.env`** - Complete environment variables (created)
- **`minikit.config.ts`** - Base Mini App manifest configuration
- **`package.json`** - All dependencies installed
- **Smart Contracts** - Deployed and verified on Base networks

### ✅ Environment Variables Configured
```env
NEXT_PUBLIC_URL=http://localhost:3000
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
```

---

## 🚀 Quick Start Commands

### 1. Install Dependencies (if needed)
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

### 3. Build for Production
```bash
npm run build
npm start
```

### 4. Deploy Smart Contracts (if needed)
```bash
# Deploy to Base Sepolia testnet
npm run contracts:deploy:baseSepolia

# Deploy to Base mainnet
npm run contracts:deploy:base

# Verify contract on BaseScan
npm run contracts:verify
```

---

## 📋 Deployment Checklist

### Step 1: Deploy to Vercel
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Complete Base Mini App setup"
   git push
   ```

2. **Deploy on Vercel**:
   - Go to: https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables (see below)
   - Click "Deploy"

### Step 2: Update Environment Variables in Vercel
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_URL=https://your-app-name.vercel.app
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
```

### Step 3: Update minikit.config.ts
After deployment, update the `ROOT_URL` in `minikit.config.ts`:
```typescript
const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'https://your-app-name.vercel.app'
```

### Step 4: Create Account Association
1. **Disable Vercel Protection**:
   - Vercel Dashboard → Settings → Deployment Protection → OFF

2. **Generate Association**:
   - Go to: https://www.base.dev/preview?tab=account
   - Paste your deployed URL
   - Follow verification steps
   - Update `accountAssociation` in `minikit.config.ts`

### Step 5: Test Your Mini App
1. **Preview**: https://base.dev/preview
2. **Post on Base**: Share your app URL in a post

---

## 📁 Project Structure

```
farcaster-base-app-1/
├── .env                    # Environment variables (created)
├── minikit.config.ts       # Base Mini App configuration
├── package.json           # Dependencies and scripts
├── app/                   # Next.js app directory
│   ├── layout.tsx
│   ├── page.tsx
│   └── .well-known/farcaster.json/route.ts
├── components/            # React components
├── contracts/             # Smart contracts
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities and shared code
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier

# Smart Contracts
npm run contracts:compile    # Compile contracts
npm run contracts:deploy:base        # Deploy to Base mainnet
npm run contracts:deploy:baseSepolia # Deploy to Base Sepolia
npm run contracts:verify     # Verify contract on BaseScan
```

---

## 📚 Additional Documentation

- **`BASE_MINI_APP_SETUP.md`** - Detailed Base Mini App setup guide
- **`QUICK_START_ENV.md`** - Environment variables reference
- **`ENV_SETUP.md`** - Environment configuration guide
- **`CONTRACT_INFO.md`** - Smart contract information
- **`REFACTOR_SUMMARY.md`** - Code refactoring details

---

## 🎯 Next Steps

1. **Test locally**: `npm run dev`
2. **Deploy to Vercel**: Follow deployment checklist above
3. **Create account association**: After deployment
4. **Test on Base**: Use base.dev/preview
5. **Share your app**: Post on Base to reach users!

Your Base Mini App is ready to earn BASETAP tokens! 🎮🪙