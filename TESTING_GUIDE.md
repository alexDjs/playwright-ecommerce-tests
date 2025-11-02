# 🎯 Testing Guide - Best Practices

## 📚 Table of Contents
- [Test Organization](#-test-organization)
- [Running Tests](#-running-tests)
- [Tags System](#-tags-system)
- [CI/CD Configuration](#-cicd-configuration)
- [Examples](#-examples)

---

## 🗂️ Test Organization

### Large Project Best Practices

In large projects, tests should be organized by:

1. **Feature Area** (folder structure)
   ```
   tests/
   ├── HOME PAGE/          # Homepage features
   ├── MY ACCOUNT - LOGIN/ # Authentication
   ├── BASKET/             # Shopping cart (if you add later)
   └── CHECKOUT/           # Checkout process (if you add later)
   ```

2. **Tags** (in test titles)
   ```typescript
   test('Test name @smoke @critical', async ({ page }) => {
     // Test code
   });
   ```

3. **Projects** (in playwright.config.ts)
   - Run specific test suites
   - Run by tags (smoke, regression, critical)
   - Run by feature area

---

## 🚀 Running Tests

### By Folder (Feature Area)
```bash
# Run all HOME PAGE tests
npm run test:home

# Run all LOGIN tests  
npm run test:login

# Or use direct path
npx playwright test "tests/HOME PAGE"
```

### By Project (Configured in playwright.config.ts)
```bash
# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run critical tests only
npm run test:critical

# Run basket-related tests
npm run test:basket

# Run checkout-related tests
npm run test:checkout
```

### By Tag (Using grep)
```bash
# Run all tests with @smoke tag
npx playwright test --grep @smoke

# Run all tests with @critical tag
npx playwright test --grep @critical

# Run tests with multiple tags (OR logic)
npx playwright test --grep "@smoke|@critical"

# Exclude tests with specific tag
npx playwright test --grep-invert @slow
```

### By Single File
```bash
# Run specific test file
npm run test:file tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts

# Or directly
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts
```

### By Single Test
```bash
# Run test by line number
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts:10

# Run test by title (partial match)
npx playwright test --grep "should display three sliders"
```

### Advanced Options
```bash
# Run in headed mode
npx playwright test --headed --project=smoke

# Run with UI mode (interactive)
npx playwright test --ui

# Run in debug mode
npx playwright test --debug

# Run specific browser
npx playwright test --project=chromium
```

---

## 🏷️ Tags System

### Standard Tags

| Tag | Purpose | When to Use |
|-----|---------|-------------|
| `@smoke` | Quick sanity checks | Critical happy paths, runs in <5 min |
| `@regression` | Full feature validation | Complete test coverage, runs in CI |
| `@critical` | Business-critical flows | Must pass before release |
| `@slow` | Long-running tests | Tests that take >30 seconds |
| `@flaky` | Unstable tests | Tests being fixed, skipped in CI |

### Feature-Specific Tags

| Tag | Purpose |
|-----|---------|
| `@homepage` | Homepage features |
| `@login` | Authentication |
| `@basket` | Shopping cart |
| `@checkout` | Checkout process |
| `@payment` | Payment gateway |
| `@order` | Order management |

### How to Add Tags

```typescript
// Single tag
test('Verify slider functionality @smoke', async ({ page }) => {
  // Test code
});

// Multiple tags
test('Complete checkout process @regression @critical @checkout', async ({ page }) => {
  // Test code
});

// Tags in describe block (applies to all tests)
test.describe('Login Tests @login @critical', () => {
  test('Valid credentials', async ({ page }) => {
    // All tests in this block get @login and @critical tags
  });
});
```

---

## 🔄 CI/CD Configuration

### Current Setup (by Suite)

```yaml
# .github/workflows/playwright.yml
strategy:
  matrix:
    include:
      - suite-name: "🏠 HOME PAGE Tests"
        test-path: "tests/HOME PAGE"
      - suite-name: "🔐 LOGIN Tests"
        test-path: "tests/MY ACCOUNT - LOGIN"
```

### Alternative: By Tags (for large projects)

```yaml
strategy:
  matrix:
    include:
      - suite-name: "💨 Smoke Tests"
        project: "smoke"
      - suite-name: "🔍 Regression Tests"
        project: "regression"
      - suite-name: "⚠️ Critical Tests"
        project: "critical"

# Run command
npx playwright test --project=${{ matrix.project }}
```

### Alternative: By Shards (for very large projects)

```yaml
strategy:
  matrix:
    shard: [1/10, 2/10, 3/10, 4/10, 5/10, 6/10, 7/10, 8/10, 9/10, 10/10]

# Run command  
npx playwright test --shard=${{ matrix.shard }}
```

---

## 📝 Examples

### Example 1: Tagging Existing Tests

**Before:**
```typescript
test('should display three sliders', async ({ page }) => {
  // Test code
});
```

**After:**
```typescript
test('should display three sliders @smoke @homepage @critical', async ({ page }) => {
  // Test code
});
```

### Example 2: Running Smoke Tests Before Deployment

```bash
# Local
npm run test:smoke

# CI/CD
npx playwright test --project=smoke
```

### Example 3: Running Single Feature

```bash
# By folder
npm run test:home

# By project
npx playwright test --project=homepage

# By tag
npx playwright test --grep @homepage
```

### Example 4: Complex Filtering

```bash
# Run smoke tests but exclude slow ones
npx playwright test --grep @smoke --grep-invert @slow

# Run critical tests for homepage only
npx playwright test "tests/HOME PAGE" --grep @critical

# Run all tests except flaky ones
npx playwright test --grep-invert @flaky
```

---

## 🎓 Recommendations for Your Project

### Current State: 114 Tests
✅ **Current approach is good:** Running by suite (HOME PAGE, LOGIN)

### When to Switch Strategies:

#### Use **Tags** when:
- Tests grow beyond 500+
- Need different test categories (smoke, regression, critical)
- Want to run subset of tests across multiple folders
- Need flexible test selection in CI/CD

#### Use **Shards** when:
- Tests grow beyond 1000+
- Single suite takes more than 30 minutes
- Need maximum parallelization
- Have powerful CI/CD infrastructure

### Recommended Next Steps:

1. **Add smoke tags** to critical tests (20-30 tests)
   ```typescript
   test('Login with valid credentials @smoke @critical', async ({ page }) => {
   ```

2. **Create smoke test workflow**
   ```yaml
   # .github/workflows/smoke.yml
   on:
     pull_request:  # Run on every PR
   ```

3. **Keep suite-based approach** for full test runs
   - Fast enough for your current size
   - Clear and understandable
   - Easy to maintain

---

## 📊 Performance Metrics

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| **By Suite** | Small-Medium projects (<500 tests) | Simple, clear, maintainable | Limited flexibility |
| **By Tags** | Medium-Large projects (500-2000 tests) | Flexible, categorized | Requires discipline |
| **By Shards** | Large projects (2000+ tests) | Maximum parallel, scalable | Complex setup |

---

## 🎯 Quick Reference

```bash
# Run everything
npm test

# Run specific suite
npm run test:home
npm run test:login

# Run by category
npm run test:smoke      # Quick checks (~5 min)
npm run test:critical   # Must-pass tests (~15 min)
npm run test:regression # Full coverage (~30 min)

# Run single file
npx playwright test path/to/file.spec.ts

# Run single test
npx playwright test path/to/file.spec.ts:10

# Interactive mode
npm run test:ui

# Debug mode
npm run test:debug
```

---

**💡 Tip:** Start simple, add complexity only when needed. Your current suite-based approach is perfect for 114 tests!
