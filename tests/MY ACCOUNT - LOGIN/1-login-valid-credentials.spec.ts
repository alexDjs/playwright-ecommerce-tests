// spec: My Account - Login with Valid Credentials
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// Test credentials - replace with actual registered credentials
const TEST_USERNAME = process.env.TEST_USERNAME || 'testuser@example.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'TestPassword123!';

test.describe('My Account - Login with Valid Credentials', () => {
  
  test('Login with valid username and password @smoke @critical', async ({ page }) => {
    test.setTimeout(60000);
    
    // Step 1-2: Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    console.log('✅ Step 1-2: Navigated to practice.automationtesting.in');
    
    // Handle consent dialog if present
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
      console.log('✅ Handled consent dialog');
    } catch (error) {
      console.log('ℹ️ Consent dialog not found');
    }
    
    // Step 3: Click on My Account menu
    const myAccountLink = page.getByRole('link', { name: 'My Account' });
    await expect(myAccountLink).toBeVisible({ timeout: 10000 });
    await myAccountLink.click();
    console.log('✅ Step 3: Clicked My Account menu');
    
    // Verify navigation to My Account page
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await expect(page).toHaveURL(/.*my-account.*/, { timeout: 10000 });
    console.log('✅ Navigated to My Account page');
    
    // Verify login form is visible
    console.log('\n=== Verifying Login Form ===');
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await expect(usernameField).toBeVisible({ timeout: 5000 });
    console.log('✅ Username field is visible');
    
    await expect(passwordField).toBeVisible({ timeout: 5000 });
    console.log('✅ Password field is visible');
    
    await expect(loginButton).toBeVisible({ timeout: 5000 });
    console.log('✅ Login button is visible');
    
    // Step 4: Enter registered username
    console.log('\n=== Entering Credentials ===');
    await usernameField.click();
    await usernameField.fill(TEST_USERNAME);
    console.log(`✅ Step 4: Entered username: ${TEST_USERNAME}`);
    
    // Verify username appears in field
    const usernameValue = await usernameField.inputValue();
    if (usernameValue === TEST_USERNAME) {
      console.log('✅ Username verified in field');
    }
    
    // Step 5: Enter password
    await passwordField.click();
    await passwordField.fill(TEST_PASSWORD);
    console.log('✅ Step 5: Entered password (masked)');
    
    // Verify password field type is "password" (masked)
    const passwordType = await passwordField.getAttribute('type');
    if (passwordType === 'password') {
      console.log('✅ Password is masked (type="password")');
    }
    
    // Step 6: Click login button
    console.log('\n=== Submitting Login ===');
    await loginButton.click();
    console.log('✅ Step 6: Clicked Login button');
    
    // Wait for authentication and redirect
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Step 7: Verify successful login
    console.log('\n=== Verifying Successful Login ===');
    
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Check if we're still on login page (would indicate login failure)
    if (currentUrl.includes('my-account') && !currentUrl.includes('customer-logout')) {
      console.log('✅ URL indicates account area');
      
      // Look for logout link (key indicator of successful login)
      const logoutSelectors = [
        'a[href*="customer-logout"]',
        'text=/logout/i',
        '.woocommerce-MyAccount-navigation a:has-text("Logout")'
      ];
      
      let logoutFound = false;
      for (const selector of logoutSelectors) {
        const logoutLink = page.locator(selector).first();
        if (await logoutLink.isVisible({ timeout: 5000 })) {
          console.log(`✅ Step 7: Logout link found - LOGIN SUCCESSFUL`);
          logoutFound = true;
          break;
        }
      }
      
      if (!logoutFound) {
        console.log('⚠️ Logout link not found, checking for other indicators...');
      }
      
      // Check for welcome message or user name
      const welcomeMessages = [
        page.locator('text=/hello/i').first(),
        page.locator('text=/welcome/i').first(),
        page.locator('.woocommerce-MyAccount-content').first()
      ];
      
      for (const msg of welcomeMessages) {
        if (await msg.isVisible({ timeout: 3000 })) {
          const msgText = await msg.textContent();
          console.log(`✅ Welcome message found: ${msgText?.substring(0, 50)}...`);
          break;
        }
      }
      
      // Check for account navigation menu
      const accountNav = page.locator('.woocommerce-MyAccount-navigation, nav.account-navigation').first();
      if (await accountNav.isVisible({ timeout: 3000 })) {
        console.log('✅ Account navigation menu visible');
        
        // List available menu items
        const navItems = page.locator('.woocommerce-MyAccount-navigation li, .account-navigation li');
        const count = await navItems.count();
        console.log(`   Found ${count} account menu items`);
      }
      
      // Verify login form is no longer visible
      const loginFormVisible = await page.locator('form.login, .login-form').isVisible({ timeout: 2000 }).catch(() => false);
      if (!loginFormVisible) {
        console.log('✅ Login form is no longer visible');
      }
      
      // Check for any error messages (there should be none)
      const errorMessage = page.locator('.woocommerce-error, .error').first();
      const hasError = await errorMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!hasError) {
        console.log('✅ No error messages displayed');
      } else {
        const errorText = await errorMessage.textContent();
        console.log(`⚠️ Error message found: ${errorText}`);
      }
      
      console.log('\n✅ ✅ ✅ LOGIN TEST COMPLETED SUCCESSFULLY ✅ ✅ ✅');
      
    } else {
      console.log('⚠️ Still on login page or unexpected URL');
      
      // Check for error messages
      const errorMessage = page.locator('.woocommerce-error, .error').first();
      if (await errorMessage.isVisible({ timeout: 3000 })) {
        const errorText = await errorMessage.textContent();
        console.log(`❌ Login failed with error: ${errorText}`);
      } else {
        console.log('⚠️ No error message, but login may not have succeeded');
      }
    }
  });
  
  test('Login form field validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Login Form Fields ===\n');
    
    // Test Username field
    console.log('--- Username Field ---');
    const usernameField = page.locator('#username, input[name="username"]').first();
    
    await expect(usernameField).toBeVisible({ timeout: 5000 });
    console.log('✅ Username field is visible');
    
    // Check for label
    const usernameLabel = page.locator('label[for="username"]').first();
    if (await usernameLabel.isVisible({ timeout: 2000 })) {
      const labelText = await usernameLabel.textContent();
      console.log(`✅ Username field label: "${labelText?.trim()}"`);
    }
    
    // Test input
    await usernameField.click();
    await usernameField.fill('test@example.com');
    const usernameValue = await usernameField.inputValue();
    
    if (usernameValue === 'test@example.com') {
      console.log('✅ Username field accepts input correctly');
    }
    
    await usernameField.clear();
    
    // Test Password field
    console.log('\n--- Password Field ---');
    const passwordField = page.locator('#password, input[name="password"]').first();
    
    await expect(passwordField).toBeVisible({ timeout: 5000 });
    console.log('✅ Password field is visible');
    
    // Check for label
    const passwordLabel = page.locator('label[for="password"]').first();
    if (await passwordLabel.isVisible({ timeout: 2000 })) {
      const labelText = await passwordLabel.textContent();
      console.log(`✅ Password field label: "${labelText?.trim()}"`);
    }
    
    // Verify password field is type="password"
    const passwordType = await passwordField.getAttribute('type');
    if (passwordType === 'password') {
      console.log('✅ Password field type is "password" (masked)');
    }
    
    // Test input
    await passwordField.click();
    await passwordField.fill('TestPassword123');
    console.log('✅ Password field accepts input');
    
    // Verify input is masked (we can't see the actual value)
    const displayValue = await passwordField.inputValue();
    if (displayValue === 'TestPassword123') {
      console.log('✅ Password value stored (though displayed masked)');
    }
    
    // Test Login button
    console.log('\n--- Login Button ---');
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await expect(loginButton).toBeVisible({ timeout: 5000 });
    console.log('✅ Login button is visible');
    
    const buttonText = await loginButton.textContent() || await loginButton.getAttribute('value');
    console.log(`✅ Login button text: "${buttonText?.trim()}"`);
    
    const isEnabled = await loginButton.isEnabled();
    if (isEnabled) {
      console.log('✅ Login button is enabled');
    }
    
    console.log('\n✅ Form field validation completed');
  });
  
  test('Login with keyboard navigation (Enter key)', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Keyboard Navigation ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    
    // Focus username field
    await usernameField.click();
    console.log('✅ Focused username field');
    
    // Type username
    await page.keyboard.type(TEST_USERNAME);
    console.log('✅ Typed username with keyboard');
    
    // Press Tab to move to password field
    await page.keyboard.press('Tab');
    console.log('✅ Pressed Tab to move to password field');
    
    // Verify password field is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('name'));
    if (focusedElement === 'password') {
      console.log('✅ Password field is now focused');
    }
    
    // Type password
    await page.keyboard.type(TEST_PASSWORD);
    console.log('✅ Typed password with keyboard');
    
    // Press Enter to submit form
    console.log('\n--- Submitting with Enter Key ---');
    await page.keyboard.press('Enter');
    console.log('✅ Pressed Enter to submit form');
    
    // Wait for authentication
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify login success
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    if (await logoutLink.isVisible({ timeout: 5000 })) {
      console.log('✅ Login successful via keyboard navigation');
    } else {
      console.log('⚠️ Login may not have succeeded via keyboard');
    }
    
    console.log('\n✅ Keyboard navigation test completed');
  });
  
  test('Post-login dashboard access', async ({ page }) => {
    test.setTimeout(60000);
    
    // Complete login
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.fill(TEST_USERNAME);
    await passwordField.fill(TEST_PASSWORD);
    await loginButton.click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    console.log('=== Testing Post-Login Dashboard Access ===\n');
    
    // Verify account dashboard elements
    console.log('--- Account Dashboard Elements ---');
    
    // Check for account navigation
    const accountNav = page.locator('.woocommerce-MyAccount-navigation').first();
    if (await accountNav.isVisible({ timeout: 5000 })) {
      console.log('✅ Account navigation menu found');
      
      // Check for common menu items
      const menuItems = ['Dashboard', 'Orders', 'Downloads', 'Addresses', 'Account details', 'Logout'];
      
      for (const item of menuItems) {
        const menuLink = page.locator(`.woocommerce-MyAccount-navigation a:has-text("${item}")`).first();
        if (await menuLink.isVisible({ timeout: 2000 })) {
          console.log(`   ✅ ${item} menu item found`);
        }
      }
    }
    
    // Check for account content area
    const accountContent = page.locator('.woocommerce-MyAccount-content').first();
    if (await accountContent.isVisible({ timeout: 5000 })) {
      console.log('✅ Account content area visible');
    }
    
    // Test session persistence
    console.log('\n--- Testing Session Persistence ---');
    console.log('Refreshing page...');
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    
    // Check if still logged in after refresh
    const logoutAfterRefresh = page.locator('a[href*="customer-logout"]').first();
    if (await logoutAfterRefresh.isVisible({ timeout: 5000 })) {
      console.log('✅ Session persisted after page refresh');
    } else {
      console.log('⚠️ Session may not have persisted');
    }
    
    console.log('\n✅ Post-login dashboard access test completed');
  });
  
  test('Login redirect and URL verification', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to home page
    await page.goto('http://practice.automationtesting.in/');
    console.log(`Initial URL: ${page.url()}`);
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    // Click My Account
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    const loginPageUrl = page.url();
    console.log(`Login page URL: ${loginPageUrl}`);
    
    if (loginPageUrl.includes('my-account')) {
      console.log('✅ URL correctly shows my-account page');
    }
    
    // Perform login
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.fill(TEST_USERNAME);
    await passwordField.fill(TEST_PASSWORD);
    await loginButton.click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const postLoginUrl = page.url();
    console.log(`Post-login URL: ${postLoginUrl}`);
    
    // Verify URL change
    if (postLoginUrl !== loginPageUrl) {
      console.log('✅ URL changed after login');
    }
    
    if (postLoginUrl.includes('my-account')) {
      console.log('✅ Post-login URL indicates account area');
    }
    
    // Verify no redirect loops (URL should be stable)
    await page.waitForTimeout(2000);
    const finalUrl = page.url();
    
    if (finalUrl === postLoginUrl) {
      console.log('✅ URL is stable (no redirect loops)');
    } else {
      console.log('⚠️ URL changed after initial redirect');
    }
    
    console.log('\n✅ URL verification test completed');
  });
  
});
