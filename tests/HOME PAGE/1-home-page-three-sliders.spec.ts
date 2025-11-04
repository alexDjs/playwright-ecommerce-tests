// spec: Home Page with Three Sliders Only
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { preparePage } from '../utils/ui';
import { SITE_URL } from '../utils/site';

test.describe('Home Page with Three Sliders Only', () => {
  test('Verify that the home page contains exactly three sliders @smoke', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate with aggressive retry and different wait strategies
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Navigation attempt ${attempt}/3...`);
        const waitStrategy = attempt === 1 ? 'domcontentloaded' : (attempt === 2 ? 'load' : 'commit');
        await page.goto(SITE_URL, { 
          waitUntil: waitStrategy as any,
          timeout: 60000
        });
        console.log(`✅ Navigation succeeded with strategy: ${waitStrategy}`);
        break;
      } catch (error: any) {
        console.log(`Attempt ${attempt} failed:`, error?.message || error);
        if (attempt === 3) {
          throw new Error('Site is unreachable after 3 attempts. The test site may be down or blocking GitHub Actions IPs.');
        }
        await page.waitForTimeout(3000);
      }
    }
    
    await preparePage(page);
    
    // Verify we're on home page
    await expect(page).toHaveURL(/practice\.automationtesting\.in\/?$/);
    console.log('✅ On home page');

    // Verify exactly 3 sliders are present
    const sliders = page.locator('.n2-ss-slide');
    await expect(sliders).toHaveCount(3, { timeout: 15000 });
    console.log('✅ Found exactly 3 sliders');

    // Validate slider images are visible
    const sliderImages = page.locator('.n2-ss-slide img');
    await expect(sliderImages.nth(0)).toBeVisible({ timeout: 10000 });
    await expect(sliderImages.nth(1)).toBeVisible({ timeout: 10000 });
    await expect(sliderImages.nth(2)).toBeVisible({ timeout: 10000 });
    console.log('✅ All 3 sliders visible');

    // Validate page title
    await expect(page).toHaveTitle(/Automation Practice Site/i);
    console.log('✅ Test passed');
  });
});
