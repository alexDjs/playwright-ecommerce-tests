# 🎯 Quick Reference - Test Execution

## 🚀 Most Common Commands

```bash
# Run all tests
npm test

# Run specific suite
npm run test:home          # HOME PAGE tests (65 tests)
npm run test:login         # LOGIN tests (49 tests)

# Run single file
npx playwright test tests/HOME\ PAGE/1-home-page-three-sliders.spec.ts

# Interactive UI mode
npm run test:ui

# Debug mode
npm run test:debug

# Show report
npm run report
```

---

## 🏷️ Tags (Optional - if you add them)

```bash
# Quick smoke tests (~5 min)
npm run test:smoke

# Critical tests (~15 min)
npm run test:critical

# Full regression (~30 min)
npm run test:regression

# By feature
npm run test:basket
npm run test:checkout
```

---

## 📁 Advanced Filtering

```bash
# Run by test name
npx playwright test --grep "slider"

# Run by line number
npx playwright test file.spec.ts:10

# Multiple tags
npx playwright test --grep "@smoke|@critical"

# Exclude tag
npx playwright test --grep-invert @slow

# Combine folder and tag
npx playwright test "tests/HOME PAGE" --grep @critical
```

---

## 🎭 GitHub Actions

### Manual Workflow Run

1. Go to **Actions** tab
2. Select **"Playwright Tests"**
3. Click **"Run workflow"**
4. Choose test suite:
   - `all` - Run everything (default)
   - `homepage` - HOME PAGE tests only
   - `login` - LOGIN tests only
   - `smoke` - Quick critical tests
   - `critical` - Business-critical tests
   - `regression` - Full coverage

### View Results

1. Click on workflow run
2. Go to **Summary** tab
3. See:
   - 📋 Test Execution Info
   - 🏠 HOME PAGE Results
   - 🔐 LOGIN Results
   - 📊 Test Suites Executed
4. Scroll down to **Artifacts**
5. Download `playwright-report-merged`

---

## 📚 More Information

- 📘 **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Complete guide
- 📗 **[EXAMPLES.md](EXAMPLES.md)** - Real examples
- 📙 **[README.md](README.md)** - Project overview
- 📕 **[GIT_SETUP.md](GIT_SETUP.md)** - Git instructions

---

## 💡 Tips

- Use **`npm run test:ui`** for interactive test development
- Use **`npm run test:debug`** to pause and inspect
- Use **`--headed`** to see browser: `npm test -- --headed`
- Press **`Ctrl+C`** to stop running tests
- Add **`test.only()`** to run single test during development
- Use **`.spec.ts`** naming convention for test files

---

## 🎯 When to Use What

| Use Case | Command |
|----------|---------|
| Local development | `npm run test:ui` |
| Debugging failing test | `npm run test:debug` |
| Before committing | `npm run test:smoke` (if tags added) |
| Full validation | `npm test` |
| Specific feature | `npm run test:home` |
| Single file | `npx playwright test path/to/file.spec.ts` |
| CI/CD | Automatic on push/PR |

---

**For detailed explanations, see [TESTING_GUIDE.md](TESTING_GUIDE.md)**
