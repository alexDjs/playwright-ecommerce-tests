// spec: Home Page - Arrivals Add to Basket - Checkout Items
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Checkout Items', () => {
  
  test('Complete add to basket and checkout flow @smoke @critical', async ({ page }) => {
    test.setTimeout(45000); // Reduced timeout
    
    // Step 1 & 2: Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found or already dismissed');
    }
    
    // Step 3 & 4: Navigate via Shop -> Home (simplified)
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Step 5 & 6: Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    
    // Get product details before navigation
    const firstProductName = await arrivalsLocator.first().locator('h3').textContent();
    const firstProductPrice = await arrivalsLocator.first().locator('.price, .woocommerce-Price-amount').first().textContent();
    console.log(`Testing product: ${firstProductName} - ${firstProductPrice}`);
    
    // Step 7-9: Click product image and navigate to details
    const firstProductImage = arrivalsLocator.first().locator('img');
    await firstProductImage.click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    
    // Verify product detail page and add to basket
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible();
    
    // Step 10: Add to basket
    await addToBasketButton.click();
    
    // Step 11: Wait for cart update with smart waiting
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toBeVisible();
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    
    const cartText = await cartMenu.textContent();
    console.log('✅ Cart updated with:', cartText);
    
    // Step 12-13: Navigate to checkout
    console.log('Clicking on items link to navigate to checkout...');
    await cartMenu.click();
    
    // Wait for checkout page navigation
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    // Wait for checkout page navigation
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log(`✅ Successfully navigated to checkout page: ${page.url()}`);
    
    // Verify checkout page content
    const checkoutElements = ['.cart_item', '.shop_table', '.cart-contents', '.woocommerce-cart'];
    let checkoutElementFound = false;
    
    for (const selector of checkoutElements) {
      if (await page.locator(selector).isVisible({ timeout: 5000 })) {
        console.log(`✅ Found checkout element: ${selector}`);
        checkoutElementFound = true;
        break;
      }
    }
    
    expect(checkoutElementFound).toBeTruthy();
    console.log('✅ Add to basket and checkout navigation test completed');
  });
  
  test('Multiple items checkout navigation', async ({ page }) => {
    test.setTimeout(45000); // Reduced timeout
    
    // Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    
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
    await page.goto('http://practice.automationtesting.in/');
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
    await page.goto('http://practice.automationtesting.in/');
    
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
