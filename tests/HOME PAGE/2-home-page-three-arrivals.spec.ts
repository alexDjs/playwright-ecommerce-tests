// spec: Home Page with Three Arrivals Only
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page with Three Arrivals Only', () => {
  test('Verify home page contains exactly three arrivals', async ({ page }) => {
    // 1. Navigate to the website
    await page.goto('http://practice.automationtesting.in/');

    // 2. Handle consent dialog if present
    await page.getByRole('button', { name: 'Do not consent' }).click();

    // 3. Click on Shop Menu
    await page.getByRole('link', { name: 'Shop' }).click();

    // 4. Now click on Home menu button
    await page.getByRole('link', { name: 'Home' }).click();

    // 5. Test whether Home page has Three Arrivals only - verify new arrivals section exists
    await expect(page.getByText('new arrivals')).toBeVisible();

    // 6. Validate only three Arrivals - verify exactly 3 products are displayed
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);

    // Verify each arrival product has required elements
    for (let i = 0; i < 3; i++) {
      const product = arrivalsLocator.nth(i);
      await expect(product.locator('img')).toBeVisible();
      await expect(product.locator('h3')).toBeVisible();
      await expect(product.locator('.price, .woocommerce-Price-amount').first()).toBeVisible();
      await expect(product.getByRole('link', { name: 'Add to basket' })).toBeVisible();
    }

    // Verify the specific products that should be present
    await expect(page.getByRole('heading', { name: 'Selenium Ruby' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thinking in HTML' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mastering JavaScript' })).toBeVisible();
  });
});
