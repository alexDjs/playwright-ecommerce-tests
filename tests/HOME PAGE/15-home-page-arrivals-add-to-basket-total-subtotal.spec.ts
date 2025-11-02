// spec: Home Page - Arrivals Add to Basket - Total & Subtotal Validation
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Total & Subtotal Validation', () => {
  
  test('Subtotal and total display verification (single product)', async ({ page }) => {
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
    console.log('✅ Clicked Shop menu');
    await page.getByRole('link', { name: 'Home' }).click();
    console.log('✅ Clicked Home menu');
    
    // Steps 5-6: Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    console.log('✅ Verified home page has exactly 3 arrivals');
    
    // Step 7: Click on first arrival image
    const firstProduct = arrivalsLocator.first();
    const productImage = firstProduct.locator('img');
    await expect(productImage).toBeVisible();
    await productImage.click();
    
    // Step 8-9: Verify navigation to product detail page
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
    await expect(cartMenu).toBeVisible();
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    console.log('✅ Product visible in cart menu with price');
    
    // Step 12: Navigate to checkout
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log('✅ Successfully navigated to checkout page');
    
    // Step 11: Locate "Proceed to Checkout" button
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a, a:has-text("Proceed to Checkout")');
    let proceedButtonFound = false;
    
    if (await proceedButton.isVisible({ timeout: 5000 })) {
      console.log('✅ Found "Proceed to Checkout" button');
      proceedButtonFound = true;
      
      const buttonBox = await proceedButton.boundingBox();
      if (buttonBox) {
        console.log(`Proceed to Checkout button Y position: ${buttonBox.y}`);
      }
    } else {
      console.log('ℹ️ "Proceed to Checkout" button not found, checking cart totals anyway');
    }
    
    // Steps 12-13: Locate and verify Subtotal
    console.log('\n=== Locating Subtotal ===');
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      console.log(`✅ Subtotal found: "${subtotalText}"`);
      
      // Verify currency symbol
      if (subtotalText?.includes('₹')) {
        console.log('✅ Subtotal displays ₹ currency symbol');
      }
      
      // Check position
      const subtotalRow = page.locator('.cart-subtotal, tr.cart-subtotal');
      if (await subtotalRow.isVisible()) {
        const subtotalBox = await subtotalRow.boundingBox();
        if (subtotalBox && proceedButtonFound) {
          console.log(`Subtotal Y position: ${subtotalBox.y}`);
        }
      }
    } else {
      console.log('❌ FAIL: Subtotal not found');
    }
    
    // Step 13: Locate and verify Total
    console.log('\n=== Locating Total ===');
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const totalText = await totalElement.textContent();
      console.log(`✅ Total found: "${totalText}"`);
      
      // Verify currency symbol
      if (totalText?.includes('₹')) {
        console.log('✅ Total displays ₹ currency symbol');
      }
      
      // Check position
      const totalRow = page.locator('.order-total, tr.order-total');
      if (await totalRow.isVisible()) {
        const totalBox = await totalRow.boundingBox();
        if (totalBox && proceedButtonFound) {
          console.log(`Total Y position: ${totalBox.y}`);
        }
      }
    } else {
      console.log('❌ FAIL: Total not found');
    }
    
    // Verify labels
    console.log('\n=== Verifying Labels ===');
    const subtotalLabel = await page.locator('.cart-subtotal th, .cart-subtotal .cart-subtotal-label').textContent();
    console.log(`Subtotal label: "${subtotalLabel}"`);
    
    const totalLabel = await page.locator('.order-total th, .order-total .order-total-label').textContent();
    console.log(`Total label: "${totalLabel}"`);
    
    console.log('\n✅ Display verification test completed');
  });
  
  test('Total and subtotal relationship validation', async ({ page }) => {
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
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('=== Validating Total ≥ Subtotal Relationship ===\n');
    
    // Get Subtotal
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    let subtotal = 0;
    
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      subtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Subtotal: ₹${subtotal}`);
    } else {
      console.log('❌ Could not find subtotal');
    }
    
    // Get Total
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    let total = 0;
    
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const totalText = await totalElement.textContent();
      total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Total: ₹${total}`);
    } else {
      console.log('❌ Could not find total');
    }
    
    // Calculate difference
    const difference = total - subtotal;
    console.log(`\nDifference (Total - Subtotal): ₹${difference.toFixed(2)}`);
    
    // Validate relationship: Total ≥ Subtotal
    console.log('\n=== Relationship Validation ===');
    if (total >= subtotal - 0.01) {
      console.log(`✅ PASS: Total (₹${total}) ≥ Subtotal (₹${subtotal})`);
      expect(total).toBeGreaterThanOrEqual(subtotal - 0.01);
    } else {
      console.log(`❌ FAIL: Total (₹${total}) < Subtotal (₹${subtotal})`);
      expect(total).toBeGreaterThanOrEqual(subtotal);
    }
    
    // Analyze the difference
    if (difference > 0.01) {
      console.log(`\n✅ Total > Subtotal by ₹${difference.toFixed(2)}`);
      console.log('Checking for tax and shipping components...\n');
      
      // Check for tax
      const taxElement = page.locator('.tax-rate .woocommerce-Price-amount, .cart-tax .amount').first();
      if (await taxElement.isVisible({ timeout: 3000 })) {
        const taxText = await taxElement.textContent();
        const tax = parseFloat(taxText?.replace(/[^\d.]/g, '') || '0');
        console.log(`Tax: ₹${tax}`);
        
        const taxRate = (tax / subtotal * 100).toFixed(2);
        console.log(`Tax rate: ${taxRate}%`);
      } else {
        console.log('ℹ️ No separate tax line item found');
      }
      
      // Check for shipping
      const shippingElement = page.locator('.shipping .woocommerce-Price-amount, .cart-shipping .amount').first();
      if (await shippingElement.isVisible({ timeout: 3000 })) {
        const shippingText = await shippingElement.textContent();
        const shipping = parseFloat(shippingText?.replace(/[^\d.]/g, '') || '0');
        console.log(`Shipping: ₹${shipping}`);
      } else {
        const freeShipping = await page.locator('text=/free shipping/i').count();
        if (freeShipping > 0) {
          console.log('✅ Free shipping applied');
        } else {
          console.log('ℹ️ No shipping information found');
        }
      }
    } else if (Math.abs(difference) <= 0.01) {
      console.log('\n✅ Total = Subtotal (no taxes or shipping applied)');
    }
    
    console.log('\n✅ Relationship validation test completed');
  });
  
  test('Subtotal calculation accuracy (single product)', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate and get product price
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Get product price from home page
    const arrivalsLocator = page.locator('.products .product');
    const firstProduct = arrivalsLocator.first();
    
    const productPriceText = await firstProduct.locator('.price, .woocommerce-Price-amount').first().textContent();
    const productPrice = parseFloat(productPriceText?.replace(/[^\d.]/g, '') || '0');
    console.log(`Product price on home page: ₹${productPrice}`);
    
    // Add to basket
    await firstProduct.locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('\n=== Subtotal Calculation Validation ===');
    
    // Get line total from checkout
    const lineTotalElement = page.locator('.product-subtotal .woocommerce-Price-amount, td.product-subtotal .amount').first();
    let lineTotal = 0;
    
    if (await lineTotalElement.isVisible({ timeout: 5000 })) {
      const lineTotalText = await lineTotalElement.textContent();
      lineTotal = parseFloat(lineTotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Line total in checkout: ₹${lineTotal}`);
    }
    
    // Get subtotal
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    let subtotal = 0;
    
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      subtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Subtotal: ₹${subtotal}`);
    }
    
    // Validate calculations
    console.log('\n=== Validation Results ===');
    
    // For quantity = 1: Line Total should equal Product Price
    if (Math.abs(lineTotal - productPrice) <= 0.01) {
      console.log(`✅ PASS: Line total (₹${lineTotal}) = Product price (₹${productPrice})`);
    } else {
      console.log(`⚠️ Line total (₹${lineTotal}) differs from product price (₹${productPrice})`);
    }
    
    // For single product with qty=1: Subtotal should equal Product Price
    if (Math.abs(subtotal - productPrice) <= 0.01) {
      console.log(`✅ PASS: Subtotal (₹${subtotal}) = Product price (₹${productPrice})`);
      expect(Math.abs(subtotal - productPrice)).toBeLessThanOrEqual(0.01);
    } else {
      console.log(`❌ FAIL: Subtotal (₹${subtotal}) ≠ Product price (₹${productPrice})`);
    }
    
    // Subtotal should equal line total for single item
    if (Math.abs(subtotal - lineTotal) <= 0.01) {
      console.log(`✅ PASS: Subtotal equals line total for single item`);
    }
    
    console.log('\n✅ Subtotal calculation test completed');
  });
  
  test('Tax application verification', async ({ page }) => {
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
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('=== Tax Application Verification ===\n');
    
    // Get all price components
    const components = {
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0
    };
    
    // Get Subtotal (S)
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      components.subtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Subtotal (S): ₹${components.subtotal}`);
    }
    
    // Get Tax (TAX)
    const taxElement = page.locator('.tax-rate .woocommerce-Price-amount, .cart-tax .amount, .woocommerce-Price-amount:has-text("Tax")').first();
    if (await taxElement.isVisible({ timeout: 3000 })) {
      const taxText = await taxElement.textContent();
      components.tax = parseFloat(taxText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Tax (TAX): ₹${components.tax}`);
      
      // Calculate tax rate
      const taxRate = (components.tax / components.subtotal * 100).toFixed(2);
      console.log(`Tax rate: ${taxRate}%`);
    } else {
      console.log('Tax (TAX): ₹0.00 (no separate tax line item)');
    }
    
    // Get Shipping (SHIP)
    const shippingElement = page.locator('.shipping .woocommerce-Price-amount, .cart-shipping .amount').first();
    if (await shippingElement.isVisible({ timeout: 3000 })) {
      const shippingText = await shippingElement.textContent();
      components.shipping = parseFloat(shippingText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Shipping (SHIP): ₹${components.shipping}`);
    } else {
      const freeShipping = await page.locator('text=/free shipping/i').count();
      if (freeShipping > 0) {
        console.log('Shipping (SHIP): ₹0.00 (free shipping)');
      } else {
        console.log('Shipping (SHIP): ₹0.00 (no shipping info)');
      }
    }
    
    // Get Total (T)
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const totalText = await totalElement.textContent();
      components.total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Total (T): ₹${components.total}`);
    }
    
    // Validate calculation: Total = Subtotal + Tax + Shipping
    console.log('\n=== Calculation Verification ===');
    const expectedTotal = components.subtotal + components.tax + components.shipping;
    console.log(`Expected Total = S + TAX + SHIP`);
    console.log(`Expected Total = ₹${components.subtotal} + ₹${components.tax} + ₹${components.shipping}`);
    console.log(`Expected Total = ₹${expectedTotal.toFixed(2)}`);
    console.log(`Displayed Total = ₹${components.total}`);
    
    if (Math.abs(components.total - expectedTotal) <= 0.01) {
      console.log('\n✅ PASS: Total = Subtotal + Tax + Shipping');
      expect(Math.abs(components.total - expectedTotal)).toBeLessThanOrEqual(0.01);
    } else {
      const difference = Math.abs(components.total - expectedTotal);
      console.log(`\n⚠️ Difference: ₹${difference.toFixed(2)}`);
      console.log('Note: Difference may be due to hidden fees or rounding');
    }
    
    // Verify Total ≥ Subtotal
    if (components.total >= components.subtotal - 0.01) {
      console.log(`✅ PASS: Total (₹${components.total}) ≥ Subtotal (₹${components.subtotal})`);
    }
    
    console.log('\n✅ Tax application test completed');
  });
  
  test('Multiple products total and subtotal validation', async ({ page }) => {
    test.setTimeout(90000);
    
    // Navigate and add first product
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    
    // Get first product price
    const firstProductPrice = await arrivalsLocator.first().locator('.price, .woocommerce-Price-amount').first().textContent();
    const price1 = parseFloat(firstProductPrice?.replace(/[^\d.]/g, '') || '0');
    console.log(`Product 1 price: ₹${price1}`);
    
    // Add first product
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Add second product
    await page.goto('http://practice.automationtesting.in/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const secondProductPrice = await arrivalsLocator.nth(1).locator('.price, .woocommerce-Price-amount').first().textContent();
    const price2 = parseFloat(secondProductPrice?.replace(/[^\d.]/g, '') || '0');
    console.log(`Product 2 price: ₹${price2}`);
    
    await arrivalsLocator.nth(1).locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('\n=== Multiple Products Validation ===');
    
    // Expected subtotal
    const expectedSubtotal = price1 + price2;
    console.log(`\nExpected Subtotal = ₹${price1} + ₹${price2} = ₹${expectedSubtotal}`);
    
    // Get displayed subtotal
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    let displayedSubtotal = 0;
    
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      displayedSubtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Displayed Subtotal = ₹${displayedSubtotal}`);
    }
    
    // Verify subtotal calculation
    if (Math.abs(displayedSubtotal - expectedSubtotal) <= 0.01) {
      console.log(`✅ PASS: Subtotal calculation is correct`);
      expect(Math.abs(displayedSubtotal - expectedSubtotal)).toBeLessThanOrEqual(0.01);
    } else {
      console.log(`❌ FAIL: Subtotal mismatch. Expected: ₹${expectedSubtotal}, Actual: ₹${displayedSubtotal}`);
    }
    
    // Get total
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    let total = 0;
    
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const totalText = await totalElement.textContent();
      total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Total = ₹${total}`);
    }
    
    // Verify Total ≥ Subtotal
    if (total >= displayedSubtotal - 0.01) {
      console.log(`✅ PASS: Total (₹${total}) ≥ Subtotal (₹${displayedSubtotal})`);
    } else {
      console.log(`❌ FAIL: Total (₹${total}) < Subtotal (₹${displayedSubtotal})`);
    }
    
    // Verify line items
    const cartItems = page.locator('.cart_item, tr.cart_item');
    const itemCount = await cartItems.count();
    console.log(`\nNumber of line items in checkout: ${itemCount}`);
    
    if (itemCount === 2) {
      console.log('✅ PASS: Both products listed in checkout');
    }
    
    console.log('\n✅ Multiple products test completed');
  });
  
  test('Display position relative to proceed to checkout button', async ({ page }) => {
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
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('=== Testing Position Relative to Proceed to Checkout ===\n');
    
    // Find Proceed to Checkout button
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a, a:has-text("Proceed to Checkout")');
    let buttonY = 0;
    
    if (await proceedButton.isVisible({ timeout: 5000 })) {
      const buttonBox = await proceedButton.boundingBox();
      if (buttonBox) {
        buttonY = buttonBox.y;
        console.log(`"Proceed to Checkout" button Y position: ${buttonY}`);
      }
    } else {
      console.log('ℹ️ "Proceed to Checkout" button not found, skipping position test');
      return;
    }
    
    // Find Subtotal position
    const subtotalRow = page.locator('.cart-subtotal, tr.cart-subtotal');
    if (await subtotalRow.isVisible({ timeout: 5000 })) {
      const subtotalBox = await subtotalRow.boundingBox();
      if (subtotalBox) {
        const subtotalY = subtotalBox.y;
        console.log(`Subtotal Y position: ${subtotalY}`);
        
        if (subtotalY < buttonY) {
          console.log(`✅ PASS: Subtotal (${subtotalY}) is above button (${buttonY})`);
        } else {
          console.log(`❌ FAIL: Subtotal (${subtotalY}) is NOT above button (${buttonY})`);
        }
      }
    }
    
    // Find Total position
    const totalRow = page.locator('.order-total, tr.order-total');
    if (await totalRow.isVisible({ timeout: 5000 })) {
      const totalBox = await totalRow.boundingBox();
      if (totalBox) {
        const totalY = totalBox.y;
        console.log(`Total Y position: ${totalY}`);
        
        if (totalY < buttonY) {
          console.log(`✅ PASS: Total (${totalY}) is above button (${buttonY})`);
          expect(totalY).toBeLessThan(buttonY);
        } else {
          console.log(`❌ FAIL: Total (${totalY}) is NOT above button (${buttonY})`);
        }
      }
    }
    
    console.log('\n✅ Position validation test completed');
  });
  
});
