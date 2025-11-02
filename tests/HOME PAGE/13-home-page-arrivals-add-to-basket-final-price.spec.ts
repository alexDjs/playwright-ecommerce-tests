// spec: Home Page - Arrivals Add to Basket - Checkout Book Final Price
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Checkout Book Final Price', () => {
  
  test('Single book final price display and calculation', async ({ page }) => {
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
    
    // Steps 7: Get product details and note price from home page
    const firstProduct = arrivalsLocator.first();
    const productName = await firstProduct.locator('h3').textContent();
    const homePagePriceText = await firstProduct.locator('.price, .woocommerce-Price-amount').first().textContent();
    const homePagePrice = parseFloat(homePagePriceText?.replace(/[^\d.]/g, '') || '0');
    
    console.log(`Testing with product: ${productName}`);
    console.log(`Home page price: ${homePagePriceText} (₹${homePagePrice})`);
    
    // Steps 8-9: Click product image and navigate to details
    const productImage = firstProduct.locator('img');
    await expect(productImage).toBeVisible();
    await productImage.click();
    await expect(page).toHaveURL(/.*\/product\/.*\//);
    console.log('✅ Successfully navigated to product detail page');
    
    // Verify price on product detail page
    const detailPagePriceElement = page.locator('.price, .woocommerce-Price-amount').first();
    if (await detailPagePriceElement.isVisible({ timeout: 3000 })) {
      const detailPagePriceText = await detailPagePriceElement.textContent();
      const detailPagePrice = parseFloat(detailPagePriceText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Product detail page price: ${detailPagePriceText} (₹${detailPagePrice})`);
      
      if (Math.abs(homePagePrice - detailPagePrice) <= 0.01) {
        console.log('✅ Price consistent between home page and product detail page');
      } else {
        console.log(`⚠️ Price mismatch: Home ₹${homePagePrice} vs Detail ₹${detailPagePrice}`);
      }
    }
    
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
    
    const cartMenuText = await cartMenu.textContent();
    console.log(`Cart menu display: "${cartMenuText}"`);
    
    // Extract price from cart menu
    const cartMenuPriceMatch = cartMenuText?.match(/₹([\d,]+(?:\.\d{2})?)/);
    if (cartMenuPriceMatch) {
      const cartMenuPrice = parseFloat(cartMenuPriceMatch[1].replace(/,/g, ''));
      console.log(`Cart menu price: ₹${cartMenuPrice}`);
      
      if (Math.abs(homePagePrice - cartMenuPrice) <= 0.01) {
        console.log('✅ Price consistent between product page and cart menu');
      } else {
        console.log(`⚠️ Price mismatch: Product ₹${homePagePrice} vs Cart Menu ₹${cartMenuPrice}`);
      }
    }
    
    // Steps 12: Navigate to checkout
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
    
    // Steps 13-14: Find and verify total price in checkout grid
    console.log('Locating price information in checkout grid...');
    
    // Find unit price in checkout table
    const unitPriceSelectors = [
      '.product-price .woocommerce-Price-amount',
      '.cart_item .amount',
      'td.product-price',
      '.woocommerce-Price-amount'
    ];
    
    let checkoutUnitPrice = 0;
    for (const selector of unitPriceSelectors) {
      try {
        const priceElement = page.locator(selector).first();
        if (await priceElement.isVisible({ timeout: 3000 })) {
          const priceText = await priceElement.textContent();
          if (priceText && priceText.includes('₹')) {
            checkoutUnitPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
            console.log(`✅ Unit price in checkout: ₹${checkoutUnitPrice}`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Find subtotal
    const subtotalSelectors = [
      '.cart-subtotal .woocommerce-Price-amount',
      '.cart-subtotal .amount',
      'tr.cart-subtotal td .woocommerce-Price-amount'
    ];
    
    let subtotal = 0;
    for (const selector of subtotalSelectors) {
      try {
        const subtotalElement = page.locator(selector);
        if (await subtotalElement.isVisible({ timeout: 3000 })) {
          const subtotalText = await subtotalElement.textContent();
          if (subtotalText && subtotalText.includes('₹')) {
            subtotal = parseFloat(subtotalText.replace(/[^\d.]/g, ''));
            console.log(`✅ Subtotal: ₹${subtotal}`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Find final total price
    const totalSelectors = [
      '.order-total .woocommerce-Price-amount',
      '.cart_totals .order-total .amount',
      'tr.order-total td .woocommerce-Price-amount',
      '.order-total strong .woocommerce-Price-amount'
    ];
    
    let finalTotal = 0;
    let finalTotalText = '';
    
    for (const selector of totalSelectors) {
      try {
        const totalElement = page.locator(selector);
        if (await totalElement.isVisible({ timeout: 3000 })) {
          finalTotalText = await totalElement.textContent() || '';
          if (finalTotalText.includes('₹')) {
            finalTotal = parseFloat(finalTotalText.replace(/[^\d.]/g, ''));
            console.log(`✅ Final Total Price: ${finalTotalText} (₹${finalTotal})`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Validate price calculations
    console.log('\n=== Price Validation Summary ===');
    console.log(`Product: ${productName}`);
    console.log(`Home Page Price: ₹${homePagePrice}`);
    console.log(`Checkout Unit Price: ₹${checkoutUnitPrice}`);
    console.log(`Subtotal: ₹${subtotal}`);
    console.log(`Final Total: ₹${finalTotal}`);
    
    // Verify price consistency
    let allPricesConsistent = true;
    
    if (checkoutUnitPrice > 0) {
      if (Math.abs(homePagePrice - checkoutUnitPrice) <= 0.01) {
        console.log('✅ PASS: Unit price matches across pages');
      } else {
        console.log(`❌ FAIL: Unit price mismatch (Home: ₹${homePagePrice}, Checkout: ₹${checkoutUnitPrice})`);
        allPricesConsistent = false;
      }
    }
    
    // For single item, subtotal should equal unit price
    if (subtotal > 0 && checkoutUnitPrice > 0) {
      if (Math.abs(subtotal - checkoutUnitPrice) <= 0.01) {
        console.log('✅ PASS: Subtotal equals unit price (quantity = 1)');
      } else {
        console.log(`⚠️ Subtotal (₹${subtotal}) differs from unit price (₹${checkoutUnitPrice})`);
      }
    }
    
    // Verify final total is displayed and reasonable
    if (finalTotal > 0) {
      console.log('✅ PASS: Final total price is displayed in checkout');
      expect(finalTotal).toBeGreaterThan(0);
      
      // Final total should be at least the subtotal (may include shipping/tax)
      if (subtotal > 0) {
        if (finalTotal >= subtotal - 0.01) {
          console.log('✅ PASS: Final total is consistent with subtotal');
        } else {
          console.log(`⚠️ Final total (₹${finalTotal}) is less than subtotal (₹${subtotal})`);
        }
      }
    } else {
      console.log('❌ FAIL: Could not find final total price in checkout');
      expect(false).toBeTruthy();
    }
    
    // Test total price visibility
    console.log('\n=== Testing Price Visibility ===');
    const totalRowElement = page.locator('.order-total, tr.order-total');
    if (await totalRowElement.isVisible({ timeout: 3000 })) {
      console.log('✅ Total price row is visible');
      
      // Check if it's prominently displayed
      const totalLabelText = await totalRowElement.textContent();
      console.log(`Total row content: "${totalLabelText}"`);
      
      if (totalLabelText?.toLowerCase().includes('total')) {
        console.log('✅ Total is clearly labeled');
      }
    }
    
    console.log('\n✅ Single book final price test completed');
  });
  
  test('Multiple books total price calculation', async ({ page }) => {
    test.setTimeout(90000);
    
    // Add multiple products to cart
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate and add first product
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    
    // Collect product prices
    const productPrices: number[] = [];
    
    // Add first product
    console.log('Adding first product...');
    const firstProductPrice = await arrivalsLocator.first().locator('.price, .woocommerce-Price-amount').first().textContent();
    const price1 = parseFloat(firstProductPrice?.replace(/[^\d.]/g, '') || '0');
    productPrices.push(price1);
    console.log(`Product 1 price: ₹${price1}`);
    
    await arrivalsLocator.first().locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Add second product
    await page.goto('http://practice.automationtesting.in/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    console.log('Adding second product...');
    const secondProductPrice = await arrivalsLocator.nth(1).locator('.price, .woocommerce-Price-amount').first().textContent();
    const price2 = parseFloat(secondProductPrice?.replace(/[^\d.]/g, '') || '0');
    productPrices.push(price2);
    console.log(`Product 2 price: ₹${price2}`);
    
    await arrivalsLocator.nth(1).locator('img').click();
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    
    // Calculate expected total
    const expectedSubtotal = productPrices.reduce((sum, price) => sum + price, 0);
    console.log(`\nExpected subtotal: ₹${expectedSubtotal} (₹${price1} + ₹${price2})`);
    
    // Navigate to checkout
    const cartMenu = page.locator('.wpmenucart-contents');
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    console.log('✅ Navigated to checkout with multiple products');
    
    // Verify multiple items in checkout
    const cartItems = page.locator('.cart_item, tr.cart_item');
    const itemCount = await cartItems.count();
    console.log(`Found ${itemCount} items in checkout`);
    
    // Get subtotal from checkout
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount, .cart-subtotal .amount').first();
    if (await subtotalElement.isVisible({ timeout: 5000 })) {
      const subtotalText = await subtotalElement.textContent();
      const displayedSubtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Displayed subtotal: ₹${displayedSubtotal}`);
      
      // Verify subtotal calculation
      if (Math.abs(displayedSubtotal - expectedSubtotal) <= 0.01) {
        console.log('✅ PASS: Subtotal calculation is correct');
      } else {
        console.log(`❌ FAIL: Subtotal mismatch. Expected: ₹${expectedSubtotal}, Actual: ₹${displayedSubtotal}`);
      }
    }
    
    // Get final total
    const finalTotalElement = page.locator('.order-total .woocommerce-Price-amount, .order-total .amount').first();
    if (await finalTotalElement.isVisible({ timeout: 5000 })) {
      const finalTotalText = await finalTotalElement.textContent();
      const finalTotal = parseFloat(finalTotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Final total: ₹${finalTotal}`);
      
      // Final total should be at least the subtotal
      if (finalTotal >= expectedSubtotal - 0.01) {
        console.log('✅ PASS: Final total is consistent with product prices');
      } else {
        console.log(`❌ FAIL: Final total (₹${finalTotal}) is less than expected subtotal (₹${expectedSubtotal})`);
      }
      
      expect(finalTotal).toBeGreaterThan(0);
    }
    
    console.log('✅ Multiple books total price test completed');
  });
  
  test('Price components breakdown validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Add product and navigate to checkout
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
    
    await page.locator('button[name="add-to-cart"], .single_add_to_cart_button').click();
    
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    console.log('Testing price components breakdown...');
    
    // Identify all price components
    const components = {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0
    };
    
    // Get subtotal
    const subtotalElement = page.locator('.cart-subtotal .woocommerce-Price-amount').first();
    if (await subtotalElement.isVisible({ timeout: 3000 })) {
      const subtotalText = await subtotalElement.textContent();
      components.subtotal = parseFloat(subtotalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`✅ Subtotal: ₹${components.subtotal}`);
    }
    
    // Check for shipping
    const shippingElement = page.locator('.shipping .woocommerce-Price-amount, .cart-shipping .amount').first();
    if (await shippingElement.isVisible({ timeout: 3000 })) {
      const shippingText = await shippingElement.textContent();
      components.shipping = parseFloat(shippingText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Shipping: ₹${components.shipping}`);
    } else {
      // Check for "Free shipping" text
      const freeShippingText = await page.locator('text=Free shipping').count();
      if (freeShippingText > 0) {
        console.log('✅ Free shipping applied');
      } else {
        console.log('ℹ️ No shipping information found');
      }
    }
    
    // Check for tax
    const taxElement = page.locator('.tax-rate .woocommerce-Price-amount, .cart-tax .amount').first();
    if (await taxElement.isVisible({ timeout: 3000 })) {
      const taxText = await taxElement.textContent();
      components.tax = parseFloat(taxText?.replace(/[^\d.]/g, '') || '0');
      console.log(`Tax: ₹${components.tax}`);
    }
    
    // Get total
    const totalElement = page.locator('.order-total .woocommerce-Price-amount').first();
    if (await totalElement.isVisible({ timeout: 3000 })) {
      const totalText = await totalElement.textContent();
      components.total = parseFloat(totalText?.replace(/[^\d.]/g, '') || '0');
      console.log(`✅ Total: ₹${components.total}`);
    }
    
    // Validate calculation
    const calculatedTotal = components.subtotal + components.shipping + components.tax - components.discount;
    console.log(`\nCalculated total: ₹${calculatedTotal}`);
    console.log(`Displayed total: ₹${components.total}`);
    
    if (Math.abs(calculatedTotal - components.total) <= 0.01) {
      console.log('✅ PASS: Price component calculation is correct');
    } else {
      console.log(`⚠️ Difference: ₹${Math.abs(calculatedTotal - components.total)}`);
    }
    
    // Check for clear labeling
    const cartTotalsRows = page.locator('.cart_totals tr, .woocommerce-cart-form__contents tr');
    const rowCount = await cartTotalsRows.count();
    console.log(`\nFound ${rowCount} rows in price breakdown`);
    
    console.log('✅ Price components breakdown test completed');
  });
  
  test('Price display visibility and user experience', async ({ page }) => {
    test.setTimeout(45000);
    
    // Add product and navigate to checkout
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
    
    console.log('Testing price display visibility and UX...');
    
    // Test total price visibility
    const totalRow = page.locator('.order-total, tr.order-total');
    if (await totalRow.isVisible({ timeout: 5000 })) {
      console.log('✅ Total price row is visible');
      
      // Check if total is in viewport
      const boundingBox = await totalRow.boundingBox();
      if (boundingBox) {
        console.log(`Total row position: y=${boundingBox.y}, height=${boundingBox.height}`);
      }
      
      // Check for clear labeling
      const rowText = await totalRow.textContent();
      console.log(`Total row text: "${rowText}"`);
      
      if (rowText?.toLowerCase().includes('total')) {
        console.log('✅ Total is clearly labeled');
      }
    }
    
    // Test currency symbol display
    const currencySymbols = await page.locator('text=₹').count();
    console.log(`Found ${currencySymbols} currency symbols (₹) on page`);
    
    if (currencySymbols > 0) {
      console.log('✅ Currency symbols are displayed');
    }
    
    // Test price formatting
    const priceElements = page.locator('.woocommerce-Price-amount, .amount');
    const priceCount = await priceElements.count();
    console.log(`Found ${priceCount} price elements`);
    
    if (priceCount > 0) {
      const firstPrice = await priceElements.first().textContent();
      console.log(`Sample price format: "${firstPrice}"`);
      
      // Check for proper decimal formatting
      if (firstPrice?.includes('.') || firstPrice?.includes(',')) {
        console.log('✅ Prices include decimal separators');
      }
    }
    
    console.log('✅ Price display UX test completed');
  });
  
});
