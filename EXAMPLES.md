# 🎯 Real Examples - How to Tag and Run Tests

## 📝 Example: Tagging Your Existing Tests

### Before (Current Code)
```typescript
test.describe('Home Page with Three Sliders Only', () => {
  test('Verify that the home page contains exactly three sliders', async ({ page }) => {
    // Test code
  });
});
```

### After (With Tags)
```typescript
test.describe('Home Page with Three Sliders Only @homepage @smoke', () => {
  test('Verify that the home page contains exactly three sliders @critical', async ({ page }) => {
    // Test code
  });
});
```

---

## 🏷️ How to Tag Your Tests

### Option 1: Tags in Test Title (Recommended)
```typescript
test('Test name @smoke @critical', async ({ page }) => {
  // Test code
});
```

### Option 2: Tags in describe Block
```typescript
test.describe('Feature Tests @smoke', () => {
  test('Test 1', async ({ page }) => {
    // All tests in this block inherit @smoke tag
  });
  
  test('Test 2 @critical', async ({ page }) => {
    // This test has both @smoke (from describe) and @critical
  });
});
```

### Option 3: Using test.use for metadata
```typescript
test('Test name', {
  tag: '@smoke',
}, async ({ page }) => {
  // Test code
});
```

---

## 🎯 Real Examples from Your Project

### Example 1: Critical Homepage Test
```typescript
// File: tests/HOME PAGE/1-home-page-three-sliders.spec.ts

test.describe('Home Page with Three Sliders Only @homepage @smoke', () => {
  test('Verify that the home page contains exactly three sliders @critical', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');

    // Handle consent dialog
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
      console.log('✅ Handled consent dialog');
    } catch (error) {
      console.log('ℹ️ Consent dialog not found');
    }

    // Rest of test...
  });
});
```

**How to run:**
```bash
# Run this specific critical test
npx playwright test --grep @critical

# Run all smoke tests (includes this one)
npm run test:smoke

# Run all homepage tests
npx playwright test --grep @homepage
```

---

### Example 2: Login Tests
```typescript
// File: tests/MY ACCOUNT - LOGIN/1-login-valid-credentials.spec.ts

test.describe('Login with Valid Credentials @login @smoke', () => {
  test('User should login successfully with valid credentials @critical', async ({ page }) => {
    await page.goto('http://practice.automationtesting.in/');
    
    // Handle consent
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      // Consent dialog not present
    }

    await page.getByRole('link', { name: 'My Account' }).click();
    // Login test code...
  });
});
```

**How to run:**
```bash
# Run all login tests
npx playwright test --grep @login

# Run critical login tests only
npx playwright test --grep "@login.*@critical"

# Run smoke tests (includes critical login)
npm run test:smoke
```

---

### Example 3: Basket Tests
```typescript
// File: tests/HOME PAGE/6-home-page-arrivals-images-add-to-basket.spec.ts

test.describe('Add to Basket Functionality @basket @regression', () => {
  test('Add product to basket and verify count @critical', async ({ page }) => {
    // Test code
  });
  
  test('Verify basket icon updates @smoke', async ({ page }) => {
    // Test code  
  });
  
  test('Multiple products in basket @regression', async ({ page }) => {
    // Test code
  });
});
```

**How to run:**
```bash
# Run all basket tests
npm run test:basket

# Run critical basket tests
npx playwright test --grep "@basket.*@critical"

# Run basket smoke tests
npx playwright test --grep "@basket.*@smoke"
```

---

### Example 4: Checkout Tests
```typescript
// File: tests/HOME PAGE/16-home-page-arrivals-add-to-basket-checkout-functionality.spec.ts

test.describe('Checkout Process @checkout @critical', () => {
  test('Complete checkout with valid data @smoke', async ({ page }) => {
    // Test code
  });
  
  test('Checkout with coupon code @regression', async ({ page }) => {
    // Test code
  });
  
  test('Payment gateway integration @payment @critical', async ({ page }) => {
    // Test code
  });
});
```

**How to run:**
```bash
# Run all checkout tests
npm run test:checkout

# Run critical checkout tests
npx playwright test --grep "@checkout.*@critical"

# Run payment tests specifically
npx playwright test --grep @payment
```

---

## 🚀 Running Tests - Complete Guide

### 1. Run by Tags

```bash
# Smoke tests (fast, critical paths) - ~5 minutes
npm run test:smoke
# or
npx playwright test --grep @smoke

# Critical tests (must-pass before release) - ~15 minutes
npm run test:critical
# or
npx playwright test --grep @critical

# Regression tests (full coverage) - ~30 minutes
npm run test:regression
# or
npx playwright test --grep @regression
```

### 2. Run by Feature Area

```bash
# Homepage tests
npm run test:home
# or
npx playwright test "tests/HOME PAGE"
# or
npx playwright test --grep @homepage

# Login tests
npm run test:login
# or
npx playwright test "tests/MY ACCOUNT - LOGIN"
# or
npx playwright test --grep @login

# Basket tests
npm run test:basket
# or
npx playwright test --grep @basket

# Checkout tests
npm run test:checkout
# or
npx playwright test --grep @checkout
```

### 3. Run by Priority

```bash
# Critical tests only (highest priority)
npx playwright test --grep @critical

# Smoke + Critical (before deployment)
npx playwright test --grep "@smoke|@critical"

# Everything except slow tests
npx playwright test --grep-invert @slow
```

### 4. Run Single File

```bash
# Specific file
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts

# With headed mode
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts --headed

# With UI mode
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts --ui
```

### 5. Run Single Test

```bash
# By line number
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts:7

# By test name (partial match)
npx playwright test --grep "Verify that the home page contains exactly three sliders"

# By test name and tag
npx playwright test --grep "three sliders.*@critical"
```

---

## 📊 Recommended Tagging Strategy for Your Project

### For Your 114 Tests, I recommend:

#### 1. **@smoke** (20-30 tests)
Tag the most critical happy path tests:
- Homepage displays correctly
- Login with valid credentials
- Add product to basket
- Complete checkout
- Place order successfully

#### 2. **@critical** (40-50 tests)
Tag business-critical flows:
- All smoke tests
- Error handling
- Payment processing
- Order confirmation

#### 3. **@regression** (All 114 tests)
Tag everything for full regression:
- All validation tests
- Edge cases
- Complete feature coverage

#### 4. Feature tags
- **@homepage** - Homepage tests (65 tests)
- **@login** - Login tests (49 tests)
- **@basket** - Basket/cart tests
- **@checkout** - Checkout tests
- **@payment** - Payment tests
- **@order** - Order tests

---

## 🎯 Example CI/CD Workflows

### Quick PR Check (Smoke Tests)
```yaml
# .github/workflows/pr-check.yml
name: PR Quick Check

on:
  pull_request:

jobs:
  smoke:
    name: 💨 Smoke Tests
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      - name: Run smoke tests
        run: npx playwright test --project=smoke
```

### Nightly Full Regression
```yaml
# .github/workflows/nightly.yml
name: Nightly Regression

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily

jobs:
  regression:
    name: 🔍 Full Regression
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      - name: Run all tests
        run: npx playwright test --project=regression
```

### Pre-Release Critical Tests
```yaml
# .github/workflows/release.yml
name: Release Tests

on:
  push:
    tags:
      - 'v*'

jobs:
  critical:
    name: ⚠️ Critical Tests
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      - name: Run critical tests
        run: npx playwright test --project=critical
```

---

## 💡 Best Practices

1. **Start Simple**
   - Don't tag everything at once
   - Start with @smoke for 20-30 critical tests
   - Add more tags as needed

2. **Be Consistent**
   - Use lowercase tags: `@smoke` not `@Smoke`
   - Use hyphens for multi-word: `@payment-gateway`
   - Document your tags in TESTING_GUIDE.md

3. **Keep It Manageable**
   - Too many tags = confusion
   - Stick to 5-7 main tags
   - Use feature tags sparingly

4. **Review Regularly**
   - Update tags as project evolves
   - Remove obsolete tags
   - Keep smoke tests fast (<5 min)

---

## 📝 Quick Start Checklist

- [ ] Read TESTING_GUIDE.md
- [ ] Add @smoke tag to 20-30 critical tests
- [ ] Add @critical tag to business-critical tests
- [ ] Run `npm run test:smoke` to verify
- [ ] Update CI/CD to run smoke tests on PR
- [ ] Document your tagging strategy in README

---

**🎯 Remember:** For your current 114 tests, the suite-based approach (HOME PAGE, LOGIN) is perfect! Add tags only when you need more flexibility.
