# 🚀 GitHub Actions — Test Execution Guide

## 📊 Test Suites Overview

| Suite | Tests | Duration | When to Use |
|-------|-------|----------|-------------|
| 💨 **SMOKE** | 4 tests | 2-3 min | Quick validation before PR merge |
| ⚠️ **CRITICAL** | 10 tests | 5-7 min | Verify key business scenarios |
| 🏠 **HOMEPAGE** | 65 tests | 20-25 min | Complete homepage testing |
| 🔐 **LOGIN** | 49 tests | 15-20 min | Complete authentication testing |
| 🎯 **ALL** | 114 tests | 35-45 min | Full regression before release |

---

## 🎮 How to Run Tests on GitHub

### Option 1️⃣: Via GitHub UI

1. Navigate to: `https://github.com/alexDjs/playwright-ecommerce-tests/actions`
2. Select **"Playwright Tests"** workflow
3. Click **"Run workflow"** (top right)
4. Choose test suite:
   - **smoke** — for quick validation
   - **critical** — for important scenarios
   - **all** — for complete test run
   - **homepage** / **login** — for specific features

5. Click green **"Run workflow"** button
6. Wait for results (duration depends on suite)

### Option 2️⃣: Automatic Execution

Tests run automatically on:
- **Push to main** → runs all tests (ALL)
- **Pull Request** → runs smoke tests
- **Daily at 2:00 AM UTC** → regression (ALL)

---

## 📦 Artifacts and Reports

After test execution, available artifacts:

### 📄 HTML Report
- Download artifact `playwright-report-*`
- Extract archive
- Open `index.html` in browser

### 🧪 Test Results
- Artifact `test-results-*`
- Contains screenshots, videos, traces of failed tests

### 🌐 GitHub Pages (main branch only)
Automatically published at:
```
https://alexDjs.github.io/playwright-ecommerce-tests/reports/{run_number}/
```

---

## 💡 Local Execution (for comparison)

```powershell
# Smoke tests (2-3 min)
npm run test:smoke

# Critical tests (5-7 min)
npm run test -- --project=critical

# All tests (35-45 min)
npm test

# With UI mode
npm run test:ui

# Homepage only
npm run test:home

# Login only
npm run test:login
```

---

## 🏷️ Test Tags

### @smoke (4 tests)
- ✅ Home Page — 3 sliders
- ✅ Login — valid credentials
- ✅ Add to Basket — basic scenario
- ✅ Checkout — complete flow

### @critical (10 tests)
All smoke tests + additional:
- ✅ Incorrect credentials
- ✅ Coupon validation
- ✅ Remove book from basket
- ✅ Update quantity
- ✅ Final price calculation
- ✅ Payment gateway
- ✅ Place order

---

## 🔧 Project Configuration

In `playwright.config.ts`:

```typescript
projects: [
  { name: 'chromium' },      // All tests (except @smoke/@critical)
  { name: 'smoke' },         // Only @smoke
  { name: 'critical' },      // Only @critical
  { name: 'homepage' },      // Only HOME PAGE (no duplicates)
  { name: 'login' },         // Only LOGIN (no duplicates)
]
```

**Important:** Tests are no longer duplicated — each test runs only once!

---

## 🎯 Best Practices

### ✅ Before PR Merge
```bash
npm run test:smoke  # Run locally
```
Or wait for automatic smoke test run on GitHub

### ⚠️ Before Release
Run **CRITICAL** on GitHub via "Run workflow"

### 🎯 Full Regression
Run **ALL** via "Run workflow" or wait for nightly scheduled run

---

## 📞 Troubleshooting

### ❌ Smoke tests failing on GitHub
1. Check locally: `npm run test:smoke`
2. If passing locally — CI environment issue
3. Check workflow logs in GitHub Actions

### ❌ "No tests found"
- Ensure tests have `@smoke` or `@critical` tags
- Check `playwright.config.ts` — project must have `grep: /@smoke/`

### ⏱️ Tests running too long
- Use **smoke** instead of **all** for quick validation
- Run **homepage** or **login** separately

---

## 🚀 Quick Start

**Want to check before commit?**
```powershell
npm run test:smoke
```

**Want to run on GitHub?**
1. Open: https://github.com/alexDjs/playwright-ecommerce-tests/actions
2. "Playwright Tests" → "Run workflow" → Select "smoke"
3. Get results in 2-3 minutes

**Done!** 🎉
