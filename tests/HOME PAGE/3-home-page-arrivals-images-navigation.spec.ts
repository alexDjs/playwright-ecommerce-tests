// spec: Home Page - Images in Arrivals Should Navigate
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Image Navigation', () => {
  
  test('Images in Arrivals should navigate to product pages', async ({ page }) => {
    // Step 1: Browser opens automatically
    
    // Step 2: Enter the URL
    await page.goto('http://practice.automationtesting.in/');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' })
        .click({ timeout: 5000 });
    } catch (error) {
      console.log('Consent dialog not found or already dismissed');
    }
    
    // Step 3: Click on Shop Menu
    await page.getByRole('link', { name: 'Shop' }).click();
    await expect(page).toHaveURL(/.*\/shop\//);
    
    // Step 4: Now click on Home menu button
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/practice\.automationtesting\.in\/$/);
    
    // Step 5: Test whether the Home page has Three Arrivals only
    await expect(page.getByText('new arrivals')).toBeVisible();
    
    // Step 6: The Home page must contains only three Arrivals
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    
    // Verify each arrival has image, title, price
    for (let i = 0; i < 3; i++) {
      const product = arrivalsLocator.nth(i);
      await expect(product.locator('img')).toBeVisible();
      await expect(product.locator('h3')).toBeVisible();
      await expect(product.locator('.price, .woocommerce-Price-amount').first()).toBeVisible();
    }
    
    // Step 7: Now click the image in the Arrivals
    const firstProductImage = arrivalsLocator.first().locator('img');
    await expect(firstProductImage).toBeVisible();
    
    // Get the product name before clicking for validation
    const firstProductName = await arrivalsLocator.first().locator('h3').textContent();
    
    // Click the image
    await firstProductImage.click();
    
    // Step 8: Test whether it is navigating to next page where user can add book to basket
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    
    // Verify product detail page elements
    await expect(page.locator('.product_title, h1')).toBeVisible();
    await expect(page.locator('.summary .price').first()).toBeVisible();
    
    // Step 9: Image should navigate to page where user can add book to basket
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible();
    await expect(addToBasketButton).toBeEnabled();
    
    // Additional validations
    await expect(page.locator('.summary')).toBeVisible();
    
    // Verify we're on the correct product page
    if (firstProductName) {
      await expect(page.locator('.product_title, h1')).toContainText(firstProductName.trim());
    }
    
    console.log('✅ Test passed: Arrival images navigate correctly to product pages');
  });
  
  test('All arrival images should be clickable and navigate correctly', async ({ page }) => {
    // Step 1-4: Navigate to home page via Shop
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
    
    // Step 5-6: Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    
    const arrivalCount = await arrivalsLocator.count();
    
    // Step 7-9: Test each arrival image navigation
    for (let i = 0; i < arrivalCount; i++) {
      // Go back to home page if not on first iteration
      if (i > 0) {
        await page.goBack();
        await expect(page).toHaveURL(/practice\.automationtesting\.in\/$/);
        await expect(page.getByText('new arrivals')).toBeVisible();
      }
      
      const product = arrivalsLocator.nth(i);
      const productImage = product.locator('img');
      const productName = await product.locator('h3').textContent();
      
      // Ensure image is visible and clickable
      await expect(productImage).toBeVisible();
      
      // Click the image
      await productImage.click();
      
      // Verify navigation to product page
      await expect(page).toHaveURL(/.*\/product\/.*\//);
      await expect(page.locator('.product_title, h1')).toBeVisible();
      
      // Verify add to basket functionality
      const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
      await expect(addToBasketButton).toBeVisible();
      await expect(addToBasketButton).toBeEnabled();
      
      // Verify product information is displayed
      await expect(page.locator('.summary .price').first()).toBeVisible();
      
      console.log(`✅ Product ${i + 1} (${productName?.trim()}) navigation verified`);
    }
  });
  
});

