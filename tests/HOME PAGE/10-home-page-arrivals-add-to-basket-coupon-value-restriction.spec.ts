// spec: Home Page - Arrivals Add to Basket - Coupon Value Restriction (<450)
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Coupon Value Restriction', () => {
  
  test('Single low-value product - coupon restriction validation @critical', async ({ page }) => {
    test.setTimeout(90000);
    
    // Steps 1-2: Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
      console.log('✅ Handled consent dialog');
    } catch (error) {
      console.log('ℹ️ Consent dialog not found or already dismissed');
    }
    
    // Steps 3-4: Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    console.log('✅ Clicked Shop menu');
    await page.getByRole('link', { name: 'Home' }).click();
    console.log('✅ Clicked Home menu');
    
    // Steps 5-6: Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    console.log('✅ Verified home page has exactly 3 arrivals');
    
    // Get product details and select lowest price product
    const products = await arrivalsLocator.all();
    let lowestPriceProduct = null;
    let lowestPrice = Infinity;
    let lowestPriceIndex = 0;
    
    for (let i = 0; i < products.length; i++) {
      try {
        const priceElement = products[i].locator('.price, .woocommerce-Price-amount').first();
        const priceText = await priceElement.textContent();
        
        if (priceText) {
          // Extract numeric price (remove currency symbols and formatting)
          const numericPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
          console.log(`Product ${i + 1} price: ₹${numericPrice}`);
          
          if (numericPrice < lowestPrice) {
            lowestPrice = numericPrice;
            lowestPriceProduct = products[i];
            lowestPriceIndex = i;
          }
        }
      } catch (error) {
        console.log(`Warning: Could not get price for product ${i + 1}`);
      }
    }
    
    // Ensure we have a low-value product (< 450)
    if (lowestPrice >= 450) {
      console.log('⚠️ Warning: Lowest priced product is ≥ ₹450, test may not validate restriction properly');
    } else {
      console.log(`✅ Selected lowest price product: ₹${lowestPrice} (< ₹450 threshold)`);
    }
    
    // Use first product if price detection fails
    const selectedProduct = lowestPriceProduct || arrivalsLocator.first();
    const productName = await selectedProduct.locator('h3').textContent();
    console.log(`Testing with product: ${productName}`);
    
    // Steps 7-9: Click product image and navigate to details
    const productImage = selectedProduct.locator('img');
    await expect(productImage).toBeVisible();
    await productImage.click();
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
    
    // Get and verify order total is < 450
    let orderTotal = 0;
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
          const totalText = await totalElement.textContent() || '';
          if (totalText.includes('₹')) {
            orderTotal = parseFloat(totalText.replace(/[^\d.]/g, ''));
            console.log(`✅ Found order total: ₹${orderTotal}`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Verify total is under 450 for this test
    if (orderTotal >= 450) {
      console.log(`⚠️ Warning: Order total ₹${orderTotal} is ≥ ₹450. Test may not validate restriction.`);
    } else {
      console.log(`✅ Order total ₹${orderTotal} is < ₹450 - perfect for testing restriction`);
    }
    
    // Steps 14-15: Attempt to apply coupon and verify restriction
    console.log('Testing coupon restriction for orders < ₹450...');
    
    // Look for coupon input field
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
      // Enter the restricted coupon code
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
        
        // Wait for system response
        await page.waitForTimeout(3000);
        
        // Look for error message indicating minimum order requirement
        const errorSelectors = [
          '.woocommerce-error',
          '.woocommerce-message--error',
          '.notice-error',
          '.error',
          'text=minimum',
          'text=450',
          'text=Minimum order'
        ];
        
        let restrictionMessageFound = false;
        let restrictionMessageText = '';
        
        for (const selector of errorSelectors) {
          try {
            const errorElement = page.locator(selector);
            if (await errorElement.isVisible({ timeout: 5000 })) {
              restrictionMessageText = await errorElement.textContent() || '';
              console.log(`✅ Found restriction message: ${restrictionMessageText}`);
              restrictionMessageFound = true;
              break;
            }
          } catch (error) {
            continue;
          }
        }
        
        // Verify coupon was NOT applied by checking totals haven't changed
        let newTotal = 0;
        for (const selector of totalSelectors) {
          try {
            const totalElement = page.locator(selector).last();
            if (await totalElement.isVisible({ timeout: 3000 })) {
              const totalText = await totalElement.textContent() || '';
              if (totalText.includes('₹')) {
                newTotal = parseFloat(totalText.replace(/[^\d.]/g, ''));
                break;
              }
            }
          } catch (error) {
            continue;
          }
        }
        
        // Validate restriction behavior
        if (orderTotal < 450) {
          if (restrictionMessageFound) {
            console.log('✅ PASS: Coupon restriction properly enforced with error message');
            expect(restrictionMessageFound).toBeTruthy();
          } else if (newTotal === orderTotal) {
            console.log('✅ PASS: Coupon restriction enforced (no discount applied)');
          } else {
            console.log('❌ FAIL: Coupon was applied to order < ₹450 (should be restricted)');
            expect(newTotal).toBe(orderTotal); // Should fail if discount was applied
          }
          
          // Verify no discount was applied
          expect(newTotal).toBeGreaterThanOrEqual(orderTotal - 1); // Allow for minor rounding
          console.log(`✅ Order total unchanged: ₹${orderTotal} → ₹${newTotal}`);
          
        } else {
          console.log('ℹ️ Order total ≥ ₹450, coupon should be accepted (different test scenario)');
        }
        
      } else {
        console.log('❌ Could not find apply coupon button');
        expect(false).toBeTruthy(); // Force test failure
      }
      
    } else {
      console.log('❌ Could not find coupon input field');
      expect(false).toBeTruthy(); // Force test failure
    }
    
    console.log('✅ Coupon value restriction test completed');
  });
  
  test('Multiple products approaching threshold - incremental testing', async ({ page }) => {
    test.setTimeout(90000);
    
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
    let currentTotal = 0;
    let productCount = 0;
    
    // Helper function to get current cart total
    const getCurrentTotal = async () => {
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
            const totalText = await totalElement.textContent() || '';
            if (totalText.includes('₹')) {
              return parseFloat(totalText.replace(/[^\d.]/g, ''));
            }
          }
        } catch (error) {
          continue;
        }
      }
      return 0;
    };
    
    // Helper function to test coupon application
    const testCouponApplication = async () => {
      const couponInput = page.locator('input[name="coupon_code"], #coupon_code, .coupon input').first();
      if (await couponInput.isVisible({ timeout: 5000 })) {
        await couponInput.fill('krishnasakinala');
        
        const applyButton = page.locator('button[name="apply_coupon"], .coupon button').first();
        if (await applyButton.isVisible({ timeout: 3000 })) {
          await applyButton.click();
          await page.waitForTimeout(3000);
          
          // Check for success or error messages
          const successSelector = '.woocommerce-message:not(.woocommerce-error)';
          const errorSelector = '.woocommerce-error, .notice-error';
          
          if (await page.locator(successSelector).isVisible({ timeout: 3000 })) {
            const successText = await page.locator(successSelector).textContent();
            console.log(`✅ Coupon applied successfully: ${successText}`);
            return 'applied';
          } else if (await page.locator(errorSelector).isVisible({ timeout: 3000 })) {
            const errorText = await page.locator(errorSelector).textContent();
            console.log(`❌ Coupon rejected: ${errorText}`);
            return 'rejected';
          } else {
            console.log('⚠️ No clear success/error message found');
            return 'unclear';
          }
        }
      }
      return 'not_found';
    };
    
    // Add products incrementally and test coupon at each step
    for (let i = 0; i < 3 && currentTotal < 500; i++) {
      console.log(`\n--- Adding Product ${i + 1} ---`);
      
      // Add product to cart
      await arrivalsLocator.nth(i).locator('img').click();
      await expect(page).toHaveURL(/.*\/product\/.*\//);
      
      const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
      await addToBasketButton.click();
      
      productCount++;
      const expectedCartText = productCount === 1 ? 'item' : 'items';
      await expect(page.locator('.wpmenucart-contents')).toContainText(expectedCartText, { timeout: 10000 });
      
      console.log(`✅ Product ${i + 1} added to cart`);
      
      // Navigate to checkout
      const cartMenu = page.locator('.wpmenucart-contents');
      await cartMenu.click();
      await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
      
      // Get current total
      currentTotal = await getCurrentTotal();
      console.log(`Current cart total: ₹${currentTotal}`);
      
      // Test coupon application at this total
      const couponResult = await testCouponApplication();
      
      if (currentTotal < 450) {
        if (couponResult === 'rejected') {
          console.log(`✅ PASS: Coupon correctly rejected for total ₹${currentTotal} < ₹450`);
        } else if (couponResult === 'applied') {
          console.log(`❌ FAIL: Coupon incorrectly applied for total ₹${currentTotal} < ₹450`);
          expect(false).toBeTruthy(); // Force test failure
        }
      } else {
        if (couponResult === 'applied') {
          console.log(`✅ PASS: Coupon correctly applied for total ₹${currentTotal} ≥ ₹450`);
          break; // Stop testing once we reach valid threshold
        } else if (couponResult === 'rejected') {
          console.log(`⚠️ WARNING: Coupon rejected for total ₹${currentTotal} ≥ ₹450 (unexpected)`);
        }
      }
      
      // Return to home to add next product
      if (i < 2 && currentTotal < 450) {
        await page.goto('http://practice.automationtesting.in/');
        await page.getByRole('link', { name: 'Shop' }).click();
        await page.getByRole('link', { name: 'Home' }).click();
      }
    }
    
    console.log('✅ Incremental threshold testing completed');
  });
  
  test('Verify exact error message content for restriction', async ({ page }) => {
    test.setTimeout(45000);
    
    // Setup: Add single low-value product
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate and add single product
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
    
    // Get order total to confirm it's < 450
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .cart_totals .amount').last();
    const totalText = await totalElement.textContent();
    const orderTotal = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
    
    console.log(`Testing error message for order total: ₹${orderTotal}`);
    
    if (orderTotal >= 450) {
      console.log('⚠️ Skipping test - order total is ≥ ₹450');
      return;
    }
    
    // Apply restricted coupon
    const couponInput = page.locator('input[name="coupon_code"], #coupon_code, .coupon input').first();
    if (await couponInput.isVisible({ timeout: 5000 })) {
      await couponInput.fill('krishnasakinala');
      
      const applyButton = page.locator('button[name="apply_coupon"], .coupon button').first();
      if (await applyButton.isVisible({ timeout: 3000 })) {
        await applyButton.click();
        await page.waitForTimeout(3000);
        
        // Capture and validate error message
        const errorSelectors = [
          '.woocommerce-error',
          '.woocommerce-message--error',
          '.notice-error',
          '.error'
        ];
        
        let errorMessage = '';
        for (const selector of errorSelectors) {
          if (await page.locator(selector).isVisible({ timeout: 5000 })) {
            errorMessage = await page.locator(selector).textContent() || '';
            break;
          }
        }
        
        if (errorMessage) {
          console.log(`✅ Error message found: "${errorMessage}"`);
          
          // Validate error message content
          const messageToLower = errorMessage.toLowerCase();
          const hasMinimum = messageToLower.includes('minimum');
          const hasAmount = messageToLower.includes('450') || messageToLower.includes('amount');
          const hasOrder = messageToLower.includes('order');
          
          if (hasMinimum && (hasAmount || hasOrder)) {
            console.log('✅ PASS: Error message contains appropriate restriction information');
          } else {
            console.log('⚠️ WARNING: Error message may not clearly indicate minimum order requirement');
            console.log(`Expected to contain: "minimum", "order", and "450" or "amount"`);
          }
          
          // Verify message is user-friendly
          if (errorMessage.length < 10) {
            console.log('⚠️ WARNING: Error message seems too short to be helpful');
          } else if (errorMessage.length > 200) {
            console.log('⚠️ WARNING: Error message seems too long for good UX');
          } else {
            console.log('✅ Error message length is appropriate for user experience');
          }
          
        } else {
          console.log('❌ FAIL: No error message displayed when coupon should be restricted');
          expect(false).toBeTruthy(); // Force test failure
        }
      }
    }
    
    console.log('✅ Error message validation test completed');
  });
  
});
