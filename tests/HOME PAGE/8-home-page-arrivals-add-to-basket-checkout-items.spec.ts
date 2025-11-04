// spec: Home Page - Arrivals Add to Basket - Checkout Items
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { preparePage } from '../utils/ui';
import { SITE_URL } from '../utils/site';

test.describe('Home Page Arrivals Add to Basket - Checkout Items', () => {
  
  test('Complete add to basket and checkout flow @smoke @critical', async ({ page }) => {
    test.setTimeout(45000);
    
    // Navigate with aggressive retry
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
    await expect(page).toHaveURL(/practice\.automationtesting\.in\/?$/);
    console.log('✅ On home page');
    
    // Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible({ timeout: 15000 });
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3, { timeout: 15000 });
    console.log('✅ Found 3 arrivals');
    
    // Click first product
    const firstProductImage = arrivalsLocator.first().locator('img');
    await expect(firstProductImage).toBeVisible({ timeout: 10000 });
    await firstProductImage.click();
    await expect(page).toHaveURL(/.*\/product\/.*\//, { timeout: 10000 });
    console.log('✅ On product page');
    
    // Add to basket
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible({ timeout: 10000 });
    await addToBasketButton.click();
    console.log('✅ Clicked Add to Basket');
    
    // Wait for cart update
    await page.waitForTimeout(2000);
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toBeVisible({ timeout: 10000 });
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    console.log('✅ Cart updated');
    
    // Click cart to go to checkout
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log('✅ On checkout page:', page.url());
    
    // Verify checkout page elements
    const checkoutElement = page.locator('.cart_item, .shop_table, .woocommerce-cart').first();
    await expect(checkoutElement).toBeVisible({ timeout: 10000 });
    console.log('✅ Test passed');
  });
  
  test('Multiple items checkout navigation', async ({ page }) => {
    test.setTimeout(45000); // Reduced timeout
    
  // Navigate to home page
  await page.goto(SITE_URL);
    
    // Handle consent dialog
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Verify arrivals
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    
    // Add first product
    console.log('Adding first product...');
    await arrivalsLocator.first().locator('img').click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    
    let addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible();
    await addToBasketButton.click();
    
    // Wait for cart update
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    console.log('✅ First product added to basket');
    
  // Navigate back to home and add second product
  await page.goto(SITE_URL);
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    await arrivalsLocator.nth(1).locator('img').click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    
    addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible();
    await addToBasketButton.click();
    
    // Wait for cart update with multiple items
    await expect(page.locator('.wpmenucart-contents')).toContainText('items', { timeout: 10000 });
    console.log('✅ Second product added to basket');
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    const cartText = await cartMenu.textContent();
    console.log('Cart contents after adding multiple items:', cartText);
    
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log(`✅ Successfully navigated to checkout: ${page.url()}`);
    console.log('✅ Multiple items checkout navigation test completed');
  });
  
  test('Cart menu items link validation', async ({ page }) => {
    test.setTimeout(30000); // Shorter timeout
    
  // Complete basic add-to-basket flow
  await page.goto(SITE_URL);
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Add first product to basket
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    
    // Wait for cart update
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Navigate to basket via cart menu (natural user flow)
    const cartMenu = page.locator('.wpmenucart-contents');
    await cartMenu.click();
    
    // Verify we're on basket/checkout page
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 10000 });
    console.log('✅ Successfully accessed basket page via cart menu');
    
    // Look for cart elements with increased timeout
    const cartElements = ['.cart_item', '.shop_table', '.cart-contents', '.product-name'];
    let foundCartElement = false;
    
    for (const selector of cartElements) {
      if (await page.locator(selector).isVisible({ timeout: 10000 })) { // Increased timeout
        console.log(`✅ Found cart element: ${selector}`);
        foundCartElement = true;
        break;
      }
    }
    
    expect(foundCartElement).toBeTruthy();
    console.log('✅ Cart menu items link validation completed');
  });
  
});
