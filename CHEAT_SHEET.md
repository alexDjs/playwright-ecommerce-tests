# 🎯 Playwright Tests - One Page Cheat Sheet

## 📁 Project Structure
- **HOME PAGE**: 65 tests, 18 files
- **LOGIN**: 49 tests, 8 files  
- **Total**: 114 tests

---

## 🚀 Local Commands

| Action | Command |
|--------|---------|
| Run all tests | `npm test` |
| HOME PAGE only | `npm run test:home` |
| LOGIN only | `npm run test:login` |
| UI mode (interactive) | `npm run test:ui` |
| Debug mode | `npm run test:debug` |
| Headed mode | `npm run test:headed` |
| Show report | `npm run report` |
| Single file | `npx playwright test path/to/file.spec.ts` |
| Single test (line) | `npx playwright test file.spec.ts:10` |
| By test name | `npx playwright test --grep "test name"` |

---

## 🏷️ Tag Commands (Optional)

| Action | Command |
|--------|---------|
| Smoke tests | `npm run test:smoke` |
| Critical tests | `npm run test:critical` |
| Regression tests | `npm run test:regression` |
| Basket tests | `npm run test:basket` |
| Checkout tests | `npm run test:checkout` |
| Multiple tags | `npx playwright test --grep "@smoke\|@critical"` |
| Exclude tag | `npx playwright test --grep-invert @slow` |

---

## 🎭 GitHub Actions

### Automatic Triggers
- ✅ Push to `main` → Full test suite
- ✅ Pull Request → Smoke tests
- ✅ Daily 2 AM UTC → Regression tests

### Manual Run
1. Go to **Actions** tab
2. Select **Playwright Tests**
3. Click **Run workflow**
4. Choose: `all`, `homepage`, `login`, `smoke`, `critical`, `regression`

### View Results
1. Click workflow run → **Summary** tab
2. Scroll to **Artifacts** section
3. Download `playwright-report-merged`

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [STRATEGY.md](STRATEGY.md) | Visual overview & decision trees |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Command cheat sheet |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | Complete testing guide |
| [EXAMPLES.md](EXAMPLES.md) | Real-world examples |
| [README.md](README.md) | Project overview |
| [GIT_SETUP.md](GIT_SETUP.md) | Git instructions |

---

## 💡 Pro Tips

✅ Use `test:ui` for test development  
✅ Use `test:debug` to pause and inspect  
✅ Add `--headed` to see browser  
✅ Use `test.only()` to run single test  
✅ Press `Ctrl+C` to stop tests  
✅ Check Summary tab in GitHub Actions  

---

## 🎯 When to Use What

| Scenario | Command |
|----------|---------|
| Developing tests | `npm run test:ui` |
| Debugging failure | `npm run test:debug` |
| Before commit | `npm run test:smoke` |
| Full validation | `npm test` |
| Specific feature | `npm run test:home` |
| CI/CD | Automatic |

---

## 🏷️ How to Add Tags

```typescript
// Single tag
test('Test name @smoke', async ({ page }) => {
  // code
});

// Multiple tags
test('Test name @smoke @critical', async ({ page }) => {
  // code
});

// Tags in describe block
test.describe('Feature @smoke', () => {
  test('Test 1', async ({ page }) => {
    // inherits @smoke
  });
});
```

---

**For detailed instructions, see [TESTING_GUIDE.md](TESTING_GUIDE.md)**
