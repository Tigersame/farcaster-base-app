# GitHub Setup Instructions

Your Git repository has been initialized and your first commit is ready! Follow these steps to push to GitHub:

## Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in to your account
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Enter a repository name (e.g., `farcaster-base-app`)
5. Choose **Public** or **Private**
6. **IMPORTANT**: Do NOT check any of these boxes:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   
   (We already have these files in the project!)
7. Click **Create repository**

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in PowerShell:

```powershell
# Navigate to your project
cd C:\Users\om\Desktop\farcaster-base-app

# Add GitHub as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name.**

## Alternative: Copy the exact commands from GitHub

GitHub will show you the exact commands after creating the repo - copy and paste those instead!

## Step 3: Verify

After pushing, refresh your GitHub repository page - you should see all your files there!

## Future Updates

After making changes to your code:

```powershell
cd C:\Users\om\Desktop\farcaster-base-app
git add .
git commit -m "Your commit message"
git push
```

## Need Help?

- GitHub Docs: https://docs.github.com/en/get-started
- Git Tutorial: https://git-scm.com/docs/gittutorial

