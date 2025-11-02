// spec: Home Page with Three Sliders Only
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { preparePage, clickNavLink } from '../utils/ui';

test.describe('Home Page with Three Sliders Only', () => {
  test('Verify that the home page contains exactly three sliders @smoke', async ({ page }) => {
    test.setTimeout(60000);
    
    // 1. Navigate to http://practice.automationtesting.in/
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');

    // Prepare page (load state, consent, nav ready)
    await preparePage(page);

    // 3. Click on Shop Menu
    await clickNavLink(page, 'Shop');
    console.log('✅ Clicked Shop menu');

    // 4. Click on Home menu button
    await clickNavLink(page, 'Home');
    console.log('✅ Clicked Home menu');

    // 5. Verify exactly 3 sliders are present
    const sliders = page.locator('.n2-ss-slide');
    await expect(sliders).toHaveCount(3);
    console.log('✅ Found exactly 3 sliders');

    // 6. Validate each slider content
    const sliderImages = page.locator('.n2-ss-slide img');
    
    // Verify slider 1: "Shop Selenium Books"
    await expect(sliderImages.nth(0)).toHaveAttribute('alt', /Shop.*Selenium.*Books|Selenium.*Books/i);
    console.log('✅ Slider 1 verified');
    
    // Verify slider 2: "HTML"
    await expect(sliderImages.nth(1)).toHaveAttribute('alt', /HTML/i);
    console.log('✅ Slider 2 verified');
    
    // Verify slider 3: "JavaScript"
    await expect(sliderImages.nth(2)).toHaveAttribute('alt', /JavaScript/i);
    console.log('✅ Slider 3 verified');

    // 7. Verify slider images load correctly
    await expect(sliderImages.nth(0)).toBeVisible();
    await expect(sliderImages.nth(1)).toBeVisible();
    await expect(sliderImages.nth(2)).toBeVisible();
    console.log('✅ All sliders visible');

    // 8. Validate final page state
    await expect(page).toHaveURL(/practice\.automationtesting\.in/);
    await expect(page).toHaveTitle(/Automation Practice Site/i);
    console.log('✅ Page state validated');
  });
});
