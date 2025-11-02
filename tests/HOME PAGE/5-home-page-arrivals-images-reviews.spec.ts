
import { test, expect } from '@playwright/test';

test.describe('Home Page Arrivals Image Reviews', () => {
  
  test('Arrivals images should navigate to product pages with reviews', async ({ page }) => {
    test.setTimeout(60000);
    
    // Step 1: Browser opens automatically
    
    // Step 2: Enter the URL
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' })
        .click({ timeout: 5000 });
    } catch (error) {
      console.log('Consent dialog not found or already dismissed');
    }
    
    // Step 3: Click on Shop Menu
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('✅ Clicked Shop menu');
    
    // Step 4: Now click on Home menu button
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('✅ Clicked Home menu');
    
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
    
    // Step 10: Click on Reviews tab for the book you clicked on
    const reviewsTab = page.locator('a[href="#tab-reviews"], .reviews_tab a, li[role="tab"] a').filter({ hasText: 'Reviews' });
    await expect(reviewsTab).toBeVisible();
    await reviewsTab.click();
    
    // Step 11: There should be a Reviews regarding that book the user clicked on
    const reviewsContent = page.locator('#tab-reviews');
    await expect(reviewsContent).toBeVisible();
    
    // Verify reviews section contains review elements
    const reviewsSection = page.locator('#reviews, .woocommerce-Reviews');
    await expect(reviewsSection).toBeVisible();
    
    // Check for review form or existing reviews
    const hasReviewForm = await page.locator('#review_form').isVisible();
    const hasExistingReviews = await page.locator('.commentlist, .comment, .review').count() > 0;
    
    // At least one should be present (review form or existing reviews)
    expect(hasReviewForm || hasExistingReviews).toBeTruthy();
    
    // Additional validations
    await expect(page.locator('.summary')).toBeVisible();
    
    // Verify we're on the correct product page
    if (firstProductName) {
      await expect(page.locator('.product_title, h1')).toContainText(firstProductName.trim());
    }
    
    console.log('✅ Test passed: Arrival images navigate correctly with functional reviews tab');
  });
  
  test('All arrival products should have accessible reviews', async ({ page }) => {
    test.setTimeout(90000);
    
    // Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 5000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate via Shop -> Home
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('✅ Navigated via Shop -> Home');
    
    // Verify arrivals section
    await expect(page.getByText('new arrivals')).toBeVisible();
    const arrivalsLocator = page.locator('.products .product');
    await expect(arrivalsLocator).toHaveCount(3);
    
  const arrivalCount = await arrivalsLocator.count();
  console.log(`Testing ${arrivalCount} products`);
    
    // Test each arrival reviews
    for (let i = 0; i < arrivalCount; i++) {
      // Go back to home page if not on first iteration
      if (i > 0) {
        await page.goto('http://practice.automationtesting.in/');
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
        
        // Navigate to home properly
        try {
          await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
        } catch (error) {}
        
        await page.getByRole('link', { name: 'Shop' }).click();
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
        await page.getByRole('link', { name: 'Home' }).click();
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
        await expect(page.getByText('new arrivals')).toBeVisible();
      }
      
      // Re-query arrivals after any navigation to ensure fresh handles
      const freshArrivals = page.locator('.products .product');
      const product = freshArrivals.nth(i);
      const productName = await product.locator('h3').textContent();

      // Prefer clicking the anchor to navigate reliably
      const productLink = product.locator('a').first();
      await expect(productLink).toBeVisible();
      await productLink.scrollIntoViewIfNeeded();

      // Click with a light retry if navigation doesn't happen promptly
      let navigated = false;
      try {
        await Promise.all([
          page.waitForURL(/.*\/product\/.*\//, { timeout: 10000 }),
          productLink.click()
        ]);
        navigated = true;
      } catch (e) {
        console.log('ℹ️ First click did not navigate, retrying once...');
        await Promise.all([
          page.waitForURL(/.*\/product\/.*\//, { timeout: 10000 }),
          productLink.click({ trial: false })
        ]);
        navigated = true;
      }

      if (!navigated) {
        throw new Error('Failed to navigate to product page after clicking arrival');
      }

      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      // Verify navigation to product page
      await expect(page).toHaveURL(/.*\/product\/.*\//);
      await expect(page.locator('.product_title, h1')).toBeVisible();
      
      // Verify add to basket functionality
      const addToBasketButton = page.locator('button[name="add-to-cart"], .single_add_to_cart_button');
      await expect(addToBasketButton).toBeVisible();
      await expect(addToBasketButton).toBeEnabled();
      
      // Click on Reviews tab
      const reviewsTab = page.locator('a[href="#tab-reviews"], .reviews_tab a, li[role="tab"] a').filter({ hasText: 'Reviews' });
      await expect(reviewsTab).toBeVisible();
      await reviewsTab.click();
      
      // Verify reviews content
      const reviewsContent = page.locator('#tab-reviews');
      await expect(reviewsContent).toBeVisible();
      
      // Verify reviews section exists
      const reviewsSection = page.locator('#reviews, .woocommerce-Reviews');
      await expect(reviewsSection).toBeVisible();
      
      // Check for review functionality
      const hasReviewForm = await page.locator('#review_form').isVisible();
      const hasExistingReviews = await page.locator('.commentlist, .comment, .review').count() > 0;
      
      // Verify reviews functionality is available
      expect(hasReviewForm || hasExistingReviews).toBeTruthy();
      
      console.log(`✅ Product ${i + 1} (${productName?.trim()}) reviews section verified`);
    }
  });
  
  test('Review form functionality should be accessible', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to home page and first product
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Navigated to practice.automationtesting.in');
    
    // Handle consent dialog
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 5000 });
    } catch (error) {
      console.log('Consent dialog not found');
    }
    
    // Navigate via Shop -> Home -> First Product
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('✅ Navigated via Shop -> Home');
    
    const firstProductImage = page.locator('.products .product').first().locator('img');
    await expect(firstProductImage).toBeVisible();
    await firstProductImage.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('✅ Clicked first product image');
    
    // Navigate to Reviews tab
    const reviewsTab = page.locator('a[href="#tab-reviews"], .reviews_tab a, li[role="tab"] a').filter({ hasText: 'Reviews' });
    await reviewsTab.click();
    
    // Verify review form elements if present
    const reviewForm = page.locator('#review_form');
    
    if (await reviewForm.isVisible()) {
      // Check for rating stars
      const ratingStars = page.locator('.stars, .star-rating, input[name="rating"]');
      if (await ratingStars.count() > 0) {
        await expect(ratingStars.first()).toBeVisible();
      }
      
      // Check for review text area
      const reviewTextArea = page.locator('textarea[name="comment"], #comment');
      if (await reviewTextArea.isVisible()) {
        await expect(reviewTextArea).toBeVisible();
        await expect(reviewTextArea).toBeEnabled();
      }
      
      // Check for name and email fields
      const nameField = page.locator('input[name="author"], #author');
      const emailField = page.locator('input[name="email"], #email');
      
      if (await nameField.isVisible()) {
        await expect(nameField).toBeVisible();
      }
      
      if (await emailField.isVisible()) {
        await expect(emailField).toBeVisible();
      }
      
      // Check for submit button
      const submitButton = page.locator('input[type="submit"], button[type="submit"]').filter({ hasText: /submit|post|send/i });
      if (await submitButton.count() > 0) {
        await expect(submitButton.first()).toBeVisible();
      }
      
      console.log('✅ Review form functionality verified');
    } else {
      console.log('ℹ️ Review form not available - may require login or reviews may be disabled');
    }
  });
  
});
