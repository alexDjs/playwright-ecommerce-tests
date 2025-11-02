// spec: Home Page with Three Sliders Only
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { preparePage } from '../utils/ui';

test.describe('Home Page with Three Sliders Only', () => {
  test('Verify that the home page contains exactly three sliders @smoke', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate directly to home page
    await page.goto('http://practice.automationtesting.in/', { waitUntil: 'domcontentloaded' });
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
