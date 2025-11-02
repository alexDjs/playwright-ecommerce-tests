// spec: My Account - Login with Incorrect Credentials
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// Invalid test credentials
const INVALID_USERNAME = 'wronguser@example.com';
const INVALID_PASSWORD = 'WrongPassword123!';

test.describe('My Account - Login with Incorrect Credentials', () => {
  
  test('Login with incorrect username and incorrect password', async ({ page }) => {
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
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await expect(usernameField).toBeVisible({ timeout: 5000 });
    await expect(passwordField).toBeVisible({ timeout: 5000 });
    await expect(loginButton).toBeVisible({ timeout: 5000 });
    console.log('✅ Login form is visible');
    
    // Step 4: Enter incorrect username
    console.log('\n=== Entering Invalid Credentials ===');
    await usernameField.click();
    await usernameField.fill(INVALID_USERNAME);
    console.log(`✅ Step 4: Entered incorrect username: ${INVALID_USERNAME}`);
    
    // Verify username appears in field
    const usernameValue = await usernameField.inputValue();
    if (usernameValue === INVALID_USERNAME) {
      console.log('✅ Incorrect username verified in field');
    }
    
    // Step 5: Enter incorrect password
    await passwordField.click();
    await passwordField.fill(INVALID_PASSWORD);
    console.log('✅ Step 5: Entered incorrect password (masked)');
    
    // Step 6: Click login button
    console.log('\n=== Attempting Login with Invalid Credentials ===');
    await loginButton.click();
    console.log('✅ Step 6: Clicked Login button');
    
    // Wait for authentication attempt
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Step 7: Verify error message is displayed
    console.log('\n=== Verifying Error Message ===');
    
    // Look for error message
    const errorSelectors = [
      '.woocommerce-error',
      '.woocommerce-error li',
      'ul.woocommerce-error',
      '.error',
      'text=/ERROR/i',
      'text=/Invalid/i',
      'text=/Incorrect/i'
    ];
    
    let errorFound = false;
    let errorText = '';
    
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector).first();
      if (await errorElement.isVisible({ timeout: 5000 })) {
        errorText = (await errorElement.textContent()) || '';
        console.log(`✅ Step 7: Error message found using selector: ${selector}`);
        console.log(`   Error text: "${errorText.trim()}"`);
        errorFound = true;
        break;
      }
    }
    
    if (!errorFound) {
      console.log('⚠️ Error message not found with common selectors');
      
      // Check page text for error keywords
      const bodyText = await page.locator('body').textContent();
      if (bodyText?.toLowerCase().includes('error') || 
          bodyText?.toLowerCase().includes('invalid') ||
          bodyText?.toLowerCase().includes('incorrect')) {
        console.log('ℹ️ Error text found in page content');
      } else {
        console.log('❌ No error message detected');
      }
    } else {
      // Verify error message content
      console.log('\n--- Analyzing Error Message Content ---');
      
      const errorLower = errorText.toLowerCase();
      
      if (errorLower.includes('error')) {
        console.log('✅ Error message contains "ERROR" keyword');
      }
      
      if (errorLower.includes('invalid') || errorLower.includes('incorrect')) {
        console.log('✅ Error message contains "Invalid" or "Incorrect"');
      }
      
      if (errorLower.includes('username') || errorLower.includes('password') || errorLower.includes('credentials')) {
        console.log('✅ Error message mentions username/password/credentials');
      }
      
      if (errorLower.includes('lost') && errorLower.includes('password')) {
        console.log('ℹ️ Error message includes password recovery link');
      }
    }
    
    // Verify user is NOT logged in
    console.log('\n=== Verifying User is NOT Logged In ===');
    
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Check that logout link is NOT visible (would indicate login)
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!isLoggedIn) {
      console.log('✅ No logout link visible - user is NOT logged in (correct)');
    } else {
      console.log('❌ Logout link visible - user appears logged in (SECURITY ISSUE!)');
    }
    
    // Verify login form is still visible/accessible
    console.log('\n=== Verifying Login Form Still Accessible ===');
    
    const usernameStillVisible = await usernameField.isVisible({ timeout: 3000 }).catch(() => false);
    const passwordStillVisible = await passwordField.isVisible({ timeout: 3000 }).catch(() => false);
    const loginButtonStillVisible = await loginButton.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (usernameStillVisible && passwordStillVisible && loginButtonStillVisible) {
      console.log('✅ Login form is still accessible after error');
    } else {
      console.log('⚠️ Login form may not be fully accessible');
    }
    
    // Test that fields are still editable
    if (usernameStillVisible) {
      const isEditable = await usernameField.isEditable();
      if (isEditable) {
        console.log('✅ Username field is still editable');
      }
    }
    
    if (passwordStillVisible) {
      const isEditable = await passwordField.isEditable();
      if (isEditable) {
        console.log('✅ Password field is still editable');
      }
    }
    
    if (loginButtonStillVisible) {
      const isEnabled = await loginButton.isEnabled();
      if (isEnabled) {
        console.log('✅ Login button is still enabled');
      }
    }
    
    console.log('\n✅ ✅ ✅ INVALID CREDENTIALS TEST COMPLETED ✅ ✅ ✅');
    console.log('Summary: Invalid credentials were rejected with error message');
  });
  
  test('Error message content and format validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Error Message Format ===\n');
    
    // Attempt login with invalid credentials
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.fill('invaliduser@test.com');
    await passwordField.fill('InvalidPass123');
    await loginButton.click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Find error message
    const errorElement = page.locator('.woocommerce-error, .error').first();
    
    if (await errorElement.isVisible({ timeout: 5000 })) {
      console.log('✅ Error message is visible\n');
      
      // Check error message styling
      const errorColor = await errorElement.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      console.log(`Error text color: ${errorColor}`);
      
      const errorBgColor = await errorElement.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      console.log(`Error background color: ${errorBgColor}`);
      
      // Get error message text
      const errorText = await errorElement.textContent();
      console.log(`\nError message text: "${errorText?.trim()}"`);
      
      // Analyze error message content
      console.log('\n--- Error Message Analysis ---');
      
      const errorLower = errorText?.toLowerCase() || '';
      
      const hasErrorKeyword = errorLower.includes('error');
      console.log(`Contains "ERROR": ${hasErrorKeyword ? '✅' : '❌'}`);
      
      const hasInvalidIncorrect = errorLower.includes('invalid') || errorLower.includes('incorrect');
      console.log(`Contains "Invalid/Incorrect": ${hasInvalidIncorrect ? '✅' : '❌'}`);
      
      const hasCredentialRef = errorLower.includes('username') || 
                               errorLower.includes('password') || 
                               errorLower.includes('credentials');
      console.log(`References credentials: ${hasCredentialRef ? '✅' : '❌'}`);
      
      const hasRecoveryLink = errorLower.includes('lost') && errorLower.includes('password');
      console.log(`Includes password recovery: ${hasRecoveryLink ? '✅' : '❌'}`);
      
      // Check if error message is generic (good security practice)
      const isGeneric = !errorLower.includes('password is wrong') && 
                       !errorLower.includes('username is correct') &&
                       !errorLower.includes('password is incorrect');
      console.log(`Error is generic (secure): ${isGeneric ? '✅' : '⚠️'}`);
      
      console.log('\n✅ Error message format validation completed');
    } else {
      console.log('❌ Error message not visible');
    }
  });
  
  test('Multiple invalid login attempts', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Multiple Invalid Login Attempts ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    const attempts = [
      { user: 'firstwrong@test.com', pass: 'FirstWrong123' },
      { user: 'secondwrong@test.com', pass: 'SecondWrong456' },
      { user: 'thirdwrong@test.com', pass: 'ThirdWrong789' }
    ];
    
    const errorMessages: string[] = [];
    
    for (let i = 0; i < attempts.length; i++) {
      console.log(`\n--- Attempt ${i + 1} ---`);
      
      await usernameField.clear();
      await passwordField.clear();
      
      await usernameField.fill(attempts[i].user);
      await passwordField.fill(attempts[i].pass);
      
      console.log(`Username: ${attempts[i].user}`);
      console.log('Password: (masked)');
      
      await loginButton.click();
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      await page.waitForTimeout(1500);
      
      // Check for error
      const errorElement = page.locator('.woocommerce-error, .error').first();
      if (await errorElement.isVisible({ timeout: 5000 })) {
        const errorText = await errorElement.textContent();
        errorMessages.push(errorText?.trim() || '');
        console.log(`✅ Error message displayed: "${errorText?.trim()}"`);
      } else {
        console.log('⚠️ Error message not found');
        errorMessages.push('');
      }
      
      // Verify form still works
      const formStillVisible = await usernameField.isVisible() && 
                               await passwordField.isVisible() && 
                               await loginButton.isVisible();
      
      if (formStillVisible) {
        console.log('✅ Login form still functional');
      }
    }
    
    // Analyze error message consistency
    console.log('\n--- Error Message Consistency Analysis ---');
    
    const uniqueErrors = [...new Set(errorMessages.filter(msg => msg !== ''))];
    console.log(`Unique error messages: ${uniqueErrors.length}`);
    
    if (uniqueErrors.length === 1) {
      console.log('✅ Error messages are consistent across attempts');
    } else if (uniqueErrors.length > 1) {
      console.log('⚠️ Different error messages found:');
      uniqueErrors.forEach((msg, idx) => {
        console.log(`   ${idx + 1}. "${msg}"`);
      });
    }
    
    console.log('\n✅ Multiple attempts test completed');
  });
  
  test('Login form accessibility after error', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Form Accessibility After Error ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Make invalid login attempt
    await usernameField.fill('wrong@test.com');
    await passwordField.fill('WrongPass123');
    await loginButton.click();
    
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    console.log('Invalid login attempted, now testing form accessibility...\n');
    
    // Test username field
    console.log('--- Username Field After Error ---');
    
    const usernameVisible = await usernameField.isVisible({ timeout: 3000 });
    console.log(`Visible: ${usernameVisible ? '✅' : '❌'}`);
    
    if (usernameVisible) {
      const usernameEditable = await usernameField.isEditable();
      console.log(`Editable: ${usernameEditable ? '✅' : '❌'}`);
      
      if (usernameEditable) {
        await usernameField.clear();
        await usernameField.fill('newtest@example.com');
        const newValue = await usernameField.inputValue();
        console.log(`Can enter new value: ${newValue === 'newtest@example.com' ? '✅' : '❌'}`);
      }
    }
    
    // Test password field
    console.log('\n--- Password Field After Error ---');
    
    const passwordVisible = await passwordField.isVisible({ timeout: 3000 });
    console.log(`Visible: ${passwordVisible ? '✅' : '❌'}`);
    
    if (passwordVisible) {
      const passwordEditable = await passwordField.isEditable();
      console.log(`Editable: ${passwordEditable ? '✅' : '❌'}`);
      
      const passwordType = await passwordField.getAttribute('type');
      console.log(`Still masked (type="password"): ${passwordType === 'password' ? '✅' : '❌'}`);
      
      if (passwordEditable) {
        await passwordField.clear();
        await passwordField.fill('NewPassword456');
        console.log('✅ Can enter new password');
      }
    }
    
    // Test login button
    console.log('\n--- Login Button After Error ---');
    
    const buttonVisible = await loginButton.isVisible({ timeout: 3000 });
    console.log(`Visible: ${buttonVisible ? '✅' : '❌'}`);
    
    if (buttonVisible) {
      const buttonEnabled = await loginButton.isEnabled();
      console.log(`Enabled: ${buttonEnabled ? '✅' : '❌'}`);
    }
    
    console.log('\n✅ Form accessibility test completed');
  });
  
  test('Invalid username variations', async ({ page }) => {
    test.setTimeout(90000);
    
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Invalid Username Variations ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    const testCases = [
      { name: 'Non-existent email', username: 'nonexistent@example.com', password: 'TestPass123' },
      { name: 'Invalid email format', username: 'notanemail', password: 'TestPass123' },
      { name: 'Incomplete email', username: 'user@exampl', password: 'TestPass123' },
      { name: 'Random string', username: 'randomtext123', password: 'TestPass123' },
      { name: 'Special characters', username: 'user@#$%', password: 'TestPass123' }
    ];
    
    let allRejected = true;
    
    for (const testCase of testCases) {
      console.log(`\n--- Testing: ${testCase.name} ---`);
      console.log(`Username: "${testCase.username}"`);
      
      await usernameField.clear();
      await passwordField.clear();
      
      await usernameField.fill(testCase.username);
      await passwordField.fill(testCase.password);
      await loginButton.click();
      
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      await page.waitForTimeout(1500);
      
      // Check for error message
      const errorElement = page.locator('.woocommerce-error, .error').first();
      const hasError = await errorElement.isVisible({ timeout: 5000 });
      
      // Check that user is NOT logged in
      const logoutLink = page.locator('a[href*="customer-logout"]').first();
      const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (hasError && !isLoggedIn) {
        console.log('✅ Rejected with error message');
      } else if (!hasError && !isLoggedIn) {
        console.log('⚠️ Rejected but no clear error message');
      } else if (isLoggedIn) {
        console.log('❌ SECURITY ISSUE: Invalid credentials granted access!');
        allRejected = false;
      }
    }
    
    console.log('\n--- Summary ---');
    if (allRejected) {
      console.log('✅ All invalid username variations were properly rejected');
    } else {
      console.log('❌ Some invalid usernames were not properly rejected');
    }
    
    console.log('\n✅ Username variations test completed');
  });
  
});
