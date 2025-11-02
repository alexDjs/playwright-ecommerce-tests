# Test Plan 02: My Account - Login with Incorrect Credentials

## Test Plan Information

**Test Plan ID:** TP-MA-LOGIN-002  
**Test Plan Name:** My Account - Login with Incorrect Username and Password  
**Application:** Practice Automation Testing Website  
**Module:** User Authentication - My Account Login - Negative Testing  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website implements user authentication with security validation. This test plan focuses on **negative testing** of the login functionality, verifying that the system properly rejects invalid credentials and displays appropriate error messages to guide users.

### Key Features Tested:
- **Invalid Credentials Rejection**: System refuses incorrect username/password
- **Error Message Display**: Clear error messages shown
- **Security Validation**: Authentication properly validates credentials
- **User Guidance**: Error messages guide user to retry
- **Form Persistence**: Login form remains accessible after error
- **No Unauthorized Access**: Invalid credentials don't grant access

---

## Test Objectives

1. **Validate Invalid Credential Rejection**: Verify incorrect credentials are rejected
2. **Test Error Message Display**: Ensure appropriate error messages appear
3. **Verify Security**: Confirm no access granted with invalid credentials
4. **Test Error Message Content**: Validate error message clarity and accuracy
5. **Verify Form State After Error**: Ensure user can retry login

---

## Scope

### In Scope:
- Login with completely incorrect username and password
- Login with incorrect username, correct password
- Login with correct username, incorrect password
- Login with non-existent username
- Login with wrong password format
- Error message display and content
- Error message visibility and clarity
- Form accessibility after error
- Ability to retry login after error
- No unauthorized access verification

### Out of Scope:
- SQL injection testing
- XSS (Cross-Site Scripting) testing
- Brute force attack prevention
- Account lockout after multiple attempts
- CAPTCHA testing
- Password reset functionality
- Rate limiting testing
- Session hijacking
- Security penetration testing

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - My Account page functional

---

## Test Data

### Invalid Credentials Sets:

**Test Set 1 - Both Incorrect:**
```
Username: wronguser@example.com
Password: WrongPassword123!
Expected: "Invalid username" or "Incorrect credentials" error
```

**Test Set 2 - Non-existent User:**
```
Username: nonexistent@test.com
Password: AnyPassword456!
Expected: "Invalid username" or "Unknown email" error
```

**Test Set 3 - Invalid Email Format:**
```
Username: notanemail
Password: TestPass789!
Expected: Error about invalid username or credentials
```

**Test Set 4 - Empty Credentials:**
```
Username: (empty)
Password: (empty)
Expected: Required field errors
```

**Test Set 5 - Random Invalid Data:**
```
Username: randomstring123
Password: randompass456
Expected: Invalid credentials error
```

---

## Test Scenarios

### Scenario 1: Login with Incorrect Username and Incorrect Password

**Test Case ID:** TC-MA-LOGIN-002.1  
**Priority:** Critical  
**Type:** Negative Functional Testing  

**Objective:**  
Verify that the system rejects login attempts with completely incorrect username and password, and displays an appropriate error message.

**Preconditions:**
- Browser is open
- Website is accessible
- User is not currently logged in

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Handle consent dialog (if present)
4. Click on "My Account" menu
5. Verify navigation to My Account/login page
6. Verify login form is visible
7. Locate username input field
8. Enter incorrect username: "wronguser@example.com"
9. Verify incorrect username appears in field
10. Locate password input field
11. Enter incorrect password: "WrongPassword123!"
12. Verify password is masked
13. Click "Login" button
14. Wait for authentication attempt
15. Verify error message is displayed
16. Verify error message content:
    - Contains "Invalid username" or "Incorrect" or "Error"
    - Message is clear and understandable
    - Message indicates login failed
17. Verify user is NOT logged in:
    - Still on login page or redirected back
    - No "Logout" link visible
    - Login form still accessible
    - No access to account dashboard
18. Verify login form is still functional:
    - Username field is editable
    - Password field is editable
    - Login button is still enabled
19. Verify user can retry login:
    - Form fields can be cleared
    - New credentials can be entered

**Expected Results:**
- Login attempt is rejected
- Error message is displayed clearly:
  - "ERROR: Invalid username" or
  - "ERROR: Incorrect username or password" or
  - Similar clear error message
- Error message is prominently visible (red color, highlighted)
- User remains on login page
- No access to account area granted
- Login form remains accessible
- User can see the error and retry
- No logout option visible (user not logged in)
- No account dashboard accessible

**Pass Criteria:**
- ✅ Login with incorrect credentials is rejected
- ✅ Error message is displayed
- ✅ Error message mentions "Invalid" or "Incorrect" or "Error"
- ✅ Error message is visible and clear
- ✅ User is NOT logged in
- ✅ No access to account features
- ✅ Login form remains functional
- ✅ User can retry login

**Fail Criteria:**
- ❌ Login succeeds with incorrect credentials (critical security issue)
- ❌ No error message displayed
- ❌ Error message is unclear or confusing
- ❌ Error message is not visible
- ❌ User gains access to account
- ❌ Login form becomes inaccessible
- ❌ Cannot retry login
- ❌ Application crashes or errors

---

### Scenario 2: Error Message Content and Format Validation

**Test Case ID:** TC-MA-LOGIN-002.2  
**Priority:** High  
**Type:** Negative Functional Testing  

**Objective:**  
Verify that error messages displayed for invalid login attempts are properly formatted, clearly visible, and provide helpful guidance to the user.

**Preconditions:**
- On My Account login page

**Test Steps:**

1. Navigate to My Account login page
2. Enter incorrect username: "invaliduser@test.com"
3. Enter incorrect password: "InvalidPass123"
4. Click Login button
5. Wait for error message to appear
6. Verify error message characteristics:
   - **Visibility**: Error is prominently displayed
   - **Color**: Typically red or error color
   - **Position**: Near login form (above or below)
   - **Icon**: May have error icon or symbol
7. Verify error message text:
   - Contains keywords: "Invalid", "Incorrect", "Error", "Wrong"
   - Mentions "username" or "credentials" or "password"
   - Is grammatically correct
   - Is easy to understand
8. Verify error message does NOT:
   - Reveal security information (e.g., "password is wrong but username is correct")
   - Display sensitive data
   - Provide too much detail that aids attackers
9. Verify error message format:
   - Proper font size (readable)
   - Proper styling (stands out)
   - Not hidden or obscured
10. Verify error message persistence:
    - Remains visible until user takes action
    - Doesn't disappear too quickly

**Expected Results:**
- Error message is prominently displayed
- Message is in error styling (red color, bold, etc.)
- Message appears near login form
- Common error formats:
  - "ERROR: Invalid username. Lost your password?"
  - "ERROR: The username or password you entered is incorrect."
  - "Invalid username or password"
- Message is clear and user-friendly
- Message doesn't reveal sensitive security info
- Message is properly formatted and styled
- Error remains visible for user to read

**Pass Criteria:**
- ✅ Error message is clearly visible
- ✅ Message is in error styling (red/highlighted)
- ✅ Message content is clear and helpful
- ✅ Message mentions invalid/incorrect credentials
- ✅ No sensitive information revealed
- ✅ Message is well-formatted
- ✅ Error persists until user action

**Fail Criteria:**
- ❌ Error message not visible
- ❌ Message is unclear or confusing
- ❌ Poor styling (hard to notice)
- ❌ Message reveals security details
- ❌ Message disappears too quickly
- ❌ Grammatical errors in message
- ❌ Message is hidden or obscured

---

### Scenario 3: Multiple Invalid Login Attempts

**Test Case ID:** TC-MA-LOGIN-002.3  
**Priority:** Medium  
**Type:** Negative Functional Testing  

**Objective:**  
Verify that users can make multiple login attempts with different invalid credentials, and that error messages update appropriately for each attempt.

**Preconditions:**
- On My Account login page

**Test Steps:**

**Attempt 1:**
1. Enter username: "firstwrong@test.com"
2. Enter password: "FirstWrong123"
3. Click Login
4. Verify error message appears
5. Note error message text

**Attempt 2:**
6. Clear username and password fields
7. Enter username: "secondwrong@test.com"
8. Enter password: "SecondWrong456"
9. Click Login
10. Verify error message appears again
11. Verify error message is consistent with first attempt

**Attempt 3:**
12. Enter different incorrect credentials
13. Click Login
14. Verify error message still appears

**Verification:**
15. Verify form remains functional after multiple attempts
16. Verify no account lockout (within reason)
17. Verify error messages are consistent
18. Verify user can still attempt to login

**Expected Results:**
- Each invalid login attempt shows error message
- Error messages are consistent across attempts
- Form remains functional after multiple attempts
- Fields can be cleared and new data entered
- Login button remains enabled
- No application errors or crashes
- User can continue attempting login
- (Note: Account lockout after many attempts is acceptable but out of scope)

**Pass Criteria:**
- ✅ Multiple attempts can be made
- ✅ Error messages appear for each attempt
- ✅ Error messages are consistent
- ✅ Form remains functional
- ✅ No application crashes

**Fail Criteria:**
- ❌ Form becomes unusable after first error
- ❌ Inconsistent error messages
- ❌ Cannot make multiple attempts
- ❌ Application errors occur
- ❌ Page crashes or reloads unexpectedly

---

### Scenario 4: Login Form Accessibility After Error

**Test Case ID:** TC-MA-LOGIN-002.4  
**Priority:** Medium  
**Type:** Usability Testing  

**Objective:**  
Verify that after an invalid login attempt, the login form remains fully accessible and functional, allowing the user to correct their mistake and retry.

**Preconditions:**
- Invalid login attempt made, error displayed

**Test Steps:**

1. Make invalid login attempt (wrong username/password)
2. Verify error message appears
3. After error, verify username field:
   - Field is still visible
   - Field is still editable
   - Field can be clicked/focused
   - Previous input can be cleared
   - New input can be entered
4. After error, verify password field:
   - Field is still visible
   - Field is still editable
   - Field can be clicked/focused
   - Previous input can be cleared
   - New input can be entered
   - Password is still masked
5. After error, verify Login button:
   - Button is still visible
   - Button is still enabled
   - Button can be clicked again
6. Test correcting credentials:
   - Clear username field
   - Enter different username
   - Clear password field
   - Enter different password
   - Verify both fields accept new input
7. Verify form functionality:
   - Tab navigation still works
   - Enter key submission still works
   - No UI elements are broken

**Expected Results:**
- After error, login form is fully functional
- All form fields remain editable
- Username field can be modified
- Password field can be modified
- Login button remains enabled and clickable
- User can easily correct mistake and retry
- Tab and Enter key navigation still work
- No form elements are disabled or broken
- Form provides good user experience for retry

**Pass Criteria:**
- ✅ Username field remains editable
- ✅ Password field remains editable
- ✅ Login button remains enabled
- ✅ User can clear and re-enter credentials
- ✅ Keyboard navigation works
- ✅ Form is fully functional

**Fail Criteria:**
- ❌ Fields become disabled
- ❌ Cannot edit fields after error
- ❌ Login button becomes disabled
- ❌ Cannot retry login
- ❌ Form elements are broken
- ❌ Poor user experience

---

### Scenario 5: Invalid Username Variations

**Test Case ID:** TC-MA-LOGIN-002.5  
**Priority:** Medium  
**Type:** Negative Functional Testing  

**Objective:**  
Test various types of invalid usernames to ensure all are properly rejected with appropriate error messages.

**Preconditions:**
- On My Account login page

**Test Steps:**

**Test 5A - Non-existent Email:**
1. Enter username: "nonexistent@example.com"
2. Enter any password: "TestPass123"
3. Click Login
4. Verify error: "Invalid username" or similar

**Test 5B - Invalid Email Format:**
5. Enter username: "notanemail"
6. Enter password: "TestPass123"
7. Click Login
8. Verify error displayed

**Test 5C - Email with Typo:**
9. Enter username: "user@exampl" (incomplete domain)
10. Enter password: "TestPass123"
11. Click Login
12. Verify error displayed

**Test 5D - Random String:**
13. Enter username: "randomtext123"
14. Enter password: "TestPass123"
15. Click Login
16. Verify error displayed

**Test 5E - Special Characters:**
17. Enter username: "user@#$%"
18. Enter password: "TestPass123"
19. Click Login
20. Verify error displayed

**Verification:**
21. All invalid username types are rejected
22. Error messages are displayed for all cases
23. No access granted for any invalid username

**Expected Results:**
- All invalid username variations are rejected
- Error messages appear for each test
- Error messages are consistent
- No unauthorized access granted
- System handles all invalid formats properly

**Pass Criteria:**
- ✅ Non-existent emails rejected
- ✅ Invalid email formats rejected
- ✅ Random strings rejected
- ✅ Special character combinations rejected
- ✅ Error messages displayed for all
- ✅ No access granted

**Fail Criteria:**
- ❌ Any invalid username type grants access
- ❌ No error for some invalid types
- ❌ System crashes on certain inputs
- ❌ Inconsistent error handling

---

### Scenario 6: Security - No Information Disclosure

**Test Case ID:** TC-MA-LOGIN-002.6  
**Priority:** High  
**Type:** Security Testing (Basic)  

**Objective:**  
Verify that error messages do not disclose sensitive information that could aid attackers, such as revealing whether a username exists.

**Preconditions:**
- On My Account login page
- Know of one valid username (from Test Plan 1)

**Test Steps:**

**Test 6A - Invalid Username with Any Password:**
1. Enter non-existent username: "fake@example.com"
2. Enter any password: "AnyPassword123"
3. Click Login
4. Record exact error message (Message A)

**Test 6B - Valid Username with Wrong Password:**
5. Clear fields
6. Enter valid/existing username: (from Test Plan 1)
7. Enter wrong password: "WrongPassword456"
8. Click Login
9. Record exact error message (Message B)

**Analysis:**
10. Compare Message A and Message B
11. Verify messages are similar or identical
12. Verify neither message reveals:
    - Whether username exists
    - Which part is wrong (username vs password)
    - Hints about correct credentials

**Ideal Error Messages:**
- "Invalid username or password"
- "Incorrect credentials"
- "Login failed"
- Generic messages that don't specify which field is wrong

**Non-Ideal Error Messages (Security Risk):**
- "Username is correct but password is wrong"
- "This username doesn't exist"
- "Password is incorrect"
- Messages that reveal too much detail

**Expected Results:**
- Error messages are generic and don't reveal:
  - Whether username exists in system
  - Whether password is correct/incorrect
  - Which field has the error
- Both invalid username and invalid password produce similar messages
- No sensitive information disclosed
- Messages are secure and don't aid attackers
- Good security practice followed

**Pass Criteria:**
- ✅ Error messages are generic
- ✅ Messages don't reveal username existence
- ✅ Messages don't specify which field is wrong
- ✅ Similar messages for different error types
- ✅ No sensitive info disclosed

**Fail Criteria:**
- ❌ Message reveals username exists
- ❌ Message specifies password is wrong
- ❌ Different messages reveal information
- ❌ Sensitive information disclosed
- ❌ Messages aid potential attackers

---

## Dependencies

### Prerequisites:
- My Account login page must be accessible
- Login form must be functional

### Related Test Plans:
- **Test Plan 01:** Login with Valid Credentials (prerequisite)
- **Test Plan 03:** Empty Field Validation
- **Test Plan 04:** Password Reset/Recovery

---

## Important Notes

### On Error Messages:
The exact error message text may vary, but should typically include:
- "ERROR:" prefix or similar indicator
- Keywords: "Invalid", "Incorrect", "Wrong"
- Reference to: "username", "password", or "credentials"
- May include link to password recovery

Common formats:
- "ERROR: Invalid username. Lost your password?"
- "ERROR: The username or password you entered is incorrect."
- "Invalid email address or password."

### On Security:
- This test plan covers basic security validation (credential rejection)
- Advanced security testing (SQL injection, XSS, etc.) is out of scope
- Error messages should not reveal sensitive information
- Generic error messages are a security best practice

### On User Experience:
- Error messages should be clear but not too specific (security balance)
- Users should be able to easily retry after error
- Form should remain fully functional after error
- Error should be prominent but not alarming

---

## Risk Assessment

### High Risk Areas:
1. **Invalid Credentials Accepted**: Critical security flaw if wrong credentials grant access
2. **No Error Message**: User has no feedback about login failure
3. **Information Disclosure**: Error reveals sensitive security information
4. **Form Becomes Unusable**: User cannot retry after error

### Medium Risk Areas:
1. **Unclear Error Messages**: User doesn't understand what went wrong
2. **Poor Error Visibility**: Error message is hard to see
3. **Inconsistent Errors**: Different errors for same situation
4. **Application Errors**: System crashes on invalid input

### Low Risk Areas:
1. **Minor Message Typos**: Grammatical issues in error text
2. **Styling Issues**: Error not in ideal color/format
3. **Message Disappears Quickly**: Error visible but brief

### Mitigation Strategies:
- Test multiple invalid credential combinations
- Verify error messages are clear and consistent
- Check that no access is granted with invalid credentials
- Ensure form remains functional after errors
- Verify no sensitive information is disclosed

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ Login with incorrect username and password is rejected
2. ✅ Error message is displayed prominently
3. ✅ Error message contains "Invalid" or "Incorrect" or "Error"
4. ✅ Error message is clear and visible
5. ✅ User is NOT logged in after invalid attempt
6. ✅ No access to account area granted
7. ✅ Login form remains functional after error
8. ✅ User can retry login with new credentials
9. ✅ Multiple invalid attempts can be made
10. ✅ Error messages are consistent
11. ✅ No sensitive information disclosed in errors
12. ✅ All form fields remain editable after error
13. ✅ All 6 test scenarios pass

### Overall Test Plan FAIL Criteria:
1. ❌ Invalid credentials grant access (critical security issue)
2. ❌ No error message displayed
3. ❌ Error message is unclear or not visible
4. ❌ User gains access with wrong credentials
5. ❌ Form becomes unusable after error
6. ❌ Cannot retry login
7. ❌ Sensitive information disclosed
8. ❌ Inconsistent error handling
9. ❌ Application crashes or errors
10. ❌ Any critical test scenario fails

---

## Defect Reporting

### Severity Levels:

**Critical:**
- Invalid credentials grant access to account
- No error message displayed for invalid login
- System crashes on invalid credentials
- Security information disclosed in errors

**High:**
- Error message not visible or unclear
- Form becomes unusable after error
- Cannot retry login after error
- Inconsistent error messages

**Medium:**
- Poor error message formatting
- Error message lacks helpful information
- Minor usability issues after error
- Grammatical errors in messages

**Low:**
- Cosmetic error display issues
- Minor styling inconsistencies
- Non-critical message improvements

### Required Defect Information:
- Test Case ID
- Invalid credentials used (username only, not password)
- Screenshot of error message (or note if missing)
- Exact error message text
- Expected vs Actual behavior
- Steps to reproduce
- Browser and version
- Console errors (if any)

---

## Test Execution Notes

### Special Considerations:
1. **Security**: Do not test with real user accounts
2. **Rate Limiting**: Some systems may limit login attempts (acceptable)
3. **Account Lockout**: After many attempts, account may lock (out of scope)
4. **Error Messages**: Exact text may vary, focus on key elements

### Execution Tips:
- Use clearly invalid usernames (non-existent)
- Document exact error message text
- Take screenshots of error displays
- Test in clean browser state (no existing session)
- Clear cookies between tests if needed
- Verify console for JavaScript errors

### Pre-Test Checklist:
- [ ] Website is accessible
- [ ] My Account page is functional
- [ ] Browser is in clean state
- [ ] Test credentials prepared

### Post-Test Actions:
- Document all error message variations found
- Report any security concerns immediately
- Note any inconsistencies in error handling

---

## Appendix

### Expected Error Message Examples:

```
┌─────────────────────────────────────────────────┐
│  ❌ ERROR                                       │
│                                                 │
│  Invalid username. Lost your password?         │
│                                                 │
└─────────────────────────────────────────────────┘

OR

┌─────────────────────────────────────────────────┐
│  ❌ ERROR: The username or password you         │
│  entered is incorrect.                          │
│                                                 │
│  Lost your password?                            │
└─────────────────────────────────────────────────┘

OR

┌─────────────────────────────────────────────────┐
│  ERROR: Incorrect username or password.         │
└─────────────────────────────────────────────────┘
```

### Error Message Location:

```
┌─────────────────────────────────────────────────┐
│              MY ACCOUNT - LOGIN                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  ❌ ERROR: Invalid username              │  │ ← Error appears here
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  LOGIN                                   │  │
│  │                                          │  │
│  │  Username or email *                     │  │
│  │  [___________________________]           │  │
│  │                                          │  │
│  │  Password *                              │  │
│  │  [___________________________]           │  │
│  │                                          │  │
│  │  [ LOGIN ]                               │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Common Error Selectors:
```typescript
// Error message selectors
const errorMessage = page.locator('.woocommerce-error, .error, ul.woocommerce-error li');
const errorText = page.locator('text=/ERROR:|Invalid|Incorrect/i');
const errorContainer = page.locator('.woocommerce-NoticeGroup, .woocommerce-notices-wrapper');
```

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Test Plan Author | QA Team | _________ | 2025-10-29 |
| Test Lead | _________ | _________ | _________ |
| Project Manager | _________ | _________ | _________ |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-29 | QA Team | Initial test plan for My Account login with incorrect credentials |

---

**End of Test Plan**
