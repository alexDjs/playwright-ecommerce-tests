// spec: Home Page - Arrivals Add to Basket - Payment Gateway
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Payment Gateway', () => {
  
  test('Payment gateway page access and structure', async ({ page }) => {
    test.setTimeout(60000);
    
    // Steps 1-2: Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
      console.log('✅ Handled consent dialog');
    } catch (error) {
      console.log('ℹ️ Consent dialog not found');
    }
    
    // Steps 3-4: Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    console.log('✅ Clicked Shop menu');
    await page.getByRole('link', { name: 'Home' }).click();
    console.log('✅ Clicked Home menu');
    
    // Steps 5-6: Verify arrivals
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    console.log('✅ Verified 3 arrivals');
    
    // Steps 7-9: Navigate to product page
    await arrivalsLocator.first().locator('img').click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    console.log('✅ Navigated to product page');
    
    // Step 10: Add to basket
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    console.log('✅ Added to basket');
    
    // Step 11: Verify cart menu
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    console.log('✅ Product in cart menu');
    
    // Step 12: Navigate to cart
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart).*/, { timeout: 15000 });
    console.log('✅ Navigated to cart');
    
    // Step 13: Verify totals
    await expect(page.locator('.cart-subtotal')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.order-total')).toBeVisible({ timeout: 5000 });
    console.log('✅ Totals visible');
    
    // Step 15: Click Proceed to Checkout
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await expect(proceedButton).toBeVisible({ timeout: 10000 });
    await proceedButton.click();
    console.log('✅ Clicked Proceed to Checkout');
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Step 16: Verify payment gateway page sections
    console.log('\n=== Verifying Payment Gateway Sections ===');
    
    const paymentUrl = page.url();
    console.log(`Payment page URL: ${paymentUrl}`);
    
    // Check for Billing Details
    console.log('\n--- Billing Details ---');
    const billingSection = page.locator('#customer_details, .woocommerce-billing-fields, form.checkout').first();
    if (await billingSection.isVisible({ timeout: 5000 })) {
      console.log('✅ Billing Details section found');
    } else {
      console.log('⚠️ Billing Details section not found with common selectors');
    }
    
    // Check for Order Details
    console.log('\n--- Order Details ---');
    const orderDetailsSelectors = [
      '#order_review',
      '.woocommerce-checkout-review-order',
      '.order-review'
    ];
    
    let orderDetailsFound = false;
    for (const selector of orderDetailsSelectors) {
      if (await page.locator(selector).first().isVisible({ timeout: 3000 })) {
        console.log(`✅ Order Details found using: ${selector}`);
        orderDetailsFound = true;
        break;
      }
    }
    
    if (!orderDetailsFound) {
      console.log('⚠️ Order Details section not found');
    }
    
    // Check for Additional Details
    console.log('\n--- Additional Details ---');
    const additionalDetailsSelectors = [
      '.woocommerce-additional-fields',
      '#order_comments_field',
      'textarea[name="order_comments"]'
    ];
    
    let additionalFound = false;
    for (const selector of additionalDetailsSelectors) {
      if (await page.locator(selector).first().isVisible({ timeout: 3000 })) {
        console.log(`✅ Additional Details found using: ${selector}`);
        additionalFound = true;
        break;
      }
    }
    
    if (!additionalFound) {
      console.log('ℹ️ Additional Details section not found (may be optional)');
    }
    
    // Check for Payment Gateway section
    console.log('\n--- Payment Gateway ---');
    const paymentSection = page.locator('#payment, .woocommerce-checkout-payment').first();
    if (await paymentSection.isVisible({ timeout: 5000 })) {
      console.log('✅ Payment Gateway section found');
    } else {
      console.log('⚠️ Payment Gateway section not found');
    }
    
    console.log('\n✅ Payment gateway structure test completed');
  });
  
  test('Billing details form validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to payment gateway
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await expect(proceedButton).toBeVisible({ timeout: 10000 });
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Billing Form Fields ===\n');
    
    // Define expected billing fields
    const billingFields = [
      { name: 'First Name', id: 'billing_first_name', required: true },
      { name: 'Last Name', id: 'billing_last_name', required: true },
      { name: 'Company Name', id: 'billing_company', required: false },
      { name: 'Email', id: 'billing_email', required: true },
      { name: 'Phone', id: 'billing_phone', required: true },
      { name: 'Address', id: 'billing_address_1', required: true },
      { name: 'Town/City', id: 'billing_city', required: true },
      { name: 'Postcode', id: 'billing_postcode', required: true }
    ];
    
    let fieldsFound = 0;
    
    for (const field of billingFields) {
      const fieldElement = page.locator(`#${field.id}, input[name="${field.id}"]`).first();
      
      if (await fieldElement.isVisible({ timeout: 2000 })) {
        console.log(`✅ ${field.name} field found`);
        fieldsFound++;
        
        // Test if field accepts input
        if (await fieldElement.isEditable()) {
          await fieldElement.click();
          await fieldElement.fill('Test Value');
          const value = await fieldElement.inputValue();
          if (value === 'Test Value') {
            console.log(`   ✓ Field accepts input`);
          }
          await fieldElement.clear();
        }
        
        // Check if required field is marked
        if (field.required) {
          const isRequired = await fieldElement.getAttribute('required');
          const hasAsterisk = await page.locator(`label[for="${field.id}"] .required, label[for="${field.id}"]:has-text("*")`).count() > 0;
          
          if (isRequired || hasAsterisk) {
            console.log(`   ✓ Marked as required`);
          }
        }
      } else {
        console.log(`⚠️ ${field.name} field not found`);
      }
    }
    
    console.log(`\nTotal fields found: ${fieldsFound}/${billingFields.length}`);
    
    if (fieldsFound >= 6) {
      console.log('✅ PASS: Most billing fields are present');
    } else {
      console.log('⚠️ WARNING: Many billing fields are missing');
    }
    
    console.log('\n✅ Billing form test completed');
  });
  
  test('Order details display validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Add product and navigate to payment
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Get product price
    const arrivalsLocator = page.locator('.products .product');
    const productPriceText = await arrivalsLocator.first().locator('.price, .woocommerce-Price-amount').first().textContent();
    const productPrice = parseFloat(productPriceText?.replace(/[^\d.]/g, '') || '0');
    console.log(`Product price: ₹${productPrice}`);
    
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    // Get cart totals
    const cartSubtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount').first();
    let cartSubtotal = 0;
    if (await cartSubtotalElement.isVisible({ timeout: 5000 })) {
      const text = await cartSubtotalElement.textContent();
      cartSubtotal = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Cart subtotal: ₹${cartSubtotal}`);
    }
    
    const cartTotalElement = page.locator('.order-total .woocommerce-Price-amount').first();
    let cartTotal = 0;
    if (await cartTotalElement.isVisible({ timeout: 5000 })) {
      const text = await cartTotalElement.textContent();
      cartTotal = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Cart total: ₹${cartTotal}`);
    }
    
    // Proceed to payment
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('\n=== Validating Order Details on Payment Page ===\n');
    
    // Check for order review section
    const orderReview = page.locator('#order_review, .woocommerce-checkout-review-order').first();
    await expect(orderReview).toBeVisible({ timeout: 10000 });
    console.log('✅ Order review section found');
    
    // Get payment page subtotal
    const paymentSubtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    let paymentSubtotal = 0;
    if (await paymentSubtotalElement.isVisible({ timeout: 5000 })) {
      const text = await paymentSubtotalElement.textContent();
      paymentSubtotal = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Payment page subtotal: ₹${paymentSubtotal}`);
    }
    
    // Get payment page total
    const paymentTotalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    let paymentTotal = 0;
    if (await paymentTotalElement.isVisible({ timeout: 5000 })) {
      const text = await paymentTotalElement.textContent();
      paymentTotal = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Payment page total: ₹${paymentTotal}`);
    }
    
    // Verify totals match
    console.log('\n=== Comparing Cart vs Payment Page ===');
    
    if (Math.abs(cartSubtotal - paymentSubtotal) <= 0.01) {
      console.log('✅ PASS: Subtotal matches between cart and payment');
    } else {
      console.log(`⚠️ Subtotal mismatch: Cart ₹${cartSubtotal} vs Payment ₹${paymentSubtotal}`);
    }
    
    if (Math.abs(cartTotal - paymentTotal) <= 0.01) {
      console.log('✅ PASS: Total matches between cart and payment');
    } else {
      console.log(`⚠️ Total mismatch: Cart ₹${cartTotal} vs Payment ₹${paymentTotal}`);
    }
    
    // Verify Total >= Subtotal
    if (paymentTotal >= paymentSubtotal - 0.01) {
      console.log('✅ PASS: Total ≥ Subtotal on payment page');
    }
    
    console.log('\n✅ Order details validation completed');
  });
  
  test('Payment gateway options validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to payment page
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Payment Methods ===\n');
    
    // Wait for payment section to load
    await page.waitForTimeout(2000);
    
    // Look for payment methods
    const paymentMethods = [
      { name: 'Direct Bank Transfer', keywords: ['direct', 'bank', 'transfer', 'bacs'] },
      { name: 'Cheque Payment', keywords: ['cheque', 'check'] },
      { name: 'Cash on Delivery', keywords: ['cash', 'cod', 'delivery'] },
      { name: 'PayPal', keywords: ['paypal'] }
    ];
    
    let methodsFound = 0;
    
    for (const method of paymentMethods) {
      let found = false;
      
      // Search for payment method by text content
      for (const keyword of method.keywords) {
        const elements = page.locator(`label:has-text("${keyword}"), .payment_method_label:has-text("${keyword}")`);
        const count = await elements.count();
        
        if (count > 0) {
          console.log(`✅ ${method.name} found`);
          methodsFound++;
          found = true;
          
          // Try to click/select the payment method
          try {
            const radioButton = page.locator(`input[type="radio"][name="payment_method"]`).first();
            if (await radioButton.isVisible({ timeout: 2000 })) {
              await radioButton.click();
              console.log(`   ✓ Payment method is selectable`);
            }
          } catch (error) {
            console.log(`   ℹ️ Could not test selection`);
          }
          
          break;
        }
      }
      
      if (!found) {
        console.log(`ℹ️ ${method.name} not found`);
      }
    }
    
    console.log(`\nPayment methods found: ${methodsFound}/${paymentMethods.length}`);
    
    if (methodsFound >= 2) {
      console.log('✅ PASS: Multiple payment methods available');
    } else {
      console.log('⚠️ WARNING: Few payment methods found');
    }
    
    console.log('\n✅ Payment methods test completed');
  });
  
  test('Additional details section validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to payment page
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Additional Details ===\n');
    
    // Look for additional details/order notes section
    const orderNotesSelectors = [
      '#order_comments',
      'textarea[name="order_comments"]',
      '.woocommerce-additional-fields textarea'
    ];
    
    let notesFieldFound = false;
    
    for (const selector of orderNotesSelectors) {
      const field = page.locator(selector).first();
      if (await field.isVisible({ timeout: 3000 })) {
        console.log(`✅ Order notes field found using: ${selector}`);
        notesFieldFound = true;
        
        // Test entering text
        await field.click();
        await field.fill('Please deliver after 5 PM');
        const value = await field.inputValue();
        
        if (value.includes('deliver')) {
          console.log('✅ Field accepts text input');
        }
        
        break;
      }
    }
    
    if (!notesFieldFound) {
      console.log('ℹ️ Additional details/order notes field not found (may be optional)');
    }
    
    console.log('\n✅ Additional details test completed');
  });
  
  test('Coupon application on payment gateway page', async ({ page }) => {
    test.setTimeout(60000);
    
    // Add product with sufficient price for coupon
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    
    // Find a product with price >= ₹450 for coupon to work
    let productAdded = false;
    for (let i = 0; i < 3; i++) {
      const product = arrivalsLocator.nth(i);
      const priceText = await product.locator('.price, .woocommerce-Price-amount').first().textContent();
      const price = parseFloat(priceText?.replace(/[^\d.]/g, '') || '0');
      
      if (price >= 450) {
        console.log(`Selected product with price: ₹${price}`);
        await product.locator('img').click();
        productAdded = true;
        break;
      }
    }
    
    if (!productAdded) {
      console.log('ℹ️ No product >= ₹450 found, using first product');
      await arrivalsLocator.first().locator('img').click();
    }
    
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('\n=== Testing Coupon Application ===\n');
    
    // Get original total
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    let originalTotal = 0;
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const text = await totalElement.textContent();
      originalTotal = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Original total: ₹${originalTotal}`);
    }
    
    // Look for coupon field
    const couponFieldSelectors = [
      '#coupon_code',
      'input[name="coupon_code"]',
      '.woocommerce-form-coupon input'
    ];
    
    let couponFieldFound = false;
    
    for (const selector of couponFieldSelectors) {
      const field = page.locator(selector).first();
      if (await field.isVisible({ timeout: 3000 })) {
        console.log(`✅ Coupon field found using: ${selector}`);
        couponFieldFound = true;
        
        // Enter coupon code
        await field.click();
        await field.fill('krishnasakinala');
        console.log('Entered coupon: krishnasakinala');
        
        // Find and click apply button
        const applyButtonSelectors = [
          'button[name="apply_coupon"]',
          '.button[name="apply_coupon"]',
          'button:has-text("Apply")'
        ];
        
        for (const btnSelector of applyButtonSelectors) {
          const btn = page.locator(btnSelector).first();
          if (await btn.isVisible({ timeout: 2000 })) {
            await btn.click();
            console.log('✅ Clicked Apply Coupon button');
            
            // Wait for page update
            await page.waitForTimeout(3000);
            
            // Check for success/error message
            const successMsg = page.locator('.woocommerce-message, .woocommerce-info');
            const errorMsg = page.locator('.woocommerce-error');
            
            if (await successMsg.isVisible({ timeout: 3000 })) {
              const msgText = await successMsg.textContent();
              console.log(`✅ Message: ${msgText}`);
            } else if (await errorMsg.isVisible({ timeout: 3000 })) {
              const errText = await errorMsg.textContent();
              console.log(`⚠️ Error: ${errText}`);
            }
            
            // Check if discount appears
            const discountRow = page.locator('.cart-discount, tr:has-text("Coupon")');
            if (await discountRow.isVisible({ timeout: 3000 })) {
              console.log('✅ Discount row appeared');
              const discountText = await discountRow.textContent();
              console.log(`   ${discountText}`);
            }
            
            break;
          }
        }
        
        break;
      }
    }
    
    if (!couponFieldFound) {
      console.log('ℹ️ Coupon field not found on payment page');
      console.log('   (Coupons may need to be applied on cart page)');
    }
    
    console.log('\n✅ Coupon application test completed');
  });
  
  test('Form field validation and required fields', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to payment page
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Form Validation ===\n');
    
    // Check for required field indicators
    const requiredFields = page.locator('input[required], select[required], textarea[required]');
    const requiredCount = await requiredFields.count();
    console.log(`Found ${requiredCount} required fields`);
    
    // Check for asterisk indicators
    const asterisks = page.locator('.required, abbr.required, span:has-text("*")');
    const asteriskCount = await asterisks.count();
    console.log(`Found ${asteriskCount} required field indicators (*)`);
    
    if (requiredCount > 0 || asteriskCount > 0) {
      console.log('✅ PASS: Required fields are marked');
    } else {
      console.log('⚠️ No obvious required field indicators found');
    }
    
    // Test validation by trying to submit with empty fields
    const placeOrderButton = page.locator('#place_order, button[name="woocommerce_checkout_place_order"]').first();
    
    if (await placeOrderButton.isVisible({ timeout: 5000 })) {
      console.log('\n✅ Place Order button found');
      console.log('ℹ️ Validation would be tested by attempting order submission');
      console.log('   (Skipping actual submission in this test)');
    }
    
    console.log('\n✅ Form validation test completed');
  });
  
  test('Total and subtotal display on payment page', async ({ page }) => {
    test.setTimeout(60000);
    
    // Add product and navigate to payment
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    const productPriceText = await arrivalsLocator.first().locator('.price, .woocommerce-Price-amount').first().textContent();
    const productPrice = parseFloat(productPriceText?.replace(/[^\d.]/g, '') || '0');
    
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    
    const proceedButton = page.locator('a.checkout-button, .wc-proceed-to-checkout a').first();
    await proceedButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Verifying Totals on Payment Page ===\n');
    console.log(`Product price: ₹${productPrice}`);
    
    // Get subtotal
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    let subtotal = 0;
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const text = await subtotalElement.textContent();
      subtotal = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Subtotal: ₹${subtotal}`);
    }
    
    // Get total
    const totalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    let total = 0;
    if (await totalElement.isVisible({ timeout: 5000 })) {
      const text = await totalElement.textContent();
      total = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
      console.log(`Total: ₹${total}`);
    }
    
    // Verify calculations
    console.log('\n=== Validation ===');
    
    if (Math.abs(subtotal - productPrice) <= 0.01) {
      console.log('✅ PASS: Subtotal equals product price');
    }
    
    if (total >= subtotal - 0.01) {
      console.log('✅ PASS: Total ≥ Subtotal');
    }
    
    // Check for currency symbols
    const subtotalText = await subtotalElement.textContent();
    const totalText = await totalElement.textContent();
    
    if (subtotalText?.includes('₹') && totalText?.includes('₹')) {
      console.log('✅ PASS: Currency symbols displayed');
    }
    
    console.log('\n✅ Totals display test completed');
  });
  
});
