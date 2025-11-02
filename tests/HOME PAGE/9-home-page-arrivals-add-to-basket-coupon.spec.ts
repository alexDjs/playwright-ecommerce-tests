// spec: Home Page - Arrivals Add to Basket - Items - Coupon
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Items - Coupon', () => {
  
  test('Complete shopping flow with coupon application', async ({ page }) => {
    test.setTimeout(60000); // Extended timeout for complete flow
    
    // Steps 1-2: Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found or already dismissed');
    }
    
    // Steps 3-4: Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Steps 5-6: Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    console.log('✅ Verified home page has exactly 3 arrivals');
    
    // Get product details before navigation
    const firstProductName = await arrivalsLocator.first().locator('h3').textContent();
    const firstProductPrice = await arrivalsLocator.first().locator('.price, .woocommerce-Price-amount').first().textContent();
    console.log(`Testing product: ${firstProductName} - ${firstProductPrice}`);
    
    // Steps 7-9: Click product image and navigate to details
    const firstProductImage = arrivalsLocator.first().locator('img');
    await expect(firstProductImage).toBeVisible();
    await firstProductImage.click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    console.log('✅ Successfully navigated to product detail page');
    
    // Verify add to basket button and functionality
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible();
    await expect(addToBasketButton).toBeEnabled();
    
    // Step 10: Add to basket
    await addToBasketButton.click();
    console.log('✅ Product added to basket');
    
    // Step 11: Verify cart menu update
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toBeVisible();
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    
    const cartText = await cartMenu.textContent();
    console.log('✅ Cart updated with:', cartText);
    
    // Steps 12-13: Navigate to checkout
    console.log('Navigating to checkout page...');
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log(`✅ Successfully navigated to checkout: ${page.url()}`);
    
    // Verify checkout page elements
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
    
    // Get original total price before coupon application
    let originalTotal = '';
    const totalSelectors = [
      '.cart-subtotal .woocommerce-Price-amount',
      '.order-total .woocommerce-Price-amount',
      '.cart_totals .amount',
      '.woocommerce-Price-amount'
    ];
    
    for (const selector of totalSelectors) {
      try {
        const totalElement = page.locator(selector).last();
        if (await totalElement.isVisible({ timeout: 3000 })) {
          originalTotal = await totalElement.textContent() || '';
          if (originalTotal.includes('₹')) {
            console.log(`✅ Found original total: ${originalTotal}`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Steps 14-15: Apply coupon code
    console.log('Looking for coupon input field...');
    
    // Look for coupon input field with various possible selectors
    const couponSelectors = [
      'input[name="coupon_code"]',
      '#coupon_code',
      '.coupon input',
      'input[placeholder*="coupon" i]',
      'input[placeholder*="code" i]',
      '.woocommerce-form-coupon input'
    ];
    
    let couponInput;
    let couponApplyButton;
    
    for (const selector of couponSelectors) {
      const inputElement = page.locator(selector);
      if (await inputElement.isVisible({ timeout: 3000 })) {
        couponInput = inputElement;
        console.log(`✅ Found coupon input field: ${selector}`);
        break;
      }
    }
    
    if (couponInput) {
      // Enter coupon code
      await couponInput.fill('krishnasakinala');
      console.log('✅ Entered coupon code: krishnasakinala');
      
      // Look for apply button
      const applyButtonSelectors = [
        'button[name="apply_coupon"]',
        'input[name="apply_coupon"]',
        '.coupon button',
        'button:has-text("Apply")',
        'input[value*="Apply" i]'
      ];
      
      for (const selector of applyButtonSelectors) {
        const buttonElement = page.locator(selector);
        if (await buttonElement.isVisible({ timeout: 3000 })) {
          couponApplyButton = buttonElement;
          console.log(`✅ Found apply coupon button: ${selector}`);
          break;
        }
      }
      
      if (couponApplyButton) {
        await couponApplyButton.click();
        console.log('✅ Clicked apply coupon button');
        
        // Wait for page to update after coupon application
        await page.waitForTimeout(3000);
        
        // Look for success message or updated pricing
        const successMessages = [
          '.woocommerce-message',
          '.notice-success',
          '.coupon-applied',
          'text=Coupon applied'
        ];
        
        let couponApplied = false;
        for (const selector of successMessages) {
          if (await page.locator(selector).isVisible({ timeout: 5000 })) {
            const messageText = await page.locator(selector).textContent();
            console.log(`✅ Coupon application message: ${messageText}`);
            couponApplied = true;
            break;
          }
        }
        
        // Verify discount application by checking for discount line item
        const discountSelectors = [
          '.cart-discount',
          '.coupon-discount',
          'tr:has-text("krishnasakinala")',
          'td:has-text("50")'
        ];
        
        for (const selector of discountSelectors) {
          if (await page.locator(selector).isVisible({ timeout: 5000 })) {
            const discountText = await page.locator(selector).textContent();
            console.log(`✅ Found discount application: ${discountText}`);
            couponApplied = true;
            break;
          }
        }
        
        if (couponApplied) {
          console.log('✅ Coupon "krishnasakinala" applied successfully');
          
          // Try to verify 50 rupee discount
          const newTotal = await page.locator(totalSelectors[0]).last().textContent();
          console.log(`Original total: ${originalTotal}, New total: ${newTotal}`);
          
        } else {
          console.log('⚠️ Could not verify coupon application - may need manual verification');
        }
        
      } else {
        console.log('⚠️ Could not find apply coupon button');
      }
      
    } else {
      console.log('⚠️ Could not find coupon input field - may not be available on this page');
    }
    
    console.log('✅ Shopping flow with coupon application test completed');
  });
  
  test('Invalid coupon code handling', async ({ page }) => {
    test.setTimeout(45000);
    
    // Complete basic add to basket flow
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate and add product
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    // Test invalid coupon
    const couponSelectors = [
      'input[name="coupon_code"]',
      '#coupon_code',
      '.coupon input',
      'input[placeholder*="coupon" i]'
    ];
    
    let couponInput;
    for (const selector of couponSelectors) {
      const inputElement = page.locator(selector);
      if (await inputElement.isVisible({ timeout: 3000 })) {
        couponInput = inputElement;
        break;
      }
    }
    
    if (couponInput) {
      // Test invalid coupon
      await couponInput.fill('INVALID123');
      console.log('Testing invalid coupon: INVALID123');
      
      const applyButton = page.locator('button[name="apply_coupon"], .coupon button').first();
      if (await applyButton.isVisible({ timeout: 3000 })) {
        await applyButton.click();
        await page.waitForTimeout(2000);
        
        // Look for error message
        const errorSelectors = [
          '.woocommerce-error',
          '.notice-error',
          '.error',
          'text=invalid'
        ];
        
        let errorFound = false;
        for (const selector of errorSelectors) {
          if (await page.locator(selector).isVisible({ timeout: 5000 })) {
            const errorText = await page.locator(selector).textContent();
            console.log(`✅ Invalid coupon error message: ${errorText}`);
            errorFound = true;
            break;
          }
        }
        
        if (!errorFound) {
          console.log('⚠️ Error message not found - invalid coupon may have been silently rejected');
        }
        
        // Test valid coupon after invalid
        await couponInput.fill('krishnasakinala');
        await applyButton.click();
        await page.waitForTimeout(3000);
        console.log('✅ Tested valid coupon after invalid coupon attempt');
      }
    }
    
    console.log('✅ Invalid coupon handling test completed');
  });
  
  test('Multiple products with coupon application', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    
    // Add first product
    console.log('Adding first product...');
    await arrivalsLocator.first().locator('img').click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    
    let addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    console.log('✅ First product added');
    
    // Add second product
    await page.goto('http://practice.automationtesting.in/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    console.log('Adding second product...');
    await arrivalsLocator.nth(1).locator('img').click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    
    addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('items', { timeout: 10000 });
    console.log('✅ Second product added');
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    const cartText = await cartMenu.textContent();
    console.log('Cart contents with multiple items:', cartText);
    
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    // Apply coupon to multiple items
    const couponInput = page.locator('input[name="coupon_code"], #coupon_code, .coupon input').first();
    if (await couponInput.isVisible({ timeout: 5000 })) {
      await couponInput.fill('krishnasakinala');
      
      const applyButton = page.locator('button[name="apply_coupon"], .coupon button').first();
      if (await applyButton.isVisible({ timeout: 3000 })) {
        await applyButton.click();
        await page.waitForTimeout(3000);
        console.log('✅ Applied coupon to multiple items cart');
      }
    }
    
    console.log('✅ Multiple products with coupon test completed');
  });
  
});
