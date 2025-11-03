# 🚀 Base Mini App Setup Guide

## ✅ What's Been Configured

1. **minikit.config.ts** - Base Mini App configuration file
2. **app/.well-known/farcaster.json/route.ts** - Dynamic manifest route
3. **App metadata** - Updated for Base Mini App
4. **Farcaster SDK** - Improved integration

---

## 📋 Deployment Steps

### Step 1: Deploy to Vercel

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Configure Base Mini App"
   git push
   ```

2. **Deploy to Vercel**:
   - Go to: https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables:
     ```
     NEXT_PUBLIC_URL=https://your-app-name.vercel.app
     NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
     NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
     ```
   - Click "Deploy"

3. **Get your deployed URL**: `https://your-app-name.vercel.app`

---

### Step 2: Update minikit.config.ts

1. **Update ROOT_URL** in `minikit.config.ts`:
   ```typescript
   const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'https://your-app-name.vercel.app'
   ```

2. **Add image URLs** (optional but recommended):
   - Upload images to your Vercel deployment or use a CDN
   - Update paths in `minikit.config.ts`:
     - `iconUrl`: Your app icon (square, 512x512 recommended)
     - `splashImageUrl`: Splash screen image
     - `heroImageUrl`: Hero image for preview
     - `ogImageUrl`: Open Graph image for social sharing

---

### Step 3: Build and Test Locally (Optional)

```bash
# Build the app
npm run build

# Test production build
npm start
```

Visit http://localhost:3000 to test.

---

### Step 4: Create Account Association

**After deployment**, you need to associate your app with your Farcaster account:

1. **Ensure Vercel Deployment Protection is OFF**:
   - Go to Vercel Dashboard → Your Project → Settings → Deployment Protection
   - Toggle "Vercel Authentication" to OFF
   - Click Save

2. **Generate Account Association**:
   - Go to: https://www.base.dev/preview?tab=account
   - Paste your deployed URL (e.g., `https://your-app-name.vercel.app`)
   - Click "Submit"
   - Click "Verify" and follow instructions
   - Copy the `accountAssociation` object

3. **Update minikit.config.ts**:
   ```typescript
   accountAssociation: {
     "header": "eyJmaBBiOjE3MzE4LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4NzYwQjA0NDc5NjM4MTExNzNmRjg3YDPBYzA5OEJBQ0YxNzNCYkU0OCJ9",
     "payload": "eyJkb21haW4iOiJ4BWl0bGlzdC1xcy52ZXJjZWwuYXBwIn7",
     "signature": "MHhmNGQzN2M2OTk4NDIwZDNjZWVjYTNiODllYzJkMjAwOTkyMDEwOGVhNTFlYWI3NjAyN2QyMmM1MDVhNzIyMWY2NTRiYmRlZmQ0NGQwOWNiY2M2NmI2B7VmNGZiMmZiOGYzNDVjODVmNmQ3ZTVjNzI3OWNmMGY4ZTA2ODYzM2FjZjFi"
   },
   ```

4. **Push to GitHub**:
   ```bash
   git add minikit.config.ts
   git commit -m "Add account association"
   git push
   ```
   Vercel will auto-deploy.

---

### Step 5: Preview Your Mini App

1. **Go to Base Preview**: https://base.dev/preview

2. **Add your app URL** to test:
   - Paste: `https://your-app-name.vercel.app`
   - Check embeds and metadata
   - Click launch button to test

3. **Verify tabs**:
   - **Account association**: Should show verified ✅
   - **Metadata**: Check all fields are populated

---

### Step 6: Publish to Base App

1. **Open Base App** (mobile or web)

2. **Create a post** with your app URL:
   ```
   Check out my Base Tap Game! 🎮
   
   Play and earn BASETAP tokens! 🪙
   
   https://your-app-name.vercel.app
   ```

3. **Post it** - Base will automatically detect it as a Mini App and show the preview!

---

## 📝 Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x2e0c500476b6f45886259f8e97fcf93fa800ee78
```

---

## 🎨 Creating App Images (Optional but Recommended)

Create these images for better presentation:

1. **Icon** (`icon.png`): 512x512px square icon
2. **Splash** (`splash.png`): 1080x1920px portrait splash screen
3. **Hero** (`hero.png`): 1200x630px hero image
4. **OG Image** (`og-image.png`): 1200x630px for social sharing

Upload to your `public/` folder or use a CDN.

---

## ✅ Checklist

- [ ] App deployed to Vercel
- [ ] `NEXT_PUBLIC_URL` set in Vercel environment variables
- [ ] `minikit.config.ts` updated with deployed URL
- [ ] Account association created (Step 4)
- [ ] Account association added to `minikit.config.ts`
- [ ] Changes pushed to GitHub (auto-deploys to Vercel)
- [ ] Previewed at base.dev/preview
- [ ] Posted to Base app

---

## 🚀 Quick Commands

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy (after pushing to GitHub, Vercel auto-deploys)
git add .
git commit -m "Configure Base Mini App"
git push
```

---

**Your app is now configured as a Base Mini App!** 🎉

After deployment, follow Steps 4-6 to complete the setup and publish!

