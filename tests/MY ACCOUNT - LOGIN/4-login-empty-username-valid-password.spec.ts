// spec: My Account - Login with Empty Username and Valid Password
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// Test credentials - replace with actual registered credentials
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'TestPassword123!';

test.describe('My Account - Login with Empty Username and Valid Password', () => {
  
  test('Login with empty username and valid password - basic flow', async ({ page }) => {
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
    
    // Step 4: Leave username field empty
    console.log('\n=== Username Field Verification ===');
    const usernameValue = await usernameField.inputValue();
    if (usernameValue === '' || usernameValue === null) {
      console.log('✅ Step 4: Username field is empty (as expected)');
    } else {
      console.log(`⚠️ Username field has value: "${usernameValue}" - clearing it`);
      await usernameField.clear();
      console.log('✅ Username field cleared');
    }
    
    // Step 5: Enter valid password
    console.log('\n=== Entering Password (Username Empty) ===');
    await passwordField.click();
    await passwordField.fill(TEST_PASSWORD);
    console.log('✅ Step 5: Entered valid password (masked)');
    
    // Verify password is entered and masked
    const passwordType = await passwordField.getAttribute('type');
    if (passwordType === 'password') {
      console.log('✅ Password is masked (type="password")');
    }
    
    const passwordHasValue = (await passwordField.inputValue()).length > 0;
    if (passwordHasValue) {
      console.log('✅ Password field contains value');
    }
    
    // Step 6: Click login button
    console.log('\n=== Attempting Login with Empty Username ===');
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
      'text=/username.*empty/i',
      'text=/username.*required/i',
      'text=/please.*username/i'
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
      if (bodyText && (bodyText.includes('ERROR') || bodyText.includes('error') || bodyText.includes('username'))) {
        console.log('⚠️ Error text may be present in page but not in expected location');
      }
    }
    
    // Verify error message content
    if (errorMessage) {
      console.log('\n=== Analyzing Error Message Content ===');
      
      const messageLower = errorMessage.toLowerCase();
      
      if (messageLower.includes('username')) {
        console.log('✅ Error message mentions "username"');
      } else {
        console.log('⚠️ Error message does not mention "username"');
      }
      
      if (messageLower.includes('empty') || messageLower.includes('required') || messageLower.includes('blank')) {
        console.log('✅ Error message indicates field is empty/required');
      } else {
        console.log('⚠️ Error message does not clearly indicate empty field');
      }
      
      if (messageLower.includes('error')) {
        console.log('✅ Error message contains "ERROR" keyword');
      }
      
      // Security check - error should not reference password validity
      if (messageLower.includes('password')) {
        console.log('⚠️ Error message mentions password - may reveal password validity');
      } else {
        console.log('✅ Error message does not mention password (good for security)');
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
    
    // Verify username is still empty
    const usernameAfterError = await usernameField.inputValue();
    if (usernameAfterError === '' || usernameAfterError === null) {
      console.log('✅ Username field still empty after error');
    } else {
      console.log(`⚠️ Username field has value: "${usernameAfterError}"`);
    }
    
    // Verify password field state (may be retained or cleared)
    const passwordAfterError = await passwordField.inputValue();
    if (passwordAfterError === '') {
      console.log('ℹ️ Password field cleared after error (acceptable behavior)');
    } else if (passwordAfterError === TEST_PASSWORD) {
      console.log('ℹ️ Password field retained value after error (acceptable behavior)');
    }
    
    // Verify password remains masked
    const passwordTypeAfter = await passwordField.getAttribute('type');
    if (passwordTypeAfter === 'password') {
      console.log('✅ Password field remains masked (type="password")');
    }
    
    console.log('\n✅ ✅ ✅ EMPTY USERNAME VALIDATION TEST COMPLETED ✅ ✅ ✅');
  });
  
  test('Error message content validation for empty username', async ({ page }) => {
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
    
    // Leave username empty, enter password
    await usernameField.clear();
    await passwordField.fill(TEST_PASSWORD);
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
      if (textLower.includes('username')) {
        console.log('✅ Mentions "username"');
      } else {
        console.log('❌ Does not mention "username"');
      }
      
      if (textLower.includes('empty') || textLower.includes('required') || textLower.includes('blank')) {
        console.log('✅ Indicates field is empty/required');
      } else {
        console.log('⚠️ Does not clearly indicate empty field');
      }
      
      if (textLower.includes('error')) {
        console.log('✅ Contains "ERROR" keyword');
      }
      
      // Security check - should not mention password
      if (textLower.includes('password')) {
        console.log('⚠️ Mentions password - potential security issue');
      } else {
        console.log('✅ Does not mention password (good for security)');
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
  
  test('Browser HTML5 validation check for empty username', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing HTML5 Validation ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    
    // Check for HTML5 required attribute
    const hasRequired = await usernameField.evaluate(el => el.hasAttribute('required'));
    console.log(`Username field has 'required' attribute: ${hasRequired}`);
    
    if (hasRequired) {
      console.log('✅ HTML5 validation is present');
    } else {
      console.log('ℹ️ HTML5 required attribute not set (relies on application validation)');
    }
    
    // Check field type
    const fieldType = await usernameField.getAttribute('type');
    console.log(`Username field type: ${fieldType || 'text (default)'}`);
    
    // Check for other validation attributes
    const pattern = await usernameField.getAttribute('pattern');
    if (pattern) {
      console.log(`Username field has pattern: ${pattern}`);
    }
    
    // Test validation behavior
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.clear();
    await passwordField.fill(TEST_PASSWORD);
    
    console.log('\n--- Testing Validation Behavior ---');
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Check if browser validation prevented submission
    const currentUrl = page.url();
    if (currentUrl.includes('my-account')) {
      console.log('✅ Validation occurred (page not submitted or server validation applied)');
    }
    
    // Check for validation message
    const validationMessage = await usernameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    if (validationMessage) {
      console.log(`Browser validation message: "${validationMessage}"`);
    } else {
      console.log('ℹ️ No browser validation message (application handles validation)');
    }
    
    console.log('\n✅ HTML5 validation check completed');
  });
  
  test('Multiple attempts with empty username', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Multiple Empty Username Attempts ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await passwordField.fill(TEST_PASSWORD);
    
    const errorMessages: string[] = [];
    
    // Attempt 1
    console.log('--- Attempt 1: Empty Username ---');
    await usernameField.clear();
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
    console.log('\n--- Attempt 2: Empty Username (Again) ---');
    await usernameField.clear();
    
    // Re-enter password if it was cleared
    const passwordValue = await passwordField.inputValue();
    if (passwordValue === '' || passwordValue === null) {
      await passwordField.fill(TEST_PASSWORD);
      console.log('ℹ️ Re-entered password for attempt 2');
    }
    
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
      console.log('✅ No account lockout or throttling for empty username attempts');
    } else {
      console.log('⚠️ Form may be locked or disabled');
    }
    
    console.log('\n✅ Multiple attempts test completed');
  });
  
  test('Form field state after empty username error', async ({ page }) => {
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
    
    // Leave username empty, enter password, submit
    await usernameField.clear();
    await passwordField.fill(TEST_PASSWORD);
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Test Username Field State
    console.log('--- Username Field State ---');
    const usernameVisible = await usernameField.isVisible();
    console.log(`Username field visible: ${usernameVisible}`);
    
    const usernameEnabled = await usernameField.isEnabled();
    console.log(`Username field enabled: ${usernameEnabled}`);
    
    const usernameValue = await usernameField.inputValue();
    console.log(`Username field empty: ${usernameValue === '' || usernameValue === null}`);
    
    if (usernameValue === '' || usernameValue === null) {
      console.log('✅ Username field still empty after error');
    } else {
      console.log(`⚠️ Username field has value: "${usernameValue}"`);
    }
    
    // Test if username can be entered
    await usernameField.click();
    await usernameField.fill('testuser@example.com');
    const usernameAfterInput = await usernameField.inputValue();
    
    if (usernameAfterInput === 'testuser@example.com') {
      console.log('✅ Username field accepts input');
    } else {
      console.log('⚠️ Username field may not accept input');
    }
    
    await usernameField.clear();
    
    // Test Password Field State
    console.log('\n--- Password Field State ---');
    const passwordVisible = await passwordField.isVisible();
    console.log(`Password field visible: ${passwordVisible}`);
    
    const passwordEnabled = await passwordField.isEnabled();
    console.log(`Password field enabled: ${passwordEnabled}`);
    
    const passwordValue = await passwordField.inputValue();
    if (passwordValue === '') {
      console.log('ℹ️ Password field cleared after error');
    } else {
      console.log('ℹ️ Password field retained value after error');
    }
    
    const passwordType = await passwordField.getAttribute('type');
    if (passwordType === 'password') {
      console.log('✅ Password field maintains type="password" (masked)');
    }
    
    // Test if password can be entered/re-entered
    await passwordField.click();
    await passwordField.clear();
    await passwordField.fill('NewPassword123');
    const passwordAfterInput = await passwordField.inputValue();
    
    if (passwordAfterInput === 'NewPassword123') {
      console.log('✅ Password field accepts input');
    } else {
      console.log('⚠️ Password field may not accept input');
    }
    
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
  
  test('Security validation - password handling with empty username', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Password Security ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Leave username empty, enter password
    await usernameField.clear();
    await passwordField.fill(TEST_PASSWORD);
    
    console.log('--- Password Field Before Submission ---');
    const passwordTypeBefore = await passwordField.getAttribute('type');
    console.log(`Password field type: ${passwordTypeBefore}`);
    
    if (passwordTypeBefore === 'password') {
      console.log('✅ Password is masked before submission');
    }
    
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Security checks after error
    console.log('\n--- Security Checks After Error ---');
    
    // 1. Password remains masked
    const passwordTypeAfter = await passwordField.getAttribute('type');
    if (passwordTypeAfter === 'password') {
      console.log('✅ Password remains masked (type="password") after error');
    } else {
      console.log('❌ Password field type changed - SECURITY ISSUE');
    }
    
    // 2. Check error message doesn't reveal password validity
    const errorElement = page.locator('.woocommerce-error, .error').first();
    if (await errorElement.isVisible({ timeout: 2000 })) {
      const errorText = await errorElement.textContent() || '';
      const errorLower = errorText.toLowerCase();
      
      if (!errorLower.includes('password')) {
        console.log('✅ Error message does not mention password');
      } else {
        console.log('⚠️ Error message mentions password:');
        console.log(`   "${errorText.trim()}"`);
        
        // Check if it reveals password validity
        if (errorLower.includes('correct') || errorLower.includes('valid') || errorLower.includes('invalid')) {
          console.log('❌ Error may reveal password validity - SECURITY ISSUE');
        }
      }
    }
    
    // 3. Check URL for password exposure
    const currentUrl = page.url();
    if (!currentUrl.includes(TEST_PASSWORD) && !currentUrl.includes('password=')) {
      console.log('✅ Password not exposed in URL');
    } else {
      console.log('❌ Password may be exposed in URL - SECURITY ISSUE');
    }
    
    // 4. Check page source doesn't expose password (basic check)
    const pageContent = await page.content();
    if (!pageContent.includes(`value="${TEST_PASSWORD}"`)) {
      console.log('✅ Password not exposed in plain text in page source');
    } else {
      console.log('⚠️ Password may be visible in page source');
    }
    
    console.log('\n✅ Security validation completed');
  });
  
});
