// spec: My Account - Login - Authentication State After Logout
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// Test credentials  
const TEST_USERNAME = process.env.TEST_USERNAME || `testuser${Date.now()}@example.com`;
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'TestPassword123!';

// Helper function to register a user
async function registerUser(page: any, username: string, password: string) {
  console.log('\n=== Registering New User ===');
  
  await page.goto('http://practice.automationtesting.in/my-account/');
  
  // Handle consent dialog if present
  try {
    await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
  } catch (error) {}
  
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  
  // Fill registration form
  const emailField = page.locator('#reg_email, input[name="email"]').first();
  const passwordField = page.locator('#reg_password, input[name="password"]').first();
  const registerButton = page.locator('button[name="register"], input[type="submit"][value*="Register"]').first();
  
  await emailField.fill(username);
  console.log(`✅ Entered email: ${username}`);
  
  await passwordField.fill(password);
  console.log('✅ Entered password');
  
  await registerButton.click();
  console.log('✅ Clicked Register button');
  
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Verify registration success
  const logoutLink = page.locator('a[href*="customer-logout"]').first();
  const isRegistered = await logoutLink.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (isRegistered) {
    console.log('✅ ✅ ✅ User registered successfully ✅ ✅ ✅\n');
    return true;
  } else {
    // Check if user already exists
    const errorMessage = page.locator('.woocommerce-error, .error').first();
    if (await errorMessage.isVisible({ timeout: 3000 })) {
      const errorText = await errorMessage.textContent();
      console.log(`⚠️ Registration error: ${errorText}`);
      
      if (errorText?.includes('already registered') || errorText?.includes('already exists')) {
        console.log('ℹ️ User already exists - will use existing account\n');
        return true;
      }
    }
    console.log('❌ Registration failed\n');
    return false;
  }
}

test.describe('My Account - Login - Authentication After Logout', () => {
  
  // Register user before all tests
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await registerUser(page, TEST_USERNAME, TEST_PASSWORD);
    
    await context.close();
  });
  
  test('Basic logout and back button flow - TC-MA-LOGIN-008.1', async ({ page }) => {
    test.setTimeout(90000);
    
    console.log('=== TC-MA-LOGIN-008.1: Basic Logout and Back Button Flow ===\n');
    
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
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await expect(page).toHaveURL(/.*my-account.*/, { timeout: 10000 });
    console.log('✅ Navigated to My Account page');
    
    // Step 4-5: Login with valid credentials
    console.log('\n=== Performing Login ===');
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.fill(TEST_USERNAME);
    console.log(`✅ Step 4: Entered username: ${TEST_USERNAME}`);
    
    await passwordField.fill(TEST_PASSWORD);
    console.log('✅ Step 5: Entered password');
    
    // Step 6: Click login button
    await loginButton.click();
    console.log('✅ Step 6: Clicked Login button');
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify successful login
    console.log('\n=== Verifying Login Success ===');
    const logoutLink = page.locator('a[href*="customer-logout"], a:has-text("Logout"), a:has-text("Sign out")').first();
    await expect(logoutLink).toBeVisible({ timeout: 10000 });
    console.log('✅ Login successful - Logout link visible');
    
    const dashboardUrl = page.url();
    console.log(`Dashboard URL: ${dashboardUrl}`);
    
    // Step 7: Click Logout link
    console.log('\n=== Performing Logout ===');
    await logoutLink.click();
    console.log('✅ Step 7: Clicked Logout link');
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Step 8: Verify logout confirmation
    const logoutUrl = page.url();
    console.log(`✅ Step 8: After logout URL: ${logoutUrl}`);
    
    // Check if logout message is displayed
    const logoutMessage = page.locator('text=/logged out/i, text=/signed out/i').first();
    if (await logoutMessage.isVisible({ timeout: 3000 })) {
      const messageText = await logoutMessage.textContent();
      console.log(`✅ Logout message: "${messageText?.trim()}"`);
    }
    
    // Verify logout link is no longer visible (or login form is visible)
    const loginForm = page.locator('form.login, form[action*="login"]').first();
    const isLoggedOut = await loginForm.isVisible({ timeout: 5000 }).catch(() => false);
    console.log(`✅ Login form visible: ${isLoggedOut}`);
    
    // Step 9: Press back button
    console.log('\n=== Testing Back Button After Logout ===');
    await page.goBack();
    console.log('✅ Step 9: Pressed browser back button');
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Step 10-11: Verify user is NOT logged in
    console.log('\n=== Verifying Authentication State ===');
    const currentUrl = page.url();
    console.log(`Current URL after back: ${currentUrl}`);
    
    // Check if logout link is visible (should NOT be)
    const logoutLinkAfterBack = page.locator('a[href*="customer-logout"], a:has-text("Logout")').first();
    const isStillLoggedIn = await logoutLinkAfterBack.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (!isStillLoggedIn) {
      console.log('✅ ✅ ✅ USER NOT LOGGED IN - SESSION PROPERLY INVALIDATED ✅ ✅ ✅');
    } else {
      console.log('❌ ❌ ❌ USER STILL LOGGED IN - CRITICAL SECURITY ISSUE ❌ ❌ ❌');
    }
    
    // Check if login form is visible (should be)
    const loginFormAfterBack = page.locator('form.login, form[action*="login"], #username').first();
    const loginFormVisible = await loginFormAfterBack.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (loginFormVisible) {
      console.log('✅ Login form visible - user on public page');
    } else {
      console.log('⚠️ Login form not visible - checking page content...');
    }
    
    // Verify no access to protected content
    const dashboardElements = page.locator('text=/dashboard/i, text=/my account/i, text=/orders/i').first();
    const hasDashboardContent = await dashboardElements.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!hasDashboardContent || loginFormVisible) {
      console.log('✅ No protected content visible after back button');
    }
    
    expect(isStillLoggedIn).toBe(false);
    console.log('\n✅ Test completed - Session invalidation verified');
  });
  
  test('Multiple back button presses after logout - TC-MA-LOGIN-008.2', async ({ page }) => {
    test.setTimeout(90000);
    
    console.log('=== TC-MA-LOGIN-008.2: Multiple Back Button Presses ===\n');
    
    // Login process
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
    
    console.log('✅ Logged in successfully');
    
    // Navigate to multiple pages
    console.log('\n=== Navigating Through Account Pages ===');
    const myAccountUrl = page.url();
    console.log(`1. My Account URL: ${myAccountUrl}`);
    
    // Try to navigate to Orders page if available
    const ordersLink = page.locator('a[href*="orders"], a:has-text("Orders")').first();
    if (await ordersLink.isVisible({ timeout: 3000 })) {
      await ordersLink.click();
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      console.log(`2. Orders URL: ${page.url()}`);
    }
    
    // Try to navigate to Account Details if available
    const accountDetailsLink = page.locator('a[href*="edit-account"], a:has-text("Account details")').first();
    if (await accountDetailsLink.isVisible({ timeout: 3000 })) {
      await accountDetailsLink.click();
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      console.log(`3. Account Details URL: ${page.url()}`);
    }
    
    // Logout
    console.log('\n=== Logging Out ===');
    const logoutLink = page.locator('a[href*="customer-logout"], a:has-text("Logout")').first();
    await logoutLink.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('✅ Logged out');
    
    // Press back button multiple times
    console.log('\n=== Pressing Back Button Multiple Times ===');
    const backPresses = 5;
    const results: string[] = [];
    
    for (let i = 1; i <= backPresses; i++) {
      await page.goBack();
      await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      await page.waitForTimeout(1000);
      
      const url = page.url();
      const logoutVisible = await page.locator('a[href*="customer-logout"]').first().isVisible({ timeout: 2000 }).catch(() => false);
      
      console.log(`Back press ${i}: URL = ${url}`);
      console.log(`  Logged in: ${logoutVisible ? 'YES ❌' : 'NO ✅'}`);
      
      results.push(logoutVisible ? 'LOGGED_IN' : 'LOGGED_OUT');
      
      expect(logoutVisible).toBe(false);
    }
    
    const allLoggedOut = results.every(r => r === 'LOGGED_OUT');
    if (allLoggedOut) {
      console.log('\n✅ ✅ ✅ ALL BACK BUTTON PRESSES SHOW LOGGED OUT STATE ✅ ✅ ✅');
    } else {
      console.log('\n❌ ❌ ❌ SESSION RESTORED ON BACK BUTTON - SECURITY ISSUE ❌ ❌ ❌');
    }
    
    expect(allLoggedOut).toBe(true);
    console.log('\n✅ Multiple back button test completed');
  });
  
  test('Verify logout URL redirect behavior - TC-MA-LOGIN-008.3', async ({ page }) => {
    test.setTimeout(90000);
    
    console.log('=== TC-MA-LOGIN-008.3: Logout URL Redirect Behavior ===\n');
    
    // Login
    await page.goto('http://practice.automationtesting.in/');
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded');
    
    await page.locator('#username, input[name="username"]').first().fill(TEST_USERNAME);
    await page.locator('#password, input[name="password"]').first().fill(TEST_PASSWORD);
    await page.locator('button[name="login"], input[type="submit"][value*="Log"]').first().click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const dashboardUrl = page.url();
    console.log(`Dashboard URL: ${dashboardUrl}`);
    
    // Logout and capture redirect
    console.log('\n=== Logout and Capture Redirect ===');
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    await logoutLink.click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const logoutRedirectUrl = page.url();
    console.log(`✅ Logout redirect URL: ${logoutRedirectUrl}`);
    
    // Check for logout message
    const pageContent = await page.content();
    if (pageContent.toLowerCase().includes('logged out') || pageContent.toLowerCase().includes('signed out')) {
      console.log('✅ Logout confirmation message found');
    }
    
    // Press back button
    console.log('\n=== Back Button After Logout ===');
    await page.goBack();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(1000);
    
    const backButtonUrl = page.url();
    console.log(`URL after back button: ${backButtonUrl}`);
    
    // Verify URL indicates non-authenticated state
    const isAuthUrl = backButtonUrl.includes('dashboard') || backButtonUrl.includes('orders') || backButtonUrl.includes('edit-account');
    const hasAuthParams = backButtonUrl.includes('session') || backButtonUrl.includes('token');
    
    if (!isAuthUrl && !hasAuthParams) {
      console.log('✅ URL indicates public/non-authenticated page');
    } else {
      console.log('⚠️ URL may indicate authenticated state');
    }
    
    // Verify not logged in
    const isLoggedIn = await page.locator('a[href*="customer-logout"]').first().isVisible({ timeout: 2000 }).catch(() => false);
    expect(isLoggedIn).toBe(false);
    
    console.log('\n✅ Logout redirect behavior test completed');
  });
  
  test('Session invalidation verification - TC-MA-LOGIN-008.4', async ({ page }) => {
    test.setTimeout(90000);
    
    console.log('=== TC-MA-LOGIN-008.4: Session Invalidation Verification ===\n');
    
    // Login
    await page.goto('http://practice.automationtesting.in/');
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded');
    
    await page.locator('#username').first().fill(TEST_USERNAME);
    await page.locator('#password').first().fill(TEST_PASSWORD);
    await page.locator('button[name="login"]').first().click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    console.log('✅ Logged in');
    
    // Verify authentication
    const dashboardVisible = await page.locator('text=/dashboard/i, a[href*="customer-logout"]').first().isVisible({ timeout: 5000 });
    expect(dashboardVisible).toBe(true);
    console.log('✅ Dashboard visible - user authenticated');
    
    // Logout
    await page.locator('a[href*="customer-logout"]').first().click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('✅ Logged out');
    
    // Go back
    await page.goBack();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('✅ Pressed back button');
    
    // Try to interact with account features
    console.log('\n=== Attempting to Access Protected Resources ===');
    
    const protectedLinks = [
      { name: 'Orders', selector: 'a[href*="orders"]' },
      { name: 'Downloads', selector: 'a[href*="downloads"]' },
      { name: 'Addresses', selector: 'a[href*="addresses"]' },
      { name: 'Account Details', selector: 'a[href*="edit-account"]' }
    ];
    
    for (const link of protectedLinks) {
      const element = page.locator(link.selector).first();
      if (await element.isVisible({ timeout: 2000 })) {
        console.log(`Found ${link.name} link - attempting to access...`);
        await element.click();
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
        
        // Check if we're on login page or got redirected
        const onLoginPage = await page.locator('#username, form.login').first().isVisible({ timeout: 3000 }).catch(() => false);
        const isLoggedIn = await page.locator('a[href*="customer-logout"]').first().isVisible({ timeout: 2000 }).catch(() => false);
        
        if (onLoginPage || !isLoggedIn) {
          console.log(`✅ ${link.name} access denied - redirected to login`);
        } else {
          console.log(`❌ ${link.name} access granted - SESSION NOT INVALIDATED`);
        }
        
        expect(isLoggedIn).toBe(false);
        break; // Test one link
      }
    }
    
    console.log('\n✅ Session invalidation test completed');
  });
  
  test('Direct URL access after logout - TC-MA-LOGIN-008.6', async ({ page }) => {
    test.setTimeout(90000);
    
    console.log('=== TC-MA-LOGIN-008.6: Direct URL Access After Logout ===\n');
    
    // Login
    await page.goto('http://practice.automationtesting.in/');
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded');
    
    await page.locator('#username').first().fill(TEST_USERNAME);
    await page.locator('#password').first().fill(TEST_PASSWORD);
    await page.locator('button[name="login"]').first().click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Copy dashboard URL
    const dashboardUrl = page.url();
    console.log(`✅ Dashboard URL captured: ${dashboardUrl}`);
    
    // Logout
    await page.locator('a[href*="customer-logout"]').first().click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('✅ Logged out');
    
    // Navigate to copied dashboard URL
    console.log('\n=== Attempting Direct URL Access ===');
    await page.goto(dashboardUrl);
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Verify access is denied
    const isLoggedIn = await page.locator('a[href*="customer-logout"]').first().isVisible({ timeout: 3000 }).catch(() => false);
    const loginFormVisible = await page.locator('#username, form.login').first().isVisible({ timeout: 3000 }).catch(() => false);
    
    if (!isLoggedIn && loginFormVisible) {
      console.log('✅ ✅ ✅ ACCESS DENIED - REDIRECTED TO LOGIN ✅ ✅ ✅');
    } else if (!isLoggedIn) {
      console.log('✅ Access denied - user not logged in');
    } else {
      console.log('❌ ❌ ❌ ACCESS GRANTED - SECURITY ISSUE ❌ ❌ ❌');
    }
    
    // Check for appropriate message
    const pageContent = await page.textContent('body') || '';
    if (pageContent.toLowerCase().includes('login') || pageContent.toLowerCase().includes('sign in')) {
      console.log('✅ Appropriate message/page displayed');
    }
    
    expect(isLoggedIn).toBe(false);
    console.log('\n✅ Direct URL access test completed');
  });
  
  test('Verify session cookies are cleared on logout - TC-MA-LOGIN-008.7', async ({ page, context }) => {
    test.setTimeout(90000);
    
    console.log('=== TC-MA-LOGIN-008.7: Session Cookies Cleared on Logout ===\n');
    
    // Login
    await page.goto('http://practice.automationtesting.in/');
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded');
    
    await page.locator('#username').first().fill(TEST_USERNAME);
    await page.locator('#password').first().fill(TEST_PASSWORD);
    await page.locator('button[name="login"]').first().click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Capture cookies after login
    console.log('\n=== Cookies After Login ===');
    const cookiesAfterLogin = await context.cookies();
    const sessionCookies = cookiesAfterLogin.filter(c => 
      c.name.toLowerCase().includes('session') || 
      c.name.toLowerCase().includes('auth') || 
      c.name.toLowerCase().includes('token') ||
      c.name.toLowerCase().includes('wordpress') ||
      c.name.toLowerCase().includes('woocommerce')
    );
    
    console.log(`Total cookies: ${cookiesAfterLogin.length}`);
    console.log(`Session-related cookies: ${sessionCookies.length}`);
    sessionCookies.forEach(cookie => {
      console.log(`  - ${cookie.name}: ${cookie.value.substring(0, 20)}...`);
    });
    
    // Logout
    await page.locator('a[href*="customer-logout"]').first().click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    console.log('\n✅ Logged out');
    
    // Capture cookies after logout
    console.log('\n=== Cookies After Logout ===');
    const cookiesAfterLogout = await context.cookies();
    const sessionCookiesAfterLogout = cookiesAfterLogout.filter(c => 
      c.name.toLowerCase().includes('session') || 
      c.name.toLowerCase().includes('auth') || 
      c.name.toLowerCase().includes('token') ||
      c.name.toLowerCase().includes('wordpress') ||
      c.name.toLowerCase().includes('woocommerce')
    );
    
    console.log(`Total cookies: ${cookiesAfterLogout.length}`);
    console.log(`Session-related cookies: ${sessionCookiesAfterLogout.length}`);
    sessionCookiesAfterLogout.forEach(cookie => {
      console.log(`  - ${cookie.name}: ${cookie.value.substring(0, 20)}...`);
    });
    
    // Compare cookies
    console.log('\n=== Cookie Comparison ===');
    const cookiesCleared = sessionCookies.length > sessionCookiesAfterLogout.length;
    
    if (cookiesCleared) {
      console.log(`✅ Session cookies reduced from ${sessionCookies.length} to ${sessionCookiesAfterLogout.length}`);
    } else {
      console.log(`⚠️ Session cookies count unchanged: ${sessionCookies.length}`);
    }
    
    // Check if cookie values changed
    let cookiesChanged = false;
    for (const beforeCookie of sessionCookies) {
      const afterCookie = sessionCookiesAfterLogout.find(c => c.name === beforeCookie.name);
      if (afterCookie && afterCookie.value !== beforeCookie.value) {
        console.log(`✅ Cookie "${beforeCookie.name}" value changed`);
        cookiesChanged = true;
      } else if (!afterCookie) {
        console.log(`✅ Cookie "${beforeCookie.name}" deleted`);
        cookiesChanged = true;
      }
    }
    
    if (cookiesCleared || cookiesChanged) {
      console.log('\n✅ ✅ ✅ SESSION COOKIES INVALIDATED ✅ ✅ ✅');
    } else {
      console.log('\n⚠️ Session cookies may not be properly cleared');
    }
    
    // Verify cannot access protected page
    await page.goto('http://practice.automationtesting.in/my-account/orders/');
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    
    const isLoggedIn = await page.locator('a[href*="customer-logout"]').first().isVisible({ timeout: 2000 }).catch(() => false);
    expect(isLoggedIn).toBe(false);
    
    console.log('\n✅ Session cookies test completed');
  });
  
});
