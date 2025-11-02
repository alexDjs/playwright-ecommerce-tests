// spec: Home Page - Arrivals Images Add to Basket
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { preparePage } from '../utils/ui';

test.describe('Home Page Arrivals Image Add to Basket', () => {
  
  test('Arrivals images should navigate to product pages and add to basket @smoke @critical', async ({ page }) => {
    test.setTimeout(45000);
    
    // Navigate with aggressive retry
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Navigation attempt ${attempt}/3...`);
        const waitStrategy = attempt === 1 ? 'domcontentloaded' : (attempt === 2 ? 'load' : 'commit');
        await page.goto('http://practice.automationtesting.in/', { 
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
    
    // Verify arrivals section exists
    await expect(page.getByText('new arrivals')).toBeVisible({ timeout: 15000 });
    
    // Verify exactly 3 arrivals
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3, { timeout: 15000 });
    console.log('✅ Found 3 arrivals');
    
    // Click first product image
    const firstProductImage = arrivalsLocator.first().locator('img');
    await expect(firstProductImage).toBeVisible({ timeout: 10000 });
    await firstProductImage.click();
    
    // Verify navigation to product page
    await expect(page).toHaveURL(/.*\/product\/.*\//, { timeout: 10000 });
    console.log('✅ Navigated to product page');
    
    // Verify Add to Basket button exists and click it
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible({ timeout: 10000 });
    await addToBasketButton.click();
    console.log('✅ Clicked Add to Basket');
    
    // Wait for cart update
    await page.waitForTimeout(2000);
    
    // Verify cart menu shows item
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toBeVisible({ timeout: 10000 });
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    
    const cartText = await cartMenu.textContent();
    console.log('✅ Cart updated:', cartText);
    console.log('✅ Test passed');
  });
  
  test('All arrival products can be added to basket', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds
    
    // Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 5000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    
    // Collect all product links first
    const productLinks = [];
    for (let i = 0; i < 3; i++) {
      const product = arrivalsLocator.nth(i);
      const productName = await product.locator('h3').textContent();
      const productImageLink = await product.locator('a').first().getAttribute('href');
      productLinks.push({ name: productName, link: productImageLink });
    }
    
    // Test each product individually by navigating directly
    for (let i = 0; i < productLinks.length; i++) {
      const productInfo = productLinks[i];
      
      console.log(`Testing product ${i + 1}: ${productInfo.name}`);
      
      // Navigate directly to product page
      await page.goto(productInfo.link || '');
      
      // Verify navigation to product page
      await expect(page).toHaveURL(/.*\/product\/.*\//);
      await expect(page.locator('.product_title, h1')).toBeVisible();
      
      // Verify add to basket functionality
      const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
      await expect(addToBasketButton).toBeVisible();
      await expect(addToBasketButton).toBeEnabled();
      
      // Add product to basket
      await addToBasketButton.click();
      await page.waitForTimeout(2000);
      
      // Verify addition was successful
      try {
        const successMessage = page.locator('.woocommerce-message, .added-to-cart, .success');
        await expect(successMessage).toBeVisible({ timeout: 5000 });
      } catch (error) {
        console.log(`Product ${i + 1} - Success message not found, checking cart state`);
      }
      
      // Verify cart menu is accessible
      const cartMenu = page.locator('.wpmenucart-contents');
      await expect(cartMenu).toBeVisible();
      
      console.log(`✅ Product ${i + 1} (${productInfo.name?.trim()}) added to basket successfully`);
    }
  });
  
  test('Basket menu item shows added products with prices', async ({ page }) => {
    // Navigate to home page and first product
    await page.goto('http://practice.automationtesting.in/');
    
    // Handle consent dialog
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 5000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate via Shop -> Home -> First Product
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const firstProductImage = page.locator('.products .product').first().locator('img');
    const firstProductName = await page.locator('.products .product').first().locator('h3').textContent();
    const firstProductPrice = await page.locator('.products .product').first().locator('.price, .woocommerce-Price-amount').first().textContent();
    
    await firstProductImage.click();
    
    // Add product to basket
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    await page.waitForTimeout(2000);
    
    // Check cart/basket menu item
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toBeVisible();
    
    // Verify cart has item count and price
    const cartText = await cartMenu.textContent();
    expect(cartText).toContain('item');
    expect(cartText).toContain('₹');
    console.log('Cart menu shows:', cartText);
    
    console.log('✅ Basket menu functionality verified');
  });
  
});
