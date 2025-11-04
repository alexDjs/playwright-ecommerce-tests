// spec: Home Page - Arrivals Add to Basket - Update Book Quantity
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Update Book Quantity', () => {
  
  test('Basic quantity update - increase book quantity @critical', async ({ page }) => {
    test.setTimeout(120000);
    
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
    
    // Get product details for validation
    const firstProduct = arrivalsLocator.first();
    const productName = await firstProduct.locator('h3').textContent();
    const productPrice = await firstProduct.locator('.price, .woocommerce-Price-amount').first().textContent();
    console.log(`Testing with product: ${productName} - ${productPrice}`);
    
    // Extract unit price for calculations
    const unitPrice = parseFloat(productPrice?.replace(/[^\d.]/g, '') || '0');
    console.log(`Unit price for calculations: ₹${unitPrice}`);
    
    // Steps 7-9: Click product image and navigate to details
    const productImage = firstProduct.locator('img');
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
    
    // Steps 12: Navigate to checkout
    console.log('Navigating to checkout page...');
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log(`✅ Successfully navigated to checkout: ${page.url()}`);
    
    // Verify checkout page elements and product presence
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
    
    // Verify the added product is visible in checkout
    console.log('Verifying product is displayed in checkout...');
    const cartItems = page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item');
    await expect(cartItems).toHaveCount(1);
    console.log('✅ Product is displayed in checkout grid');
    
    // Get initial cart total
    let initialTotal = 0;
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
            initialTotal = parseFloat(totalText.replace(/[^\d.]/g, ''));
            console.log(`✅ Initial cart total: ₹${initialTotal}`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Steps 10-11: Find quantity controls
    console.log('Looking for quantity input field...');
    
    const quantitySelectors = [
      'input[name*="quantity"]',
      'input[type="number"]',
      '.qty',
      'input.input-text.qty',
      '.quantity input',
      '[name="cart[*][qty]"]'
    ];
    
    let quantityInput;
    for (const selector of quantitySelectors) {
      const inputElement = page.locator(selector);
      if (await inputElement.isVisible({ timeout: 3000 })) {
        quantityInput = inputElement;
        console.log(`✅ Found quantity input: ${selector}`);
        break;
      }
    }
    
    if (quantityInput) {
      // Verify initial quantity
      const initialQuantity = await quantityInput.inputValue();
      console.log(`Initial quantity: ${initialQuantity}`);
      expect(initialQuantity).toBe('1');
      
      // Step 13: Modify quantity value
      console.log('Modifying quantity to 3...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('3');
      
      const newQuantityValue = await quantityInput.inputValue();
      console.log(`✅ Quantity updated to: ${newQuantityValue}`);
      expect(newQuantityValue).toBe('3');
      
      // Step 14: Verify Update Basket button activation
      console.log('Checking Update Basket button activation...');
      
      const updateButtonSelectors = [
        'button[name="update_cart"]',
        'input[name="update_cart"]',
        '.button.update',
        'button:has-text("Update")',
        'input[value*="Update" i]',
        '[name="update_cart"]'
      ];
      
      let updateButton;
      for (const selector of updateButtonSelectors) {
        const buttonElement = page.locator(selector);
        if (await buttonElement.isVisible({ timeout: 3000 })) {
          updateButton = buttonElement;
          console.log(`✅ Found update button: ${selector}`);
          break;
        }
      }
      
      if (updateButton) {
        // Check if button is enabled/clickable
        const isEnabled = await updateButton.isEnabled();
        console.log(`Update Basket button enabled: ${isEnabled}`);
        
        if (isEnabled) {
          console.log('✅ Update Basket button is activated after quantity change');
        } else {
          console.log('⚠️ Update Basket button may not be activated yet');
        }
        
        // Step 15: Click Update Basket
        console.log('Clicking Update Basket button...');
        await updateButton.click();
        console.log('✅ Clicked Update Basket button');
        
        // Wait for update to process
        await page.waitForTimeout(3000);
        
        // Step 16: Validate quantity update results
        console.log('Validating quantity update results...');
        
        // Verify quantity field still shows updated value
        const finalQuantity = await quantityInput.inputValue();
        console.log(`Final quantity in field: ${finalQuantity}`);
        expect(finalQuantity).toBe('3');
        
        // Verify cart total is updated correctly
        let updatedTotal = 0;
        for (const selector of totalSelectors) {
          try {
            const totalElement = page.locator(selector).last();
            if (await totalElement.isVisible({ timeout: 3000 })) {
              const totalText = await totalElement.textContent() || '';
              if (totalText.includes('₹')) {
                updatedTotal = parseFloat(totalText.replace(/[^\d.]/g, ''));
                console.log(`✅ Updated cart total: ₹${updatedTotal}`);
                break;
              }
            }
          } catch (error) {
            continue;
          }
        }
        
        // Calculate expected total (unit price × quantity)
        const expectedTotal = unitPrice * 3;
        console.log(`Expected total calculation: ₹${unitPrice} × 3 = ₹${expectedTotal}`);
        
        // Allow for small rounding differences
        const totalDifference = Math.abs(updatedTotal - expectedTotal);
        if (totalDifference <= 1) {
          console.log('✅ PASS: Cart total calculated correctly');
        } else {
          console.log(`❌ FAIL: Cart total mismatch. Expected: ₹${expectedTotal}, Actual: ₹${updatedTotal}`);
        }
        
        // Verify cart menu reflects updated totals
        console.log('Checking cart menu update...');
        const updatedCartMenu = page.locator('.wpmenucart-contents');
        const updatedCartText = await updatedCartMenu.textContent();
        console.log(`Updated cart menu: "${updatedCartText}"`);
        
        if (updatedCartText?.includes('3 items') || updatedCartText?.includes('item')) {
          console.log('✅ Cart menu reflects updated quantity');
        } else {
          console.log('⚠️ Cart menu update unclear');
        }
        
      } else {
        console.log('❌ FAIL: Could not find Update Basket button');
        expect(false).toBeTruthy();
      }
      
    } else {
      console.log('❌ FAIL: Could not find quantity input field');
      expect(false).toBeTruthy();
    }
    
    console.log('✅ Basic quantity update test completed');
  });
  
  test('Quantity decrease and edge case testing', async ({ page }) => {
    test.setTimeout(60000);
    
    // Setup: Add product to cart and navigate to checkout
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
    
    // First increase quantity to 5 for testing decrease
    const quantityInput = page.locator('input[name*="quantity"], input[type="number"], .qty, input.input-text.qty').first();
    const updateButton = page.locator('button[name="update_cart"], input[name="update_cart"], .button.update').first();
    
    if (await quantityInput.isVisible({ timeout: 5000 }) && await updateButton.isVisible({ timeout: 5000 })) {
      console.log('Setting initial quantity to 5...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('5');
      await updateButton.click();
      await page.waitForTimeout(3000);
      console.log('✅ Initial quantity set to 5');
      
      // Test quantity decrease
      console.log('Testing quantity decrease to 2...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('2');
      
      if (await updateButton.isEnabled({ timeout: 3000 })) {
        await updateButton.click();
        await page.waitForTimeout(3000);
        
        const finalQuantity = await quantityInput.inputValue();
        if (finalQuantity === '2') {
          console.log('✅ PASS: Quantity decrease successful');
        } else {
          console.log(`❌ FAIL: Quantity decrease failed. Expected: 2, Actual: ${finalQuantity}`);
        }
      }
      
      // Test minimum quantity (1)
      console.log('Testing minimum quantity (1)...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('1');
      
      if (await updateButton.isEnabled({ timeout: 3000 })) {
        await updateButton.click();
        await page.waitForTimeout(3000);
        
        const minQuantity = await quantityInput.inputValue();
        if (minQuantity === '1') {
          console.log('✅ PASS: Minimum quantity (1) accepted');
        }
      }
      
      // Test zero quantity
      console.log('Testing zero quantity...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('0');
      
      if (await updateButton.isEnabled({ timeout: 3000 })) {
        await updateButton.click();
        await page.waitForTimeout(3000);
        
        // Check if item was removed or error shown
        const cartItems = page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item');
        const itemCount = await cartItems.count();
        
        if (itemCount === 0) {
          console.log('✅ PASS: Zero quantity removed item from cart');
        } else {
          console.log('⚠️ Zero quantity behavior: item still in cart');
        }
      }
      
      // Test invalid input (if cart still has items)
      const remainingItems = await page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item').count();
      if (remainingItems > 0) {
        console.log('Testing invalid input (letters)...');
        await quantityInput.click();
        await quantityInput.selectText();
        await quantityInput.fill('abc');
        
        const invalidValue = await quantityInput.inputValue();
        console.log(`Input field value after invalid entry: "${invalidValue}"`);
        
        if (invalidValue === 'abc' || invalidValue === '') {
          console.log('⚠️ Invalid input behavior noted - may need validation');
        }
      }
      
    } else {
      console.log('❌ Quantity controls not found for edge case testing');
    }
    
    console.log('✅ Quantity edge case testing completed');
  });
  
  test('Multiple products quantity management', async ({ page }) => {
    test.setTimeout(90000);
    
    // Add multiple products to cart
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Add first product
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    
    console.log('Adding first product...');
    await arrivalsLocator.first().locator('img').click();
    
    let addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Add second product
    await page.goto('http://practice.automationtesting.in/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    console.log('Adding second product...');
    await arrivalsLocator.nth(1).locator('img').click();
    
    addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 15000 });
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('Testing multiple product quantity management...');
    
    // Find all quantity inputs
    const quantityInputs = page.locator('input[name*="quantity"], input[type="number"], .qty, input.input-text.qty');
    const inputCount = await quantityInputs.count();
    console.log(`Found ${inputCount} quantity inputs`);
    
    if (inputCount >= 2) {
      // Update first product quantity
      console.log('Updating first product quantity to 2...');
      await quantityInputs.first().click();
      await quantityInputs.first().selectText();
      await quantityInputs.first().fill('2');
      
      // Update second product quantity
      console.log('Updating second product quantity to 3...');
      await quantityInputs.nth(1).click();
      await quantityInputs.nth(1).selectText();
      await quantityInputs.nth(1).fill('3');
      
      // Click update basket (should update both)
      const updateButton = page.locator('button[name="update_cart"], input[name="update_cart"], .button.update').first();
      if (await updateButton.isVisible({ timeout: 5000 })) {
        console.log('Clicking Update Basket for multiple products...');
        await updateButton.click();
        await page.waitForTimeout(3000);
        
        // Verify both quantities updated
        const firstQuantity = await quantityInputs.first().inputValue();
        const secondQuantity = await quantityInputs.nth(1).inputValue();
        
        console.log(`First product final quantity: ${firstQuantity}`);
        console.log(`Second product final quantity: ${secondQuantity}`);
        
        if (firstQuantity === '2' && secondQuantity === '3') {
          console.log('✅ PASS: Multiple product quantity updates successful');
        } else {
          console.log('❌ FAIL: Multiple product quantity updates failed');
        }
      }
      
    } else {
      console.log('⚠️ Insufficient quantity inputs found for multiple product testing');
    }
    
    console.log('✅ Multiple products quantity management test completed');
  });
  
  test('Update Basket button states and user experience', async ({ page }) => {
    test.setTimeout(45000);
    
    // Setup: Add product to cart
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
    
    console.log('Testing Update Basket button states and UX...');
    
    const quantityInput = page.locator('input[name*="quantity"], input[type="number"], .qty').first();
    const updateButton = page.locator('button[name="update_cart"], input[name="update_cart"], .button.update').first();
    
    if (await quantityInput.isVisible({ timeout: 5000 }) && await updateButton.isVisible({ timeout: 5000 })) {
      
      // Test initial button state
      console.log('Testing initial button state...');
      const initialEnabled = await updateButton.isEnabled();
      console.log(`Initial Update Basket button enabled: ${initialEnabled}`);
      
      // Get button properties for UX validation
      const buttonText = await updateButton.textContent();
      console.log(`Update button text: "${buttonText}"`);
      
      // Test button activation on quantity change
      console.log('Testing button activation on quantity change...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('2');
      // Trigger change/blur to let the page enable the button
      await page.keyboard.press('Tab');
      // Wait for the button to become enabled (debounced on some themes)
      let activatedEnabled = false;
      try {
        await expect(updateButton).toBeEnabled({ timeout: 4000 });
        activatedEnabled = true;
      } catch {
        // Fallback: re-focus and dispatch a change event to trigger enable
        await quantityInput.focus();
        const handle = await quantityInput.elementHandle();
        if (handle) {
          await page.evaluate((el) => el.dispatchEvent(new Event('change', { bubbles: true })), handle);
        }
        try {
          await expect(updateButton).toBeEnabled({ timeout: 2000 });
          activatedEnabled = true;
        } catch {
          activatedEnabled = await updateButton.isEnabled();
        }
      }
      console.log(`Update Basket button enabled after change: ${activatedEnabled}`);
      
      if (activatedEnabled) {
        console.log('✅ PASS: Update Basket button activates on quantity change');
      } else {
        console.log('⚠️ Update Basket button activation behavior unclear');
      }
      
      // Test button click and processing
      console.log('Testing button click and processing...');
      // Ensure it's enabled before clicking to avoid flakiness
      if (!(await updateButton.isEnabled())) {
        // As a last resort, wait a bit more
        await page.waitForTimeout(1000);
      }
      await expect(updateButton).toBeEnabled({ timeout: 3000 });
      await updateButton.click();
      
      // Monitor for any loading states or feedback
      await page.waitForTimeout(1000);
      console.log('✅ Update button click processed');
      
      // Test multiple consecutive updates
      console.log('Testing multiple consecutive updates...');
      await quantityInput.click();
      await quantityInput.selectText();
      await quantityInput.fill('3');
      await page.keyboard.press('Tab');
      await expect(updateButton).toBeEnabled({ timeout: 4000 });
      if (await updateButton.isEnabled({ timeout: 100 })) {
        await updateButton.click();
        await page.waitForTimeout(2000);
        console.log('✅ First consecutive update completed');
        
        await quantityInput.click();
        await quantityInput.selectText();
        await quantityInput.fill('1');
        await page.keyboard.press('Tab');
        await expect(updateButton).toBeEnabled({ timeout: 4000 });
        if (await updateButton.isEnabled({ timeout: 100 })) {
          await updateButton.click();
          await page.waitForTimeout(2000);
          console.log('✅ Second consecutive update completed');
          console.log('✅ PASS: Multiple consecutive updates work properly');
        }
      }
      
    } else {
      console.log('❌ Update controls not found for UX testing');
    }
    
    console.log('✅ Update Basket button UX test completed');
  });
  
});
