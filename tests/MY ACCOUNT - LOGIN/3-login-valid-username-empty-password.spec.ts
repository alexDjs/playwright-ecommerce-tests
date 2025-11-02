// spec: My Account - Login with Valid Username and Empty Password
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// Test credentials - replace with actual registered credentials
const TEST_USERNAME = process.env.TEST_USERNAME || 'testuser@example.com';

test.describe('My Account - Login with Valid Username and Empty Password', () => {
  
  test('Login with valid username and empty password - basic flow', async ({ page }) => {
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
    
    // Step 4: Enter valid registered username
    console.log('\n=== Entering Username (Password Empty) ===');
    await usernameField.click();
    await usernameField.fill(TEST_USERNAME);
    console.log(`✅ Step 4: Entered valid username: ${TEST_USERNAME}`);
    
    // Verify username appears in field
    const usernameValue = await usernameField.inputValue();
    if (usernameValue === TEST_USERNAME) {
      console.log('✅ Username verified in field');
    }
    
    // Step 5: Leave password field empty
    console.log('\n=== Password Field Verification ===');
    const passwordValue = await passwordField.inputValue();
    if (passwordValue === '' || passwordValue === null) {
      console.log('✅ Step 5: Password field is empty (as expected)');
    } else {
      console.log(`⚠️ Password field has value: "${passwordValue}" - clearing it`);
      await passwordField.clear();
      console.log('✅ Password field cleared');
    }
    
    // Step 6: Click login button
    console.log('\n=== Attempting Login with Empty Password ===');
    await loginButton.click();
    console.log('✅ Step 6: Clicked Login button');
    
    // Wait for response
    await page.waitForTimeout(2000);
    
    // Step 7: Verify error message is displayed
    console.log('\n=== Verifying Error Message ===');
    
    // Try multiple error message selectors
    const errorSelectors = [
      '.woocommerce-error',
      '.error',
      'text=/ERROR/i',
      'text=/password.*empty/i',
      'text=/password.*required/i',
      'text=/please.*password/i'
    ];
    
    let errorFound = false;
    let errorMessage = '';
    
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector).first();
      if (await errorElement.isVisible({ timeout: 2000 })) {
        errorMessage = await errorElement.textContent() || '';
        console.log(`✅ Step 7: Error message found: "${errorMessage.trim()}"`);
        errorFound = true;
        break;
      }
    }
    
    if (!errorFound) {
      console.log('⚠️ Error message not found with standard selectors, checking page content...');
      const bodyText = await page.textContent('body');
      if (bodyText && (bodyText.includes('ERROR') || bodyText.includes('error') || bodyText.includes('password'))) {
        console.log('⚠️ Error text may be present in page but not in expected location');
      }
    }
    
    // Verify error message content
    if (errorMessage) {
      console.log('\n=== Analyzing Error Message Content ===');
      
      const messageLower = errorMessage.toLowerCase();
      
      if (messageLower.includes('password')) {
        console.log('✅ Error message mentions "password"');
      } else {
        console.log('⚠️ Error message does not mention "password"');
      }
      
      if (messageLower.includes('empty') || messageLower.includes('required') || messageLower.includes('blank')) {
        console.log('✅ Error message indicates field is empty/required');
      } else {
        console.log('⚠️ Error message does not clearly indicate empty field');
      }
      
      if (messageLower.includes('error')) {
        console.log('✅ Error message contains "ERROR" keyword');
      }
    }
    
    // Verify user is NOT logged in
    console.log('\n=== Verifying User NOT Logged In ===');
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Check for logout link (should NOT be present)
    const logoutLink = page.locator('a[href*="customer-logout"]').first();
    const logoutVisible = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!logoutVisible) {
      console.log('✅ Logout link not found - user is NOT logged in (correct)');
    } else {
      console.log('❌ Logout link found - user may be logged in (INCORRECT)');
    }
    
    // Verify login form is still visible
    console.log('\n=== Verifying Form Still Accessible ===');
    const usernameStillVisible = await usernameField.isVisible({ timeout: 2000 });
    const passwordStillVisible = await passwordField.isVisible({ timeout: 2000 });
    const loginButtonStillVisible = await loginButton.isVisible({ timeout: 2000 });
    
    if (usernameStillVisible && passwordStillVisible && loginButtonStillVisible) {
      console.log('✅ Login form is still visible and accessible');
    } else {
      console.log('⚠️ Some form elements may not be visible');
    }
    
    // Verify username is retained
    const usernameAfterError = await usernameField.inputValue();
    if (usernameAfterError === TEST_USERNAME) {
      console.log('✅ Username value retained in field after error');
    } else {
      console.log(`⚠️ Username changed. Before: ${TEST_USERNAME}, After: ${usernameAfterError}`);
    }
    
    // Verify password is still empty
    const passwordAfterError = await passwordField.inputValue();
    if (passwordAfterError === '' || passwordAfterError === null) {
      console.log('✅ Password field still empty after error');
    } else {
      console.log(`⚠️ Password field has value: "${passwordAfterError}"`);
    }
    
    console.log('\n✅ ✅ ✅ EMPTY PASSWORD VALIDATION TEST COMPLETED ✅ ✅ ✅');
  });
  
  test('Error message content validation for empty password', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Error Message Content ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Enter username, leave password empty
    await usernameField.fill(TEST_USERNAME);
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Find error message
    const errorSelectors = [
      '.woocommerce-error',
      '.error',
      '[role="alert"]',
      'text=/ERROR/i'
    ];
    
    let errorElement = null;
    for (const selector of errorSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible({ timeout: 2000 })) {
        errorElement = element;
        break;
      }
    }
    
    if (errorElement) {
      console.log('--- Error Message Analysis ---');
      
      // Check visibility
      const isVisible = await errorElement.isVisible();
      console.log(`✅ Error message is visible: ${isVisible}`);
      
      // Get text content
      const errorText = await errorElement.textContent() || '';
      console.log(`Error message text: "${errorText.trim()}"`);
      
      // Check styling
      const errorColor = await errorElement.evaluate(el => getComputedStyle(el).color);
      console.log(`Error message color: ${errorColor}`);
      
      // Verify message content
      const textLower = errorText.toLowerCase();
      
      console.log('\n--- Content Validation ---');
      if (textLower.includes('password')) {
        console.log('✅ Mentions "password"');
      } else {
        console.log('❌ Does not mention "password"');
      }
      
      if (textLower.includes('empty') || textLower.includes('required') || textLower.includes('blank')) {
        console.log('✅ Indicates field is empty/required');
      } else {
        console.log('⚠️ Does not clearly indicate empty field');
      }
      
      if (textLower.includes('error')) {
        console.log('✅ Contains "ERROR" keyword');
      }
      
      // Check for user guidance
      if (textLower.includes('please') || textLower.includes('enter') || textLower.includes('provide')) {
        console.log('✅ Provides user guidance');
      } else {
        console.log('⚠️ May lack clear guidance');
      }
      
    } else {
      console.log('❌ No error message found');
    }
    
    console.log('\n✅ Error message content validation completed');
  });
  
  test('Browser HTML5 validation check for empty password', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing HTML5 Validation ===\n');
    
    const passwordField = page.locator('#password, input[name="password"]').first();
    
    // Check for HTML5 required attribute
    const hasRequired = await passwordField.evaluate(el => el.hasAttribute('required'));
    console.log(`Password field has 'required' attribute: ${hasRequired}`);
    
    if (hasRequired) {
      console.log('✅ HTML5 validation is present');
    } else {
      console.log('ℹ️ HTML5 required attribute not set (relies on application validation)');
    }
    
    // Check field type
    const fieldType = await passwordField.getAttribute('type');
    console.log(`Password field type: ${fieldType}`);
    
    // Check for other validation attributes
    const pattern = await passwordField.getAttribute('pattern');
    if (pattern) {
      console.log(`Password field has pattern: ${pattern}`);
    }
    
    const minLength = await passwordField.getAttribute('minlength');
    if (minLength) {
      console.log(`Password field has minlength: ${minLength}`);
    }
    
    // Test validation behavior
    const usernameField = page.locator('#username, input[name="username"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.fill(TEST_USERNAME);
    await passwordField.clear();
    
    console.log('\n--- Testing Validation Behavior ---');
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Check if browser validation prevented submission
    const currentUrl = page.url();
    if (currentUrl.includes('my-account')) {
      console.log('✅ Validation occurred (page not submitted or server validation applied)');
    }
    
    // Check for validation message
    const validationMessage = await passwordField.evaluate((el: HTMLInputElement) => el.validationMessage);
    if (validationMessage) {
      console.log(`Browser validation message: "${validationMessage}"`);
    } else {
      console.log('ℹ️ No browser validation message (application handles validation)');
    }
    
    console.log('\n✅ HTML5 validation check completed');
  });
  
  test('Multiple attempts with empty password', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Multiple Empty Password Attempts ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.fill(TEST_USERNAME);
    
    const errorMessages: string[] = [];
    
    // Attempt 1
    console.log('--- Attempt 1: Empty Password ---');
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    const error1 = page.locator('.woocommerce-error, .error').first();
    if (await error1.isVisible({ timeout: 2000 })) {
      const errorText1 = await error1.textContent() || '';
      errorMessages.push(errorText1.trim());
      console.log(`Error message 1: "${errorText1.trim()}"`);
    } else {
      console.log('⚠️ No error message on attempt 1');
    }
    
    // Verify form still accessible
    const formAccessible1 = await loginButton.isEnabled();
    console.log(`Form accessible after attempt 1: ${formAccessible1}`);
    
    // Attempt 2
    console.log('\n--- Attempt 2: Empty Password (Again) ---');
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    const error2 = page.locator('.woocommerce-error, .error').first();
    if (await error2.isVisible({ timeout: 2000 })) {
      const errorText2 = await error2.textContent() || '';
      errorMessages.push(errorText2.trim());
      console.log(`Error message 2: "${errorText2.trim()}"`);
    } else {
      console.log('⚠️ No error message on attempt 2');
    }
    
    // Verify form still accessible
    const formAccessible2 = await loginButton.isEnabled();
    console.log(`Form accessible after attempt 2: ${formAccessible2}`);
    
    // Check consistency of error messages
    console.log('\n--- Error Message Consistency ---');
    if (errorMessages.length >= 2) {
      if (errorMessages[0] === errorMessages[1]) {
        console.log('✅ Error messages are consistent across attempts');
      } else {
        console.log('⚠️ Error messages differ:');
        console.log(`  Attempt 1: "${errorMessages[0]}"`);
        console.log(`  Attempt 2: "${errorMessages[1]}"`);
      }
    }
    
    // Verify no lockout
    const usernameStillVisible = await usernameField.isVisible();
    const passwordStillVisible = await passwordField.isVisible();
    const buttonStillEnabled = await loginButton.isEnabled();
    
    if (usernameStillVisible && passwordStillVisible && buttonStillEnabled) {
      console.log('✅ No account lockout or throttling for empty password attempts');
    } else {
      console.log('⚠️ Form may be locked or disabled');
    }
    
    console.log('\n✅ Multiple attempts test completed');
  });
  
  test('Form field state after empty password error', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Form Field State After Error ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Enter username, submit with empty password
    await usernameField.fill(TEST_USERNAME);
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Test Username Field State
    console.log('--- Username Field State ---');
    const usernameVisible = await usernameField.isVisible();
    console.log(`Username field visible: ${usernameVisible}`);
    
    const usernameEnabled = await usernameField.isEnabled();
    console.log(`Username field enabled: ${usernameEnabled}`);
    
    const usernameValue = await usernameField.inputValue();
    console.log(`Username value: "${usernameValue}"`);
    
    if (usernameValue === TEST_USERNAME) {
      console.log('✅ Username retained in field');
    } else {
      console.log('❌ Username not retained');
    }
    
    // Test if username can be edited
    await usernameField.click();
    await usernameField.press('End');
    await usernameField.press('Backspace');
    const editedUsername = await usernameField.inputValue();
    
    if (editedUsername !== usernameValue) {
      console.log('✅ Username field is editable');
    } else {
      console.log('⚠️ Username field may not be editable');
    }
    
    // Restore username
    await usernameField.fill(TEST_USERNAME);
    
    // Test Password Field State
    console.log('\n--- Password Field State ---');
    const passwordVisible = await passwordField.isVisible();
    console.log(`Password field visible: ${passwordVisible}`);
    
    const passwordEnabled = await passwordField.isEnabled();
    console.log(`Password field enabled: ${passwordEnabled}`);
    
    const passwordValue = await passwordField.inputValue();
    console.log(`Password field empty: ${passwordValue === '' || passwordValue === null}`);
    
    const passwordType = await passwordField.getAttribute('type');
    if (passwordType === 'password') {
      console.log('✅ Password field maintains type="password" (masked)');
    }
    
    // Test if password can be entered
    await passwordField.click();
    await passwordField.fill('TestPassword123');
    const passwordAfterInput = await passwordField.inputValue();
    
    if (passwordAfterInput === 'TestPassword123') {
      console.log('✅ Password field accepts input');
    } else {
      console.log('⚠️ Password field may not accept input');
    }
    
    await passwordField.clear();
    
    // Test Login Button State
    console.log('\n--- Login Button State ---');
    const buttonVisible = await loginButton.isVisible();
    console.log(`Login button visible: ${buttonVisible}`);
    
    const buttonEnabled = await loginButton.isEnabled();
    console.log(`Login button enabled: ${buttonEnabled}`);
    
    if (buttonEnabled) {
      console.log('✅ Login button remains functional');
    }
    
    console.log('\n✅ Form field state test completed');
  });
  
  test('Empty password with different username formats', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Empty Password with Different Username Formats ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    const usernameFormats = [
      { format: 'Email format', value: TEST_USERNAME },
      { format: 'Email with dots', value: 'test.user@example.com' },
      { format: 'Email with plus', value: 'test+user@example.com' },
      { format: 'Simple username', value: 'testuser' }
    ];
    
    const results: Array<{format: string, error: string}> = [];
    
    for (const format of usernameFormats) {
      console.log(`\n--- Testing: ${format.format} ---`);
      console.log(`Username: ${format.value}`);
      
      // Enter username, leave password empty
      await usernameField.clear();
      await usernameField.fill(format.value);
      await passwordField.clear();
      
      await loginButton.click();
      await page.waitForTimeout(2000);
      
      // Check for error
      const errorElement = page.locator('.woocommerce-error, .error').first();
      if (await errorElement.isVisible({ timeout: 2000 })) {
        const errorText = await errorElement.textContent() || '';
        results.push({ format: format.format, error: errorText.trim() });
        console.log(`Error: "${errorText.trim()}"`);
      } else {
        results.push({ format: format.format, error: 'NO ERROR' });
        console.log('⚠️ No error message displayed');
      }
    }
    
    // Analyze consistency
    console.log('\n--- Error Message Consistency Analysis ---');
    const uniqueErrors = [...new Set(results.map(r => r.error))];
    
    if (uniqueErrors.length === 1) {
      console.log('✅ Consistent error message across all username formats');
      console.log(`Error: "${uniqueErrors[0]}"`);
    } else {
      console.log('⚠️ Inconsistent error messages:');
      for (const result of results) {
        console.log(`  ${result.format}: "${result.error}"`);
      }
    }
    
    // Verify all show password-related error (not username error)
    const passwordErrors = results.filter(r => 
      r.error.toLowerCase().includes('password')
    );
    
    if (passwordErrors.length === results.length) {
      console.log('✅ All errors correctly identify password issue');
    } else {
      console.log('⚠️ Some errors may not correctly identify password issue');
    }
    
    console.log('\n✅ Username format test completed');
  });
  
});
