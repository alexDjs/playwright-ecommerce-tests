<div align="center">

# 🎭 Playwright E2E Testing Suite

**Automated end-to-end tests for practice.automationtesting.in**

[![Playwright Tests](https://github.com/alexDjs/playwright-ecommerce-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/alexDjs/playwright-ecommerce-tests/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)

[Features](#-features) • [Quick Start](#-quick-start) • [Running Tests](#-running-tests) • [Test Coverage](#-test-coverage) • [CI/CD](#-cicd)

</div>

---

## ✨ Features

- 🎯 **114 unique E2E tests** covering critical user flows
- � **Smoke tests** (4 tests, ~2-3 min) — Quick validation before merge
- ⚠️ **Critical tests** (10 tests, ~5-7 min) — Key business scenarios
- 🚀 **Optimized execution** — No test duplication, single browser run
- 📊 **Automated HTML reports** with 30 days retention on GitHub Pages
- 🔄 **Daily scheduled runs** at 2:00 AM UTC
- 🛡️ **Retry mechanisms** for flaky test resilience
- 📱 **Flexible GitHub Actions** with manual test suite selection

---

## 📋 Project Structure

```
tests/
├── HOME PAGE/              # Home page tests (65 tests)
│   ├── 1-home-page-three-sliders.spec.ts
│   ├── 2-home-page-three-arrivals.spec.ts
│   ├── 3-home-page-arrivals-images-navigation.spec.ts
│   ├── 4-home-page-arrivals-images-description.spec.ts
│   ├── 5-home-page-arrivals-images-reviews.spec.ts
│   ├── 6-home-page-arrivals-images-add-to-basket.spec.ts
│   ├── 7-home-page-arrivals-add-to-basket-stock-limits.spec.ts
│   ├── 8-home-page-arrivals-add-to-basket-checkout-items.spec.ts
│   ├── 9-home-page-arrivals-add-to-basket-coupon.spec.ts
│   ├── 10-home-page-arrivals-add-to-basket-coupon-value-restriction.spec.ts
│   ├── 11-home-page-arrivals-add-to-basket-remove-book.spec.ts
│   ├── 12-home-page-arrivals-add-to-basket-update-quantity.spec.ts
│   ├── 13-home-page-arrivals-add-to-basket-final-price.spec.ts
│   ├── 14-home-page-arrivals-add-to-basket-update-basket-checkout.spec.ts
│   ├── 15-home-page-arrivals-add-to-basket-total-subtotal.spec.ts
│   ├── 16-home-page-arrivals-add-to-basket-checkout-functionality.spec.ts
│   ├── 17-home-page-arrivals-add-to-basket-payment-gateway.spec.ts
│   └── 18-home-page-arrivals-add-to-basket-place-order.spec.ts
│
└── MY ACCOUNT - LOGIN/     # Login tests (49 tests)
    ├── 1-login-valid-credentials.spec.ts
    ├── 2-login-incorrect-credentials.spec.ts
    ├── 3-login-valid-username-empty-password.spec.ts
    ├── 4-login-empty-username-valid-password.spec.ts
    ├── 5-login-empty-username-empty-password.spec.ts
    ├── 6-login-password-masking.spec.ts
    ├── 7-login-case-sensitivity.spec.ts
    └── 8-login-authentication-after-logout.spec.ts
```

**Total:** 114 tests

---

## 🚀 Quick Start

### 📦 Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js | 18 or higher |
| npm | Latest |

### ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/alexDjs/playwright-ecommerce-tests.git
cd playwright-ecommerce-tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## 📚 Documentation

<table>
<tr>
<td width="50%">

### 📖 Guides

- 📘 **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Complete testing guide
  - Test organization strategies
  - Running tests by tags, folders, projects
  - CI/CD configuration options
  - Performance metrics and recommendations

</td>
<td width="50%">

### 💡 Examples

### 💡 Quick Start

- 🚀 **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick command reference
   - Most common commands
   - Tag usage
   - GitHub Actions manual runs
   - Tips and tricks

- 📗 **[EXAMPLES.md](EXAMPLES.md)** - Real-world examples
  - How to tag tests
  - Running single tests
  - Complex filtering
  - CI/CD workflow examples

</td>
</tr>
</table>

---

## 🧪 Running Tests

<table>
<tr>
<td width="50%">

### 🎯 Quick Test Suites

```bash
# 💨 Smoke tests (2-3 min)
npm run test:smoke

# ⚠️ Critical tests (5-7 min)
npx playwright test --project=critical

# 🎯 All tests (35-45 min)
npm test

# 🏠 Homepage only (20-25 min)
npm run test:home

# 🔐 Login only (15-20 min)
npm run test:login

# Debug mode
npm run test:debug

# Show HTML report
npm run report
```

</td>
<td width="50%">

### 🎪 Advanced Options

```bash
# With UI mode
npm run test:ui

# Headed mode (see browser)
npm run test:headed

# Debug specific test
npm run test:debug

# Generate code
npm run codegen
```

</td>
</tr>
<tr>
<td colspan="2">

### 📊 Test Suite Overview

| Suite | Tests | Duration | Use Case |
|-------|-------|----------|----------|
| 💨 **Smoke** | 4 tests | 2-3 min | Quick validation before PR merge |
| ⚠️ **Critical** | 10 tests | 5-7 min | Key business scenarios |
| 🏠 **Homepage** | 65 tests | 20-25 min | Full homepage feature testing |
| 🔐 **Login** | 49 tests | 15-20 min | Complete authentication flows |
| 🎯 **All** | 114 tests | 35-45 min | Full regression testing |

**📖 For detailed GitHub Actions guide:** See [GITHUB_ACTIONS_GUIDE.md](GITHUB_ACTIONS_GUIDE.md)

</td>
</tr>
<tr>
<td width="50%">

### 📁 Single File or Test

```bash
# Run single file
npx playwright test path/to/file.spec.ts

# Run single test (by line number)
npx playwright test file.spec.ts:10

# Run by test name
npx playwright test --grep "test name"
```

</td>
</tr>
</table>

> 💡 **See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed instructions and [EXAMPLES.md](EXAMPLES.md) for real-world examples**

---

## 📊 Test Coverage

<table>
<tr>
<td width="50%" valign="top">

### 🏠 HOME PAGE Suite
**65 Tests**

- ✅ Sliders and new arrivals
- ✅ Product navigation
- ✅ Description and reviews
- ✅ Add to basket functionality
- ✅ Quantity management
- ✅ Coupons and discounts
- ✅ Checkout process
- ✅ Payment gateway
- ✅ Order confirmation

</td>
<td width="50%" valign="top">

### 🔐 LOGIN Suite
**49 Tests**

- ✅ Valid credentials
- ✅ Invalid credentials
- ✅ Empty fields validation
- ✅ Password masking
- ✅ Case sensitivity
- ✅ Authentication after logout
- ✅ Error handling
- ✅ Session management

</td>
</tr>
</table>

---

## 🔧 Configuration

### ⚙️ Playwright Settings

| Setting | Value | Description |
|---------|-------|-------------|
| **Browser** | Chromium | Primary test browser |
| **Timeout** | 30 seconds | Default action timeout |
| **Retries** | 2 | Automatic retry on failure |
| **Workers** | 1 | Sequential execution |
| **Reporter** | HTML | Rich visual reports |

### 🔄 CI/CD Pipeline

<details>
<summary><strong>GitHub Actions Workflows</strong></summary>

#### 🎭 Main Test Workflow

Automated test execution on:

- ✅ **Push to `main`/`master`** - Immediate feedback
- ✅ **Pull Requests** - Pre-merge validation (runs smoke tests)
- ✅ **Daily Schedule** - 2:00 AM UTC health check
- ✅ **Manual Trigger** - On-demand execution with suite selection

**Performance:**
- Parallel execution by **test suite** (HOME PAGE + LOGIN run simultaneously)
- Average runtime per suite: **~15 minutes**
- Total runtime: **~15-20 minutes** (parallel execution)
- Artifact retention: **30 days**

**Manual Run Options:**
- Run all tests (default)
- Run specific suite: homepage, login
- Run by category: smoke, critical, regression

#### 💨 Smoke Test Workflow

Quick validation on Pull Requests:

- ✅ **Pull Requests** - Automatic smoke test execution
- ✅ **Manual Trigger** - On-demand quick validation
- ⏱️ **Runtime:** ~5 minutes
- 🎯 **Purpose:** Critical path validation before merge

#### 📋 Test List Workflow

Manual workflow to view all available tests:
- Go to [Actions](https://github.com/alexDjs/playwright-ecommerce-tests/actions)
- Select "📋 List Tests"
- Click "Run workflow"
- View complete test list in the summary

</details>

<details>
<summary><strong>📊 Understanding Test Results</strong></summary>

After workflow completion, check the **Summary** tab to see:

1. **📋 Test Execution Info** - Overview of all test suites (114 tests, 26 files)
2. **🏠 HOME PAGE Tests** - Results from HOME PAGE suite (65 tests, 18 files)
3. **🔐 LOGIN Tests** - Results from LOGIN suite (49 tests, 8 files)
4. **📊 Test Suites Executed** - Complete breakdown by suite
5. **📦 Available Artifacts** - Download HTML reports
6. **🌐 Published Report** - Link to GitHub Pages (main branch only)

**Download Reports:**
- Scroll to bottom of workflow run
- Look for "Artifacts" section
- Download `playwright-report-merged` for complete results from all suites
- Or download individual suite reports: `playwright-report-🏠` or `playwright-report-🔐`

</details>

---

## 📈 Reports & Artifacts

After each CI/CD run:

1. 📄 **HTML Reports** - Detailed test results with screenshots
2. 🎯 **Test Artifacts** - Available in Actions tab (30 days)
3. 🌐 **GitHub Pages** - Published reports for `main` branch

**View Reports:** [Actions Tab](https://github.com/alexDjs/playwright-ecommerce-tests/actions)

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|:----------:|:--------|
| ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white) | E2E Testing Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | Programming Language |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) | CI/CD Platform |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | Runtime Environment |

</div>

---

## 📝 Best Practices

<details>
<summary><strong>🎯 Test Reliability</strong></summary>

- ✅ Using `http` protocol for consistent SSL handling
- ✅ Handling consent dialogs with try-catch
- ✅ Waiting for `domcontentloaded` after navigation
- ✅ Awaited assertions for UI elements
- ✅ Retry mechanisms for flaky operations

</details>

<details>
<summary><strong>🔍 Element Selection</strong></summary>

- ✅ Robust selectors with fallback options
- ✅ Re-querying elements after navigation
- ✅ Scroll into view before interaction
- ✅ Wait for URL changes with `waitForURL`

</details>

<details>
<summary><strong>📊 Logging & Debugging</strong></summary>

- ✅ Detailed console logging at each step
- ✅ Success/failure indicators (✅/❌)
- ✅ Debug mode available via `npm run test:debug`
- ✅ UI mode for visual debugging

</details>

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. 💾 **Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. 📤 **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. 🔀 **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

<div align="center">

**Alex**

[![GitHub](https://img.shields.io/badge/GitHub-alexDjs-181717?style=for-the-badge&logo=github)](https://github.com/alexDjs)

</div>

---

<div align="center">

### 🎯 Test Status

![Tests](https://img.shields.io/badge/Tests-114_Passing-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Suites-2-blue?style=for-the-badge)
![Stability](https://img.shields.io/badge/Stability-Stable-green?style=for-the-badge)

**⭐ Star this repo if you find it helpful!**

[Report Bug](https://github.com/alexDjs/playwright-ecommerce-tests/issues) • [Request Feature](https://github.com/alexDjs/playwright-ecommerce-tests/issues)

</div>
 
 

### 🎯 Getting Started

- 🗺️ **[STRATEGY.md](STRATEGY.md)** - Testing strategy overview
   - Visual decision trees
   - When to use what approach
   - Performance comparisons
   - Recommendations for your project

- 🔄 **[RETRY_STRATEGY.md](RETRY_STRATEGY.md)** - Retry strategy explained
   - Why tests retry on CI
   - How to configure retries
   - Debugging flaky tests
   - Best practices
