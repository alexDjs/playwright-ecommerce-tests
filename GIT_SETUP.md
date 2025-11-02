# Git Setup and Push Commands

## Initialize Git Repository

```powershell
# Navigate to project directory
cd C:\Users\alexs\Desktop\TetsPlaywright

# Initialize Git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Add Playwright E2E test suite with 114 tests"

# Connect to your GitHub repository
git remote add origin https://github.com/alexDjs/playwright-ecommerce-tests.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

## Repository Created ✅

Your repository: **https://github.com/alexDjs/playwright-ecommerce-tests**

## Enable GitHub Pages (for reports)

1. Go to repository Settings: https://github.com/alexDjs/playwright-ecommerce-tests/settings
2. In "Pages" section
3. Source: Deploy from a branch
4. Branch: `gh-pages` / `/(root)`
5. Save

## Verify CI/CD

After first push:
1. Go to "Actions" tab: https://github.com/alexDjs/playwright-ecommerce-tests/actions
2. Wait for workflow completion
3. Check artifacts with HTML reports
4. After enabling Pages, reports will be available at:
   `https://alexDjs.github.io/playwright-ecommerce-tests/reports/RUN_NUMBER/`

## Additional Commands

```powershell
# Check status
git status

# View history
git log --oneline

# Create new branch for development
git checkout -b feature/new-tests

# Return to main
git checkout main

# Update from remote repository
git pull origin main
```
