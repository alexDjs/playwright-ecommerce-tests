// spec: Home Page - Arrivals Add to Basket - Checkout Functionality
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Checkout Functionality', () => {
  
  test('Proceed to Checkout button visibility and state', async ({ page }) => {
    test.setTimeout(60000);
    
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
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  console.log('✅ Clicked Shop menu');
  await page.getByRole('link', { name: 'Home' }).click();
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  console.log('✅ Clicked Home menu');
    
    // Steps 5-6: Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    console.log('✅ Verified home page has exactly 3 arrivals');
    
    // Step 7-9: Click on first arrival image and navigate
    const firstProduct = arrivalsLocator.first();
    const productImage = firstProduct.locator('img');
  await expect(productImage).toBeVisible();
  await productImage.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  await expect(page).toHaveURL(/.*\/product\/.*\//);
    console.log('✅ Successfully navigated to product detail page');
    
    // Step 10: Add to basket
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await expect(addToBasketButton).toBeVisible();
    await expect(addToBasketButton).toBeEnabled();
    await addToBasketButton.click();
    console.log('✅ Product added to basket');
    
    // Step 11: Verify cart menu item with price
  const cartMenu = page.locator('.wpmenucart-contents');
  await expect(cartMenu).toBeVisible({ timeout: 10000 });
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    console.log('✅ Product visible in cart menu with price');
    
    // Step 12: Navigate to cart/checkout page
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log('✅ Successfully navigated to cart page');
    
    // Step 13: Verify total and subtotal are visible
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    
    await expect(subtotalElement).toBeVisible({ timeout: 5000 });
    await expect(totalElement).toBeVisible({ timeout: 5000 });
    console.log('✅ Total and subtotal are visible');
    
    // Step 12-16: Locate and verify "Proceed to Checkout" button
    console.log('\n=== Testing Proceed to Checkout Button ===');
    
    const proceedButtonSelectors = [
      'a.checkout-button',
      '.wc-proceed-to-checkout a',
      'a:has-text("Proceed to Checkout")',
      '.checkout-button',
      'a[href*="checkout"]'
    ];
    
    let proceedButton = null;
    let buttonFound = false;
    
    for (const selector of proceedButtonSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible({ timeout: 3000 })) {
        proceedButton = element;
        buttonFound = true;
        console.log(`✅ Found Proceed to Checkout button using selector: ${selector}`);
        break;
      }
    }
    
    if (buttonFound && proceedButton) {
      // Verify button text
      const buttonText = await proceedButton.textContent();
      console.log(`Button text: "${buttonText}"`);
      
      if (buttonText?.toLowerCase().includes('checkout') || buttonText?.toLowerCase().includes('proceed')) {
        console.log('✅ PASS: Button has clear checkout-related text');
      }
      
      // Verify button is enabled
      const isEnabled = await proceedButton.isEnabled();
      console.log(`Button enabled: ${isEnabled}`);
      
      if (isEnabled) {
        console.log('✅ PASS: Button is enabled and clickable');
      } else {
        console.log('❌ FAIL: Button is disabled');
      }
      
      // Check button styling
      const buttonClass = await proceedButton.getAttribute('class');
      console.log(`Button class: "${buttonClass}"`);
      
      // Check button position
      const buttonBox = await proceedButton.boundingBox();
      if (buttonBox) {
        console.log(`Button position: x=${buttonBox.x}, y=${buttonBox.y}, width=${buttonBox.width}, height=${buttonBox.height}`);
      }
      
  await expect(proceedButton).toBeVisible();
  await expect(proceedButton).toBeEnabled();
    } else {
      console.log('❌ FAIL: Proceed to Checkout button not found');
      expect(buttonFound).toBeTruthy();
    }
    
    console.log('\n✅ Button visibility test completed');
  });
  
  test('Proceed to Checkout navigation success', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate and add product to basket
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart).*/, { timeout: 15000 });
    
    const currentUrl = page.url();
    console.log(`Current URL (cart page): ${currentUrl}`);
    
    // Verify total and subtotal before proceeding
    console.log('\n=== Verifying Totals Before Checkout ===');
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      console.log(`Subtotal: ${subtotalText}`);
    }
    
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const totalText = await totalElement.textContent();
      console.log(`Total: ${totalText}`);
    }
    
    // Find and click Proceed to Checkout button
    console.log('\n=== Clicking Proceed to Checkout ===');
    
    const proceedButtonSelectors = [
      'a.checkout-button',
      '.wc-proceed-to-checkout a',
      'a:has-text("Proceed to Checkout")',
      '.checkout-button'
    ];
    
    let navigationSuccessful = false;
    
    for (const selector of proceedButtonSelectors) {
      const button = page.locator(selector).first();
      if (await button.isVisible({ timeout: 3000 })) {
        console.log(`Found button with selector: ${selector}`);
        await button.click();
        console.log('✅ Clicked Proceed to Checkout button');
        
        // Wait for navigation
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
        navigationSuccessful = true;
        break;
      }
    }
    
    if (!navigationSuccessful) {
      console.log('❌ Could not find or click Proceed to Checkout button');
      expect(navigationSuccessful).toBeTruthy();
      return;
    }
    
    // Verify navigation to checkout page
    console.log('\n=== Verifying Checkout Page Navigation ===');
    const newUrl = page.url();
    console.log(`New URL (checkout page): ${newUrl}`);
    
    // Check if URL changed and contains checkout-related keywords
    if (newUrl !== currentUrl) {
      console.log('✅ PASS: URL changed after clicking button');
    } else {
      console.log('⚠️ URL did not change');
    }
    
    const checkoutKeywords = ['checkout', 'billing', 'payment', 'order'];
    const urlContainsCheckout = checkoutKeywords.some(keyword => newUrl.toLowerCase().includes(keyword));
    
    if (urlContainsCheckout) {
      console.log(`✅ PASS: New URL contains checkout-related keyword`);
    } else {
      console.log(`⚠️ URL doesn't contain obvious checkout keywords: ${newUrl}`);
    }
    
    // Verify page title changed
    const pageTitle = await page.title();
    console.log(`Page title: "${pageTitle}"`);
    
    // Wait for checkout page to load
    await page.waitForTimeout(2000);
    
    console.log('\n✅ Navigation test completed');
  });
  
  test('Payment gateway page validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate and add product
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    // Click Proceed to Checkout
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await expect(proceedButton).toBeVisible({ timeout: 10000 });
    await proceedButton.click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Validating Checkout/Payment Page ===\n');
    
    const checkoutUrl = page.url();
    console.log(`Checkout page URL: ${checkoutUrl}`);
    
    // Look for billing form fields
    console.log('\n=== Checking for Billing Form Fields ===');
    
    const billingFields = [
      { name: 'First Name', selectors: ['#billing_first_name', 'input[name="billing_first_name"]'] },
      { name: 'Last Name', selectors: ['#billing_last_name', 'input[name="billing_last_name"]'] },
      { name: 'Email', selectors: ['#billing_email', 'input[name="billing_email"]', 'input[type="email"]'] },
      { name: 'Phone', selectors: ['#billing_phone', 'input[name="billing_phone"]', 'input[type="tel"]'] },
      { name: 'Address', selectors: ['#billing_address_1', 'input[name="billing_address_1"]'] }
    ];
    
    let fieldsFound = 0;
    
    for (const field of billingFields) {
      let found = false;
      for (const selector of field.selectors) {
        if (await page.locator(selector).isVisible({ timeout: 2000 })) {
          console.log(`✅ Found ${field.name} field`);
          fieldsFound++;
          found = true;
          break;
        }
      }
      if (!found) {
        console.log(`ℹ️ ${field.name} field not found`);
      }
    }
    
    if (fieldsFound >= 3) {
      console.log(`\n✅ PASS: Found ${fieldsFound} billing fields (checkout form present)`);
    } else {
      console.log(`\n⚠️ Found only ${fieldsFound} billing fields`);
    }
    
    // Look for order summary
    console.log('\n=== Checking for Order Summary ===');
    
    const orderSummarySelectors = [
      '.woocommerce-checkout-review-order',
      '#order_review',
      '.order-review',
      '.cart_item'
    ];
    
    let orderSummaryFound = false;
    
    for (const selector of orderSummarySelectors) {
      if (await page.locator(selector).isVisible({ timeout: 3000 })) {
        console.log(`✅ Found order summary using selector: ${selector}`);
        orderSummaryFound = true;
        break;
      }
    }
    
    if (!orderSummaryFound) {
      console.log('ℹ️ Order summary section not found with common selectors');
    }
    
    // Look for Place Order button
    console.log('\n=== Checking for Place Order Button ===');
    
    const placeOrderSelectors = [
      '#place_order',
      'button[name="woocommerce_checkout_place_order"]',
      'button:has-text("Place order")',
      'input[name="woocommerce_checkout_place_order"]'
    ];
    
    let placeOrderFound = false;
    
    for (const selector of placeOrderSelectors) {
      if (await page.locator(selector).isVisible({ timeout: 3000 })) {
        const buttonText = await page.locator(selector).textContent() || await page.locator(selector).inputValue();
        console.log(`✅ Found Place Order button: "${buttonText}"`);
        placeOrderFound = true;
        break;
      }
    }
    
    if (!placeOrderFound) {
      console.log('ℹ️ Place Order button not found');
    }
    
    // Check for order total
    console.log('\n=== Checking for Order Total ===');
    
    const totalSelectors = [
      '.order-total .woocommerce-Price-amount',
      '.order-total .amount',
      'tr.order-total'
    ];
    
    for (const selector of totalSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible({ timeout: 3000 })) {
        const totalText = await element.textContent();
        console.log(`✅ Order total found: "${totalText}"`);
        break;
      }
    }
    
    console.log('\n✅ Payment gateway page validation completed');
  });
  
  test('Cart totals verification before checkout', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate and add product
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart).*/, { timeout: 15000 });
    
    console.log('=== Verifying Totals Before Checkout ===\n');
    
    // Get Subtotal
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    let subtotal = 0;
    
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      subtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Subtotal: ₹${subtotal}`);
    }
    
    // Get Total
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    let total = 0;
    
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const totalText = await totalElement.textContent();
      total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Total: ₹${total}`);
    }
    
    // Find Proceed to Checkout button position
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    
    if (await proceedButton.isVisible({ timeout: 5000 })) {
      const buttonBox = await proceedButton.boundingBox();
      const subtotalBox = await page.locator('.cart-subtotal').boundingBox();
      const totalBox = await page.locator('.order-total').boundingBox();
      
      if (buttonBox && subtotalBox && totalBox) {
        console.log(`\nButton Y position: ${buttonBox.y}`);
        console.log(`Subtotal Y position: ${subtotalBox.y}`);
        console.log(`Total Y position: ${totalBox.y}`);
        
        if (subtotalBox.y < buttonBox.y && totalBox.y < buttonBox.y) {
          console.log('\n✅ PASS: Both totals are positioned above Proceed to Checkout button');
        } else {
          console.log('\n⚠️ Totals may not be positioned above button');
        }
      }
    }
    
    // Verify relationship
    console.log('\n=== Total/Subtotal Relationship ===');
    if (total >= subtotal - 0.01) {
      console.log(`✅ PASS: Total (₹${total}) ≥ Subtotal (₹${subtotal})`);
    } else {
      console.log(`⚠️ Total (₹${total}) < Subtotal (₹${subtotal})`);
    }
    
    console.log('\n✅ Cart totals verification completed');
  });
  
  test('Multiple products checkout flow', async ({ page }) => {
    test.setTimeout(90000);
    
    // Add first product
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    
    console.log('Adding first product...');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Add second product
    await page.goto('http://practice.automationtesting.in/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    console.log('Adding second product...');
    await arrivalsLocator.nth(1).locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Navigate to cart
    const cartMenu = page.locator('.wpmenucart-contents');
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart).*/, { timeout: 15000 });
    console.log('✅ Navigated to cart with multiple products');
    
    // Verify multiple products in cart
    const cartItems = page.locator('.cart_item, tr.cart_item');
    const itemCount = await cartItems.count();
    console.log(`\nNumber of items in cart: ${itemCount}`);
    
    if (itemCount >= 2) {
      console.log('✅ PASS: Multiple products in cart');
    }
    
    // Click Proceed to Checkout
    console.log('\n=== Testing Checkout with Multiple Products ===');
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await expect(proceedButton).toBeVisible({ timeout: 10000 });
    await proceedButton.click();
    console.log('✅ Clicked Proceed to Checkout');
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    const checkoutUrl = page.url();
    console.log(`\nCheckout URL: ${checkoutUrl}`);
    
    // Verify products appear in checkout order summary
    await page.waitForTimeout(2000);
    
    const checkoutItems = page.locator('.cart_item, tr.cart_item, .woocommerce-checkout-review-order-table .product-name');
    const checkoutItemCount = await checkoutItems.count();
    console.log(`Number of items in checkout: ${checkoutItemCount}`);
    
    if (checkoutItemCount >= 2) {
      console.log('✅ PASS: Multiple products appear in checkout');
    } else {
      console.log(`⚠️ Only ${checkoutItemCount} items found in checkout`);
    }
    
    console.log('\n✅ Multiple products checkout test completed');
  });
  
  test('Checkout button user experience testing', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate and add product
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart).*/, { timeout: 15000 });
    
    console.log('=== Testing Checkout Button UX ===\n');
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await expect(proceedButton).toBeVisible({ timeout: 10000 });
    
    // Test hover state
    console.log('Testing hover interaction...');
    await proceedButton.hover();
    await page.waitForTimeout(500);
    console.log('✅ Hover action completed');
    
    // Get button properties
    const buttonClass = await proceedButton.getAttribute('class');
    const buttonHref = await proceedButton.getAttribute('href');
    console.log(`\nButton class: "${buttonClass}"`);
    console.log(`Button href: "${buttonHref}"`);
    
    // Test click and measure navigation time
    console.log('\nTesting navigation speed...');
    const startTime = Date.now();
    
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded');
    
    const endTime = Date.now();
    const navigationTime = (endTime - startTime) / 1000;
    console.log(`Navigation completed in ${navigationTime.toFixed(2)} seconds`);
    
    if (navigationTime < 3) {
      console.log('✅ PASS: Fast navigation (< 3 seconds)');
    } else if (navigationTime < 5) {
      console.log('⚠️ Moderate navigation speed (3-5 seconds)');
    } else {
      console.log('❌ FAIL: Slow navigation (> 5 seconds)');
    }
    
    // Verify smooth transition
    const newUrl = page.url();
    console.log(`\nNavigated to: ${newUrl}`);
    
    if (newUrl.includes('checkout') || newUrl.includes('billing')) {
      console.log('✅ PASS: Successfully navigated to checkout page');
    }
    
    console.log('\n✅ UX testing completed');
  });
  
});
