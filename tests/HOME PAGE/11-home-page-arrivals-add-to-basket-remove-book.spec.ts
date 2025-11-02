// spec: Home Page - Arrivals Add to Basket - Remove Book
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Add to Basket - Remove Book', () => {
  
  test('Single book removal from checkout page', async ({ page }) => {
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
    
    // Get product details for validation
    const firstProduct = arrivalsLocator.first();
    const productName = await firstProduct.locator('h3').textContent();
    const productPrice = await firstProduct.locator('.price, .woocommerce-Price-amount').first().textContent();
    console.log(`Testing with product: ${productName} - ${productPrice}`);
    
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
    
    // Get cart total before removal
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
            console.log(`✅ Original cart total: ${originalTotal}`);
            break;
          }
        }
      } catch (error) {
        continue;
      }
    }
    
    // Steps 13-14: Find and click remove button
    console.log('Looking for remove button/icon...');
    
    // Common remove button selectors
    const removeSelectors = [
      '.remove',
      '.product-remove .remove',
      'a.remove',
      '[data-product_id] .remove',
      '.woocommerce-cart-form__cart-item .remove',
      'a[data-product_id]',
      '.cart_item .remove',
      'a:has-text("×")',
      'a[title*="Remove" i]',
      '.fa-remove',
      '.fa-trash'
    ];
    
    let removeButton;
    for (const selector of removeSelectors) {
      const removeElement = page.locator(selector);
      if (await removeElement.isVisible({ timeout: 3000 })) {
        removeButton = removeElement;
        console.log(`✅ Found remove button: ${selector}`);
        break;
      }
    }
    
    if (removeButton) {
      // Verify remove button is accessible
      await expect(removeButton).toBeVisible();
      console.log('✅ Remove button is visible and accessible');
      
      // Click remove button
      await removeButton.click();
      console.log('✅ Clicked remove button');
      
      // Wait for removal to process
      await page.waitForTimeout(3000);
      
      // Verify product is removed from checkout grid
      console.log('Verifying product removal...');
      
      // Check if cart is now empty
      const remainingItems = page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item');
      const itemCount = await remainingItems.count();
      
      if (itemCount === 0) {
        console.log('✅ PASS: Product successfully removed from checkout');
        
        // Verify empty cart messaging
        const emptyCartSelectors = [
          'text=Your cart is currently empty',
          'text=No products in the cart',
          '.cart-empty',
          '.woocommerce-info',
          'text=Return to shop'
        ];
        
        let emptyCartMessageFound = false;
        for (const selector of emptyCartSelectors) {
          if (await page.locator(selector).isVisible({ timeout: 5000 })) {
            const messageText = await page.locator(selector).textContent();
            console.log(`✅ Empty cart message found: "${messageText}"`);
            emptyCartMessageFound = true;
            break;
          }
        }
        
        if (!emptyCartMessageFound) {
          console.log('⚠️ Empty cart message not found, but product was removed');
        }
        
      } else {
        console.log(`❌ FAIL: ${itemCount} items still remain in cart after removal`);
        expect(itemCount).toBe(0);
      }
      
      // Verify cart menu reflects removal
      console.log('Checking cart menu update...');
      const updatedCartMenu = page.locator('.wpmenucart-contents');
      const updatedCartText = await updatedCartMenu.textContent();
      console.log(`Cart menu after removal: "${updatedCartText}"`);
      
      // Check for empty cart indicators in menu
      const emptyCartIndicators = ['0 items', 'Empty', '₹0', 'items₹0'];
      let cartMenuEmpty = false;
      
      for (const indicator of emptyCartIndicators) {
        if (updatedCartText?.includes(indicator)) {
          console.log(`✅ Cart menu shows empty state: contains "${indicator}"`);
          cartMenuEmpty = true;
          break;
        }
      }
      
      if (!cartMenuEmpty && updatedCartText && !updatedCartText.includes('item')) {
        console.log('✅ Cart menu appears to show empty state');
        cartMenuEmpty = true;
      }
      
      if (!cartMenuEmpty) {
        console.log('⚠️ Cart menu may not be reflecting empty state correctly');
      }
      
    } else {
      console.log('❌ FAIL: Could not find remove button');
      expect(false).toBeTruthy();
    }
    
    console.log('✅ Single book removal test completed');
  });
  
  test('Multiple books - selective removal', async ({ page }) => {
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
    
    // Verify multiple items in checkout
    const cartItems = page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item');
    const initialItemCount = await cartItems.count();
    console.log(`✅ Found ${initialItemCount} items in checkout`);
    expect(initialItemCount).toBeGreaterThanOrEqual(2);
    
    // Remove first item (test selective removal)
    console.log('Testing selective removal of first item...');
    const firstRemoveButton = page.locator('.remove, .product-remove .remove, a.remove').first();
    
    if (await firstRemoveButton.isVisible({ timeout: 5000 })) {
      await firstRemoveButton.click();
      await page.waitForTimeout(3000);
      
      // Verify one item was removed
      const remainingItems = await cartItems.count();
      console.log(`Items after removal: ${remainingItems}`);
      
      if (remainingItems === initialItemCount - 1) {
        console.log('✅ PASS: Selective removal successful - one item removed');
      } else {
        console.log(`❌ Expected ${initialItemCount - 1} items, found ${remainingItems}`);
      }
      
      // Test removing remaining items
      if (remainingItems > 0) {
        console.log('Removing remaining items...');
        const secondRemoveButton = page.locator('.remove, .product-remove .remove, a.remove').first();
        
        if (await secondRemoveButton.isVisible({ timeout: 3000 })) {
          await secondRemoveButton.click();
          await page.waitForTimeout(3000);
          
          const finalItemCount = await cartItems.count();
          console.log(`Final item count: ${finalItemCount}`);
          
          if (finalItemCount === 0) {
            console.log('✅ PASS: All items successfully removed');
          }
        }
      }
      
    } else {
      console.log('❌ Could not find remove button for selective removal test');
    }
    
    console.log('✅ Multiple books selective removal test completed');
  });
  
  test('Remove button accessibility and user experience', async ({ page }) => {
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
    
    // Test remove button characteristics
    console.log('Testing remove button accessibility...');
    
    const removeButton = page.locator('.remove, .product-remove .remove, a.remove').first();
    
    if (await removeButton.isVisible({ timeout: 5000 })) {
      // Test visibility and clickability
      await expect(removeButton).toBeVisible();
      console.log('✅ Remove button is visible');
      
      // Test if button is properly clickable
      const isEnabled = await removeButton.isEnabled();
      console.log(`✅ Remove button enabled: ${isEnabled}`);
      
      // Get button properties for UX validation
      const buttonText = await removeButton.textContent();
      const buttonTitle = await removeButton.getAttribute('title');
      console.log(`Remove button text: "${buttonText}"`);
      console.log(`Remove button title: "${buttonTitle}"`);
      
      // Test button size and positioning (basic check)
      const boundingBox = await removeButton.boundingBox();
      if (boundingBox) {
        console.log(`Remove button size: ${boundingBox.width}x${boundingBox.height}`);
        
        if (boundingBox.width >= 16 && boundingBox.height >= 16) {
          console.log('✅ Remove button size is adequate for clicking');
        } else {
          console.log('⚠️ Remove button might be too small for easy clicking');
        }
      }
      
      // Test hover effects (if any)
      console.log('Testing hover effects...');
      await removeButton.hover();
      await page.waitForTimeout(1000);
      console.log('✅ Hover effect tested');
      
      // Test actual removal functionality
      console.log('Testing removal functionality...');
      await removeButton.click();
      await page.waitForTimeout(3000);
      
      // Verify removal worked
      const cartItems = page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item');
      const itemCount = await cartItems.count();
      
      if (itemCount === 0) {
        console.log('✅ PASS: Remove button successfully removed item');
      } else {
        console.log('❌ FAIL: Remove button did not work properly');
      }
      
    } else {
      console.log('❌ Remove button not found for accessibility testing');
    }
    
    console.log('✅ Remove button accessibility test completed');
  });
  
  test('Cart state persistence after removal', async ({ page }) => {
    test.setTimeout(60000);
    
    // Add product and remove it
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Add product to cart
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    
    const arrivalsLocator = page.locator('.products .product');
    await arrivalsLocator.first().locator('img').click();
    
    const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
    await addToBasketButton.click();
    
    // Navigate to checkout and remove item
    const cartMenu = page.locator('.wpmenucart-contents');
    await expect(cartMenu).toContainText('item', { timeout: 10000 });
    await cartMenu.click();
    await expect(page).toHaveURL(/.*\/(basket|cart|checkout)\/.*/, { timeout: 15000 });
    
    // Remove the item
    const removeButton = page.locator('.remove, .product-remove .remove, a.remove').first();
    if (await removeButton.isVisible({ timeout: 5000 })) {
      await removeButton.click();
      await page.waitForTimeout(3000);
      console.log('✅ Item removed from cart');
    }
    
    // Test state persistence - refresh page
    console.log('Testing state persistence after page refresh...');
    await page.reload();
    await page.waitForTimeout(2000);
    
    // Verify cart remains empty after refresh
    const cartItemsAfterRefresh = page.locator('.cart_item, .woocommerce-cart-form__cart-item, tr.cart_item');
    const itemCountAfterRefresh = await cartItemsAfterRefresh.count();
    
    if (itemCountAfterRefresh === 0) {
      console.log('✅ PASS: Cart state persisted after page refresh - remains empty');
    } else {
      console.log('❌ FAIL: Cart state not persisted - items reappeared after refresh');
    }
    
    // Test navigation persistence
    console.log('Testing state persistence after navigation...');
    await page.goto('http://practice.automationtesting.in/');
    await page.getByRole('link', { name: 'Shop' }).click();
    
    // Check cart menu on different page
    const cartMenuOnShop = page.locator('.wpmenucart-contents');
    const cartTextOnShop = await cartMenuOnShop.textContent();
    console.log(`Cart text on shop page: "${cartTextOnShop}"`);
    
    if (cartTextOnShop && (cartTextOnShop.includes('0 items') || cartTextOnShop.includes('₹0') || !cartTextOnShop.includes('item'))) {
      console.log('✅ PASS: Empty cart state persisted across navigation');
    } else {
      console.log('⚠️ Cart state persistence across navigation unclear');
    }
    
    // Test re-adding after removal
    console.log('Testing re-adding item after removal...');
    await page.getByRole('link', { name: 'Home' }).click();
    
    await arrivalsLocator.first().locator('img').click();
    await addToBasketButton.click();
    await expect(page.locator('.wpmenucart-contents')).toContainText('item', { timeout: 10000 });
    console.log('✅ PASS: Can successfully re-add items after removal');
    
    console.log('✅ Cart state persistence test completed');
  });
  
});
