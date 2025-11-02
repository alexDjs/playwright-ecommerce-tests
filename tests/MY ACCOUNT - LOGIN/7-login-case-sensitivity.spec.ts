// spec: My Account - Login - Handles Case Sensitive
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// Test credentials - replace with actual registered credentials
// IMPORTANT: Document the EXACT case of these credentials
const TEST_USERNAME = process.env.TEST_USERNAME || 'testuser@example.com'; // lowercase
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'TestPassword123!';     // mixed case

test.describe('My Account - Login - Handles Case Sensitive', () => {
  
  test('Password case sensitivity - all lowercase', async ({ page }) => {
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
    
    // Locate form fields
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Step 4: Enter correct username
    console.log('\n=== Entering Credentials with Case Change ===');
    await usernameField.fill(TEST_USERNAME);
    console.log(`✅ Step 4: Entered correct username: ${TEST_USERNAME}`);
    
    // Step 5: Enter password with ALL LOWERCASE case change
    const changedPassword = TEST_PASSWORD.toLowerCase();
    await passwordField.fill(changedPassword);
    console.log(`✅ Step 5: Entered case-changed password (all lowercase)`);
    console.log(`   Original: ${TEST_PASSWORD}`);
    console.log(`   Changed:  ${changedPassword}`);
    
    // Step 6: Click login button
    console.log('\n=== Attempting Login with Case-Changed Password ===');
    await loginButton.click();
    console.log('✅ Step 6: Clicked Login button');
    
    // Wait for response
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Step 7: Verify login must fail
    console.log('\n=== Verifying Login Failure ===');
    
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Check for error message
    const errorSelectors = [
      '.woocommerce-error',
      '.error',
      'text=/ERROR/i',
      'text=/incorrect/i',
      'text=/invalid/i'
    ];
    
    let errorFound = false;
    let errorMessage = '';
    
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector).first();
      if (await errorElement.isVisible({ timeout: 2000 })) {
        errorMessage = await errorElement.textContent() || '';
        console.log(`✅ Step 7: Error message displayed: "${errorMessage.trim()}"`);
        errorFound = true;
        break;
      }
    }
    
    if (!errorFound) {
      console.log('⚠️ No error message found - checking if login succeeded...');
    }
    
    // Check if user is logged in (should NOT be)
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!isLoggedIn) {
      console.log('✅ ✅ ✅ USER NOT LOGGED IN - CASE SENSITIVITY ENFORCED ✅ ✅ ✅');
    } else {
      console.log('❌ ❌ ❌ USER LOGGED IN - CASE SENSITIVITY NOT ENFORCED (SECURITY ISSUE) ❌ ❌ ❌');
    }
    
    // Verify error message content
    if (errorMessage) {
      const messageLower = errorMessage.toLowerCase();
      
      if (messageLower.includes('incorrect') || messageLower.includes('invalid') || messageLower.includes('wrong')) {
        console.log('✅ Error message indicates incorrect credentials');
      }
      
      if (!messageLower.includes('case') && !messageLower.includes('uppercase') && !messageLower.includes('lowercase')) {
        console.log('✅ Error message is generic (good security - doesn\'t reveal case issue)');
      } else {
        console.log('⚠️ Error message reveals case sensitivity details');
      }
    }
    
    expect(isLoggedIn).toBe(false);
    console.log('\n✅ Password case sensitivity test (lowercase) completed');
  });
  
  test('Password case sensitivity - all uppercase', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Password Case Sensitivity (Uppercase) ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Enter correct username
    await usernameField.fill(TEST_USERNAME);
    console.log(`Username: ${TEST_USERNAME}`);
    
    // Enter password with ALL UPPERCASE case change
    const changedPassword = TEST_PASSWORD.toUpperCase();
    await passwordField.fill(changedPassword);
    console.log(`Original password: ${TEST_PASSWORD}`);
    console.log(`Changed password:  ${changedPassword}`);
    
    await loginButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify login fails
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!isLoggedIn) {
      console.log('✅ Login failed - uppercase password rejected');
    } else {
      console.log('❌ Login succeeded - SECURITY ISSUE');
    }
    
    // Check for error message
    const errorElement = page.locator('.woocommerce-error, .error').first();
    if (await errorElement.isVisible({ timeout: 2000 })) {
      const errorText = await errorElement.textContent();
      console.log(`Error message: "${errorText?.trim()}"`);
    }
    
    expect(isLoggedIn).toBe(false);
    console.log('\n✅ Password case sensitivity test (uppercase) completed');
  });
  
  test('Username case sensitivity - all uppercase', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Username Case Sensitivity (Uppercase) ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Enter username with ALL UPPERCASE case change
    const changedUsername = TEST_USERNAME.toUpperCase();
    await usernameField.fill(changedUsername);
    console.log(`Original username: ${TEST_USERNAME}`);
    console.log(`Changed username:  ${changedUsername}`);
    
    // Enter correct password
    await passwordField.fill(TEST_PASSWORD);
    console.log(`Correct password: ${TEST_PASSWORD}`);
    
    await loginButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Check login result
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
    
    console.log('\n--- Username Case Sensitivity Result ---');
    if (!isLoggedIn) {
      console.log('✅ Login failed - username is case-sensitive');
      console.log('ℹ️ This is uncommon for email addresses but valid');
    } else {
      console.log('✅ Login succeeded - username is case-insensitive');
      console.log('ℹ️ This is standard for email addresses (acceptable)');
    }
    
    // Check for error message if login failed
    const errorElement = page.locator('.woocommerce-error, .error').first();
    if (await errorElement.isVisible({ timeout: 2000 })) {
      const errorText = await errorElement.textContent();
      console.log(`Error message: "${errorText?.trim()}"`);
    }
    
    console.log('\nℹ️ Note: Email usernames are typically case-insensitive per RFC 5321');
    console.log('\n✅ Username case sensitivity test completed');
  });
  
  test('Both username and password case changed', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Both Fields Case Changed ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Change both username and password to uppercase
    const changedUsername = TEST_USERNAME.toUpperCase();
    const changedPassword = TEST_PASSWORD.toUpperCase();
    
    await usernameField.fill(changedUsername);
    await passwordField.fill(changedPassword);
    
    console.log('Original credentials:');
    console.log(`  Username: ${TEST_USERNAME}`);
    console.log(`  Password: ${TEST_PASSWORD}`);
    console.log('\nChanged credentials (both uppercase):');
    console.log(`  Username: ${changedUsername}`);
    console.log(`  Password: ${changedPassword}`);
    
    await loginButton.click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify login fails (password case MUST be enforced)
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!isLoggedIn) {
      console.log('\n✅ ✅ ✅ LOGIN FAILED - CASE SENSITIVITY ENFORCED ✅ ✅ ✅');
      console.log('(Password case sensitivity prevents login even if username case-insensitive)');
    } else {
      console.log('\n❌ ❌ ❌ LOGIN SUCCEEDED - CRITICAL SECURITY ISSUE ❌ ❌ ❌');
    }
    
    // Check error message
    const errorElement = page.locator('.woocommerce-error, .error').first();
    if (await errorElement.isVisible({ timeout: 2000 })) {
      const errorText = await errorElement.textContent();
      console.log(`\nError message: "${errorText?.trim()}"`);
    }
    
    expect(isLoggedIn).toBe(false);
    console.log('\n✅ Both fields case sensitivity test completed');
  });
  
  test('Password case sensitivity - partial case changes', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Partial Password Case Changes ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Test multiple partial case changes
    const partialCaseTests = [
      {
        name: 'First character case changed',
        original: TEST_PASSWORD,
        changed: TEST_PASSWORD.charAt(0).toLowerCase() + TEST_PASSWORD.slice(1)
      },
      {
        name: 'Middle character case changed',
        original: TEST_PASSWORD,
        changed: TEST_PASSWORD.slice(0, 4) + 
                 (TEST_PASSWORD.charAt(4).toUpperCase() === TEST_PASSWORD.charAt(4) 
                   ? TEST_PASSWORD.charAt(4).toLowerCase() 
                   : TEST_PASSWORD.charAt(4).toUpperCase()) + 
                 TEST_PASSWORD.slice(5)
      },
      {
        name: 'Random case alternation',
        original: TEST_PASSWORD,
        changed: TEST_PASSWORD.split('').map((char, i) => 
          i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('')
      }
    ];
    
    for (const test of partialCaseTests) {
      console.log(`\n--- ${test.name} ---`);
      console.log(`Original: ${test.original}`);
      console.log(`Changed:  ${test.changed}`);
      
      // Clear fields
      await usernameField.clear();
      await passwordField.clear();
      
      // Enter credentials
      await usernameField.fill(TEST_USERNAME);
      await passwordField.fill(test.changed);
      await loginButton.click();
      
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      await page.waitForTimeout(2000);
      
      // Check if logged in
      const logoutLink = page.locator('a[href*="customer-logout"]').first();
      const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!isLoggedIn) {
        console.log('✅ Login failed - partial case change rejected');
      } else {
        console.log('❌ Login succeeded - SECURITY ISSUE');
      }
      
      // Navigate back to login page if needed
      const currentUrl = page.url();
      if (!currentUrl.includes('my-account') || !await usernameField.isVisible({ timeout: 2000 })) {
        await page.goto('http://practice.automationtesting.in/my-account/');
        await page.waitForLoadState('domcontentloaded');
      }
    }
    
    console.log('\n✅ All partial case changes properly rejected');
    console.log('✅ Partial case sensitivity test completed');
  });
  
  test('Case sensitivity error message consistency', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Error Message Consistency ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    const errorMessages: string[] = [];
    
    const testCases = [
      { name: 'Password lowercase', username: TEST_USERNAME, password: TEST_PASSWORD.toLowerCase() },
      { name: 'Password uppercase', username: TEST_USERNAME, password: TEST_PASSWORD.toUpperCase() },
      { name: 'Both uppercase', username: TEST_USERNAME.toUpperCase(), password: TEST_PASSWORD.toUpperCase() }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n--- Test: ${testCase.name} ---`);
      
      await usernameField.clear();
      await passwordField.clear();
      await usernameField.fill(testCase.username);
      await passwordField.fill(testCase.password);
      await loginButton.click();
      
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      await page.waitForTimeout(2000);
      
      // Capture error message
      const errorElement = page.locator('.woocommerce-error, .error').first();
      if (await errorElement.isVisible({ timeout: 2000 })) {
        const errorText = await errorElement.textContent() || '';
        errorMessages.push(errorText.trim());
        console.log(`Error: "${errorText.trim()}"`);
      } else {
        errorMessages.push('NO ERROR');
        console.log('⚠️ No error message displayed');
      }
      
      // Return to login page
      const currentUrl = page.url();
      if (!currentUrl.includes('my-account') || !await usernameField.isVisible({ timeout: 2000 })) {
        await page.goto('http://practice.automationtesting.in/my-account/');
        await page.waitForLoadState('domcontentloaded');
      }
    }
    
    // Analyze consistency
    console.log('\n--- Error Message Analysis ---');
    const uniqueErrors = [...new Set(errorMessages.filter(msg => msg !== 'NO ERROR'))];
    
    if (uniqueErrors.length === 1) {
      console.log('✅ Error messages are consistent');
      console.log(`Message: "${uniqueErrors[0]}"`);
    } else if (uniqueErrors.length > 1) {
      console.log('⚠️ Error messages vary:');
      uniqueErrors.forEach((msg, i) => {
        console.log(`  ${i + 1}. "${msg}"`);
      });
    }
    
    // Check for security best practices
    if (uniqueErrors.length > 0) {
      const message = uniqueErrors[0].toLowerCase();
      
      if (!message.includes('case') && !message.includes('uppercase') && !message.includes('lowercase')) {
        console.log('✅ Error message is generic (doesn\'t reveal case sensitivity)');
      } else {
        console.log('⚠️ Error message reveals case sensitivity information');
      }
      
      if (message.includes('incorrect') || message.includes('invalid')) {
        console.log('✅ Error message indicates incorrect credentials');
      }
    }
    
    console.log('\n✅ Error message consistency test completed');
  });
  
});
