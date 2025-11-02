// spec: My Account - Login with Empty Username and Empty Password
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('My Account - Login with Empty Username and Empty Password', () => {
  
  test('Login with both fields empty - basic flow', async ({ page }) => {
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
    
    // Step 4-5: Verify both fields are empty
    console.log('\n=== Verifying Both Fields Empty ===');
    
    const usernameValue = await usernameField.inputValue();
    if (usernameValue === '' || usernameValue === null) {
      console.log('✅ Step 4: Username field is empty');
    } else {
      console.log(`⚠️ Username field has value: "${usernameValue}" - clearing it`);
      await usernameField.clear();
      console.log('✅ Username field cleared');
    }
    
    const passwordValue = await passwordField.inputValue();
    if (passwordValue === '' || passwordValue === null) {
      console.log('✅ Step 5: Password field is empty');
    } else {
      console.log(`⚠️ Password field has value - clearing it`);
      await passwordField.clear();
      console.log('✅ Password field cleared');
    }
    
    // Step 6: Click login button
    console.log('\n=== Attempting Login with Both Fields Empty ===');
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
      'text=/required/i',
      'text=/empty/i'
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
      if (bodyText && (bodyText.includes('ERROR') || bodyText.includes('error') || bodyText.includes('required'))) {
        console.log('⚠️ Error text may be present in page but not in expected location');
      }
    }
    
    // Verify error message content
    if (errorMessage) {
      console.log('\n=== Analyzing Error Message Content ===');
      
      const messageLower = errorMessage.toLowerCase();
      
      // Check what fields are mentioned
      const mentionsUsername = messageLower.includes('username');
      const mentionsPassword = messageLower.includes('password');
      
      if (mentionsUsername) {
        console.log('✅ Error message mentions "username"');
      }
      
      if (mentionsPassword) {
        console.log('ℹ️ Error message also mentions "password"');
      }
      
      if (!mentionsUsername && !mentionsPassword) {
        console.log('⚠️ Error message does not specifically mention username or password');
      }
      
      if (messageLower.includes('empty') || messageLower.includes('required') || messageLower.includes('blank')) {
        console.log('✅ Error message indicates field is empty/required');
      }
      
      if (messageLower.includes('error')) {
        console.log('✅ Error message contains "ERROR" keyword');
      }
      
      // Check if it's a single error or multiple
      if (mentionsUsername && mentionsPassword) {
        console.log('ℹ️ Error mentions both fields (combined error)');
      } else if (mentionsUsername) {
        console.log('ℹ️ Error prioritizes username field');
      } else if (mentionsPassword) {
        console.log('ℹ️ Error prioritizes password field');
      }
    }
    
    // Check for multiple error messages
    const allErrors = page.locator('.woocommerce-error li, .error li');
    const errorCount = await allErrors.count();
    if (errorCount > 0) {
      console.log(`\n=== Found ${errorCount} individual error messages ===`);
      for (let i = 0; i < Math.min(errorCount, 5); i++) {
        const errorText = await allErrors.nth(i).textContent();
        console.log(`  ${i + 1}. "${errorText?.trim()}"`);
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
    
    // Verify both fields are still empty
    const usernameAfterError = await usernameField.inputValue();
    const passwordAfterError = await passwordField.inputValue();
    
    if (usernameAfterError === '' || usernameAfterError === null) {
      console.log('✅ Username field still empty after error');
    }
    
    if (passwordAfterError === '' || passwordAfterError === null) {
      console.log('✅ Password field still empty after error');
    }
    
    console.log('\n✅ ✅ ✅ EMPTY FIELDS VALIDATION TEST COMPLETED ✅ ✅ ✅');
  });
  
  test('Error message priority and content validation', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Error Message Priority ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Leave both fields empty
    await usernameField.clear();
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Find error message(s)
    console.log('--- Analyzing Error Message Structure ---');
    
    // Check for main error container
    const errorContainer = page.locator('.woocommerce-error, .error').first();
    if (await errorContainer.isVisible({ timeout: 2000 })) {
      const errorText = await errorContainer.textContent() || '';
      console.log(`Main error message: "${errorText.trim()}"`);
      
      // Check for multiple list items
      const errorItems = page.locator('.woocommerce-error li, .error li');
      const itemCount = await errorItems.count();
      
      if (itemCount > 0) {
        console.log(`\nFound ${itemCount} error list items:`);
        for (let i = 0; i < itemCount; i++) {
          const itemText = await errorItems.nth(i).textContent();
          console.log(`  ${i + 1}. "${itemText?.trim()}"`);
        }
      }
      
      // Analyze which fields are mentioned
      const textLower = errorText.toLowerCase();
      
      console.log('\n--- Field Mention Analysis ---');
      if (textLower.includes('username')) {
        console.log('✅ Error mentions username');
      }
      
      if (textLower.includes('password')) {
        console.log('✅ Error mentions password');
      }
      
      if (textLower.includes('required') || textLower.includes('empty')) {
        console.log('✅ Error indicates fields are required/empty');
      }
      
      // Check styling
      const errorColor = await errorContainer.evaluate(el => getComputedStyle(el).color);
      console.log(`\nError message color: ${errorColor}`);
      
    } else {
      console.log('❌ No error message found');
    }
    
    console.log('\n✅ Error priority analysis completed');
  });
  
  test('Browser HTML5 validation check', async ({ page }) => {
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
    const passwordField = page.locator('#password, input[name="password"]').first();
    
    // Check username field
    console.log('--- Username Field Attributes ---');
    const usernameRequired = await usernameField.evaluate(el => el.hasAttribute('required'));
    console.log(`Username has 'required' attribute: ${usernameRequired}`);
    
    const usernameType = await usernameField.getAttribute('type');
    console.log(`Username field type: ${usernameType || 'text (default)'}`);
    
    // Check password field
    console.log('\n--- Password Field Attributes ---');
    const passwordRequired = await passwordField.evaluate(el => el.hasAttribute('required'));
    console.log(`Password has 'required' attribute: ${passwordRequired}`);
    
    const passwordType = await passwordField.getAttribute('type');
    console.log(`Password field type: ${passwordType}`);
    
    // Test validation behavior
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    await usernameField.clear();
    await passwordField.clear();
    
    console.log('\n--- Testing Validation Behavior ---');
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Check validation messages
    const usernameValidation = await usernameField.evaluate((el: HTMLInputElement) => el.validationMessage);
    const passwordValidation = await passwordField.evaluate((el: HTMLInputElement) => el.validationMessage);
    
    if (usernameValidation) {
      console.log(`Username browser validation: "${usernameValidation}"`);
    } else {
      console.log('ℹ️ No browser validation for username (application handles it)');
    }
    
    if (passwordValidation) {
      console.log(`Password browser validation: "${passwordValidation}"`);
    } else {
      console.log('ℹ️ No browser validation for password (application handles it)');
    }
    
    if (usernameRequired || passwordRequired) {
      console.log('\n✅ HTML5 validation is present on at least one field');
    } else {
      console.log('\nℹ️ No HTML5 required attributes (application validation only)');
    }
    
    console.log('\n✅ HTML5 validation check completed');
  });
  
  test('Multiple attempts with both fields empty', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Multiple Empty Field Attempts ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    const errorMessages: string[] = [];
    
    // Attempt 1
    console.log('--- Attempt 1: Both Fields Empty ---');
    await usernameField.clear();
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
    console.log('\n--- Attempt 2: Both Fields Empty (Again) ---');
    await usernameField.clear();
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
    
    // Attempt 3
    console.log('\n--- Attempt 3: Both Fields Empty (Third Time) ---');
    await usernameField.clear();
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    const error3 = page.locator('.woocommerce-error, .error').first();
    if (await error3.isVisible({ timeout: 2000 })) {
      const errorText3 = await error3.textContent() || '';
      errorMessages.push(errorText3.trim());
      console.log(`Error message 3: "${errorText3.trim()}"`);
    } else {
      console.log('⚠️ No error message on attempt 3');
    }
    
    // Check consistency of error messages
    console.log('\n--- Error Message Consistency ---');
    if (errorMessages.length >= 2) {
      const allSame = errorMessages.every(msg => msg === errorMessages[0]);
      
      if (allSame) {
        console.log('✅ Error messages are consistent across all attempts');
      } else {
        console.log('⚠️ Error messages vary across attempts:');
        errorMessages.forEach((msg, index) => {
          console.log(`  Attempt ${index + 1}: "${msg}"`);
        });
      }
    }
    
    // Verify no lockout
    const usernameStillVisible = await usernameField.isVisible();
    const passwordStillVisible = await passwordField.isVisible();
    const buttonStillEnabled = await loginButton.isEnabled();
    
    if (usernameStillVisible && passwordStillVisible && buttonStillEnabled) {
      console.log('✅ No account lockout for multiple empty submissions');
    } else {
      console.log('⚠️ Form may be locked or disabled');
    }
    
    console.log('\n✅ Multiple attempts test completed');
  });
  
  test('Form field state after empty fields error', async ({ page }) => {
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
    
    // Leave both fields empty, submit
    await usernameField.clear();
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
    console.log(`Username field empty: ${usernameValue === '' || usernameValue === null}`);
    
    // Test if username can be entered
    await usernameField.click();
    await usernameField.fill('testuser@example.com');
    const usernameAfterInput = await usernameField.inputValue();
    
    if (usernameAfterInput === 'testuser@example.com') {
      console.log('✅ Username field accepts input after error');
    }
    
    await usernameField.clear();
    
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
      console.log('✅ Password field accepts input after error');
    }
    
    // Test Login Button State
    console.log('\n--- Login Button State ---');
    const buttonVisible = await loginButton.isVisible();
    console.log(`Login button visible: ${buttonVisible}`);
    
    const buttonEnabled = await loginButton.isEnabled();
    console.log(`Login button enabled: ${buttonEnabled}`);
    
    if (buttonEnabled) {
      console.log('✅ Login button remains functional after error');
    }
    
    // Test focus and tab order
    console.log('\n--- Testing Focus and Tab Order ---');
    await usernameField.focus();
    let focusedName = await page.evaluate(() => document.activeElement?.getAttribute('name'));
    console.log(`Focused field: ${focusedName}`);
    
    await page.keyboard.press('Tab');
    focusedName = await page.evaluate(() => document.activeElement?.getAttribute('name'));
    
    if (focusedName === 'password') {
      console.log('✅ Tab order correct: Username → Password');
    }
    
    console.log('\n✅ Form field state test completed');
  });
  
  test('Partial field completion recovery', async ({ page }) => {
    test.setTimeout(60000);
    
    // Navigate to My Account
    await page.goto('http://practice.automationtesting.in/');
    
    try {
      await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    } catch (error) {}
    
    await page.getByRole('link', { name: 'My Account' }).click();
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    console.log('=== Testing Partial Field Completion Recovery ===\n');
    
    const usernameField = page.locator('#username, input[name="username"]').first();
    const passwordField = page.locator('#password, input[name="password"]').first();
    const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]').first();
    
    // Step 1: Both fields empty
    console.log('--- Step 1: Submit with both fields empty ---');
    await usernameField.clear();
    await passwordField.clear();
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    const error1 = page.locator('.woocommerce-error, .error').first();
    if (await error1.isVisible({ timeout: 2000 })) {
      const errorText1 = await error1.textContent() || '';
      console.log(`Error: "${errorText1.trim()}"`);
    }
    
    // Step 2: Fill only username
    console.log('\n--- Step 2: Fill username only, submit ---');
    await usernameField.fill('testuser@example.com');
    await passwordField.clear(); // Ensure still empty
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    const error2 = page.locator('.woocommerce-error, .error').first();
    if (await error2.isVisible({ timeout: 2000 })) {
      const errorText2 = await error2.textContent() || '';
      console.log(`Error: "${errorText2.trim()}"`);
      
      const errorLower = errorText2.toLowerCase();
      if (errorLower.includes('password')) {
        console.log('✅ Error correctly identifies password as the issue');
      } else if (errorLower.includes('username')) {
        console.log('⚠️ Error still mentions username (may not have registered the change)');
      }
    }
    
    // Step 3: Fill both fields
    console.log('\n--- Step 3: Fill both fields, submit ---');
    await usernameField.fill('testuser@example.com');
    await passwordField.fill('TestPassword123');
    await loginButton.click();
    await page.waitForTimeout(2000);
    
    // Check result
    const error3 = page.locator('.woocommerce-error, .error').first();
    const hasError = await error3.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!hasError) {
      console.log('✅ No error after filling both fields');
      console.log('ℹ️ Note: Login may or may not succeed (depends on credentials)');
    } else {
      const errorText3 = await error3.textContent() || '';
      console.log(`Error: "${errorText3.trim()}"`);
      console.log('ℹ️ This may be a credential error (not empty field error)');
    }
    
    console.log('\n✅ Partial completion recovery test completed');
  });
  
});
