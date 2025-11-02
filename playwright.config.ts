import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Navigation timeout - increased for slow/blocked sites on CI */
    navigationTimeout: process.env.CI ? 60000 : 30000,
    
    /* Action timeout */
    actionTimeout: process.env.CI ? 15000 : 10000,
    
    /* User agent to bypass bot detection */
    userAgent: process.env.CI 
      ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      : undefined,
    
    /* Extra HTTP headers */
    extraHTTPHeaders: process.env.CI ? {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    } : undefined,
  },

  /* Configure projects for major browsers */
  projects: [
    // Default: All tests
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // Exclude tagged tests to avoid duplication
      grep: /^(?!.*@smoke)(?!.*@critical)/,
    },

    // Quick validation: Critical smoke tests (~5 tests, 2-3 min)
    {
      name: 'smoke',
      use: { ...devices['Desktop Chrome'] },
      grep: /@smoke/,
      retries: 0, // Smoke tests should pass on first try
    },

    // Important scenarios: Critical business paths (~15-20 tests, 5-7 min)
    {
      name: 'critical',
      use: { ...devices['Desktop Chrome'] },
      grep: /@critical/,
      retries: 1,
    },

    // Feature-specific runs (for targeted testing)
    {
      name: 'homepage',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/HOME PAGE/**',
      grep: /^(?!.*@smoke)(?!.*@critical)/, // Exclude already-tested
    },
    {
      name: 'login',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/MY ACCOUNT - LOGIN/**',
      grep: /^(?!.*@smoke)(?!.*@critical)/, // Exclude already-tested
    },

   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
