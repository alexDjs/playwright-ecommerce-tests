# Test Plan 01: My Account - Login with Valid Credentials

## Test Plan Information

**Test Plan ID:** TP-MA-LOGIN-001  
**Test Plan Name:** My Account - Login with Valid Username and Password  
**Application:** Practice Automation Testing Website  
**Module:** User Authentication - My Account Login  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website implements a user authentication system through the "My Account" section. This test plan focuses on validating the **login functionality** with valid registered user credentials, ensuring that authenticated users can successfully access their account dashboard.

### Key Features Tested:
- **My Account Page Access**: Navigation to login page
- **Username Input**: Valid username entry
- **Password Input**: Valid password entry  
- **Login Button**: Form submission functionality
- **Authentication**: Valid credential verification
- **Successful Login**: Access to user dashboard/account area
- **Session Management**: User remains logged in

---

## Test Objectives

1. **Validate Login Page Access**: Verify My Account page is accessible
2. **Test Username Field**: Ensure username field accepts valid input
3. **Test Password Field**: Ensure password field accepts valid input
4. **Verify Login Button**: Confirm login button is functional
5. **Test Authentication**: Validate login with valid credentials succeeds
6. **Verify Post-Login State**: Confirm user is logged in and redirected correctly

---

## Scope

### In Scope:
- Navigation to My Account page
- Username field functionality
- Password field functionality
- Login button functionality
- Authentication with valid credentials
- Successful login verification
- Post-login page state (dashboard/account page)
- User session establishment
- Login success indicators (welcome message, account menu, etc.)

### Out of Scope:
- Registration/sign-up functionality
- Invalid credentials testing (separate test plan)
- Password reset/forgot password
- Social login (Google, Facebook, etc.)
- Two-factor authentication
- "Remember Me" functionality
- Session timeout
- Logout functionality
- Account management features
- Security testing (SQL injection, XSS, etc.)

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - Valid registered user account available
  - Test credentials prepared

---

## Test Data

### Valid User Credentials:

**Test Account 1 (Primary):**
```
Username: testuser@example.com
Password: TestPassword123!
```

**Test Account 2 (Alternative):**
```
Username: qauser@test.com
Password: QAPassword456!
```

**Test Account 3 (Backup):**
```
Username: automationtest@example.com
Password: AutoTest789!
```

**Note:** If these accounts don't exist, use actual registered credentials from the test environment.

---

## Test Scenarios

### Scenario 1: Login with Valid Email and Password

**Test Case ID:** TC-MA-LOGIN-001.1  
**Priority:** Critical  
**Type:** Functional Testing - Positive Test  

**Objective:**  
Verify that a registered user can successfully log in to their account using valid email and password credentials.

**Preconditions:**
- Browser is open
- Website is accessible
- User has a registered account with known credentials
- User is not currently logged in

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Locate "My Account" menu link in navigation
4. Click on "My Account" menu
5. Verify navigation to login page (URL contains "my-account" or "login")
6. Verify login form is visible with:
   - Username/Email field
   - Password field
   - Login button
7. Locate username/email input field
8. Click on username field to focus
9. Enter valid registered username: "testuser@example.com"
10. Verify username appears in the field
11. Locate password input field
12. Click on password field to focus
13. Enter valid password: "TestPassword123!"
14. Verify password is masked (appears as dots/asterisks)
15. Locate "Login" button
16. Click on "Login" button
17. Wait for page to process login
18. Verify successful login by checking:
    - URL changes (no longer on login page)
    - User dashboard/account page loads
    - Welcome message or user name appears
    - "Logout" link is visible
    - "My Account" menu shows logged-in state
19. Verify no error messages are displayed

**Expected Results:**
- My Account page loads successfully
- Login form is visible and accessible
- Username field accepts text input
- Password field accepts text input and masks characters
- Login button is clickable
- After clicking Login:
  - Page navigates away from login form
  - User is redirected to account dashboard or home page
  - Success indicators are visible:
    - User name or email displayed
    - "Logout" option available
    - Welcome message (e.g., "Hello [username]")
    - Account navigation menu visible
  - No error messages appear
  - User session is established
  - User can access account features

**Pass Criteria:**
- ✅ My Account page accessible
- ✅ Login form fields accept input
- ✅ Username entered successfully
- ✅ Password entered and masked
- ✅ Login button works
- ✅ Authentication succeeds
- ✅ User redirected to account area
- ✅ Logged-in state confirmed (Logout visible)
- ✅ No error messages

**Fail Criteria:**
- ❌ Cannot access My Account page
- ❌ Login form not visible
- ❌ Cannot enter username
- ❌ Cannot enter password
- ❌ Login button doesn't work
- ❌ Authentication fails with valid credentials
- ❌ No redirect after login
- ❌ Error message appears
- ❌ User not logged in
- ❌ Logout option not visible

---

### Scenario 2: Login Form Field Validation

**Test Case ID:** TC-MA-LOGIN-001.2  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the login form fields (username and password) are properly labeled, accept input correctly, and provide appropriate user feedback.

**Preconditions:**
- Browser is open
- Navigated to My Account login page

**Test Steps:**

1. Navigate to My Account page
2. Verify Username/Email field:
   - Field is visible
   - Field has label ("Username" or "Email")
   - Field has placeholder text (if applicable)
   - Field is enabled and editable
   - Cursor appears when field is clicked
3. Test Username field input:
   - Enter valid email format
   - Verify text appears as typed
   - Verify field accepts alphanumeric characters
   - Verify field accepts @ symbol
   - Verify field accepts dot (.) character
4. Verify Password field:
   - Field is visible
   - Field has label ("Password")
   - Field has placeholder text (if applicable)
   - Field is enabled and editable
   - Field type is "password" (masked input)
5. Test Password field input:
   - Enter password characters
   - Verify input is masked (dots or asterisks)
   - Verify field accepts alphanumeric characters
   - Verify field accepts special characters
   - Verify no plain text visible
6. Verify Login button:
   - Button is visible
   - Button text is clear ("Login" or "Sign In")
   - Button is enabled
   - Button has hover effect (if applicable)

**Expected Results:**
- Username field properly labeled and functional
- Password field properly labeled and functional
- Password input is masked for security
- All fields accept appropriate input
- Login button is clearly visible and functional
- Form provides good user experience

**Pass Criteria:**
- ✅ Username field labeled correctly
- ✅ Password field labeled correctly
- ✅ Username accepts text input
- ✅ Password masks input
- ✅ All fields are editable
- ✅ Login button is functional

**Fail Criteria:**
- ❌ Fields are not labeled
- ❌ Cannot enter text in fields
- ❌ Password is not masked
- ❌ Fields are disabled
- ❌ Login button is hidden or disabled

---

### Scenario 3: Post-Login Dashboard Access

**Test Case ID:** TC-MA-LOGIN-001.3  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that after successful login, the user is redirected to their account dashboard and can access account-related features.

**Preconditions:**
- User has valid credentials
- User has successfully logged in

**Test Steps:**

1. Complete login process with valid credentials
2. Verify redirect to account dashboard/home page
3. Check URL after login:
   - URL should indicate logged-in state
   - May contain "my-account" or "dashboard"
4. Verify page content shows logged-in state:
   - User's name or email displayed
   - Welcome message present
   - Account navigation menu visible
5. Look for logged-in indicators:
   - "Logout" link/button visible
   - User avatar or icon (if applicable)
   - Account menu items accessible
6. Verify account features are accessible:
   - Dashboard/Overview section
   - Orders section (if applicable)
   - Account details/settings
7. Check that login form is no longer visible
8. Verify session persistence:
   - Refresh page
   - User remains logged in
   - No redirect back to login

**Expected Results:**
- User successfully redirected after login
- Account dashboard or home page displays
- Clear logged-in indicators visible:
  - User name/email shown
  - "Logout" option available
  - Welcome message displayed
  - Account menu accessible
- Login form is no longer visible
- User can access account features
- Session persists on page refresh
- User experience is seamless

**Pass Criteria:**
- ✅ Redirect to account area
- ✅ User name/email displayed
- ✅ Logout option visible
- ✅ Welcome message shown
- ✅ Account features accessible
- ✅ Session persists

**Fail Criteria:**
- ❌ No redirect after login
- ❌ Still showing login form
- ❌ No logged-in indicators
- ❌ Cannot access account features
- ❌ Session lost on refresh

---

### Scenario 4: Login Button Functionality

**Test Case ID:** TC-MA-LOGIN-001.4  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that the Login button properly submits the login form and triggers authentication when clicked.

**Preconditions:**
- On My Account login page
- Valid credentials ready

**Test Steps:**

1. Navigate to My Account login page
2. Locate Login button
3. Verify button initial state:
   - Button is visible
   - Button text is "Login" or "Sign In"
   - Button is enabled (not disabled)
4. Enter valid username
5. Enter valid password
6. Observe Login button state:
   - Button remains enabled
   - Button is clickable
7. Click Login button
8. Observe button behavior:
   - Button click is registered
   - Form submission occurs
   - Loading indicator appears (if applicable)
   - Button may become temporarily disabled
9. Wait for authentication process
10. Verify successful login result

**Expected Results:**
- Login button is clearly visible
- Button displays appropriate text
- Button is enabled with valid input
- Button responds to click
- Form submits on button click
- Authentication process initiates
- Login succeeds with valid credentials
- Button provides feedback during processing (if applicable)

**Pass Criteria:**
- ✅ Login button visible
- ✅ Button is clickable
- ✅ Button submits form
- ✅ Authentication triggered
- ✅ Login succeeds

**Fail Criteria:**
- ❌ Button not visible
- ❌ Button disabled inappropriately
- ❌ Button doesn't respond to click
- ❌ Form doesn't submit
- ❌ No authentication occurs

---

### Scenario 5: Login with Keyboard Navigation (Enter Key)

**Test Case ID:** TC-MA-LOGIN-001.5  
**Priority:** Medium  
**Type:** Accessibility/Usability Testing  

**Objective:**  
Verify that users can complete the login process using keyboard navigation (Tab and Enter keys) without using a mouse.

**Preconditions:**
- On My Account login page
- Valid credentials ready

**Test Steps:**

1. Navigate to My Account login page
2. Use Tab key to focus on username field
3. Verify username field is focused (visual indicator)
4. Type valid username using keyboard
5. Press Tab key to move to password field
6. Verify password field is focused
7. Type valid password using keyboard
8. Press Tab key to focus on Login button
9. Verify Login button is focused (visual indicator)
10. Press Enter key to submit form
11. Verify login process initiates
12. Verify successful login

**Alternative Test:**
1. After entering password, press Enter key directly (without tabbing to button)
2. Verify form submits and login succeeds

**Expected Results:**
- All form fields are keyboard accessible
- Tab key navigation works correctly
- Focus indicators are visible
- Form accepts keyboard input
- Enter key submits form from password field
- Enter key submits form from Login button
- Login succeeds without mouse interaction
- Keyboard navigation provides good user experience

**Pass Criteria:**
- ✅ Tab navigation works
- ✅ Focus indicators visible
- ✅ Keyboard input accepted
- ✅ Enter key submits form
- ✅ Login succeeds via keyboard

**Fail Criteria:**
- ❌ Cannot tab to fields
- ❌ No focus indicators
- ❌ Keyboard input fails
- ❌ Enter key doesn't submit
- ❌ Keyboard login fails

---

### Scenario 6: Login Redirect and URL Verification

**Test Case ID:** TC-MA-LOGIN-001.6  
**Priority:** Low  
**Type:** Functional Testing  

**Objective:**  
Verify that the URL changes appropriately during and after the login process, and that the user is redirected to the correct page.

**Preconditions:**
- User has valid credentials
- Not currently logged in

**Test Steps:**

1. Navigate to home page: `http://practice.automationtesting.in/`
2. Record current URL
3. Click on "My Account" menu
4. Verify URL changes to login page (e.g., contains "my-account")
5. Record login page URL
6. Enter valid credentials
7. Click Login button
8. Monitor URL during authentication
9. After successful login, verify URL:
   - URL has changed from login page
   - URL indicates logged-in state
   - URL may show "my-account", "dashboard", or similar
10. Verify user remains on correct URL after login
11. Verify no redirect loops occur

**Expected Results:**
- URL clearly indicates login page before login
- URL changes after successful login
- Post-login URL indicates account/dashboard area
- URL is stable (no continuous redirects)
- URL is user-friendly and understandable
- Browser history works correctly

**Pass Criteria:**
- ✅ Login page URL is correct
- ✅ URL changes after login
- ✅ Post-login URL indicates account area
- ✅ No redirect loops
- ✅ URL is stable

**Fail Criteria:**
- ❌ Wrong login page URL
- ❌ URL doesn't change after login
- ❌ Redirect loops occur
- ❌ Broken or error URL
- ❌ Unexpected redirects

---

## Dependencies

### Prerequisites:
- User must have a registered account
- Test credentials must be valid and active
- Account must not be locked or suspended

### Related Test Plans:
- **Test Plan 02:** Login with Invalid Credentials
- **Test Plan 03:** Account Registration
- **Test Plan 04:** Password Reset
- **Test Plan 05:** Logout Functionality

---

## Important Notes

### On Test Data:
- Use dedicated test accounts, not production user data
- Ensure test credentials are documented securely
- Test accounts should be reset between test runs if needed
- Do not hardcode passwords in scripts (use environment variables or secure vaults)

### On Authentication:
- This test validates front-end login functionality
- Actual authentication is handled by the server
- Test focuses on successful login flow, not security testing
- Security testing (brute force, SQL injection, etc.) is out of scope

### On Session Management:
- After successful login, a session is established
- Session cookies may be set
- This test verifies the session is created, not session timeout behavior

---

## Risk Assessment

### High Risk Areas:
1. **Authentication Failure**: Valid credentials rejected
2. **No Redirect After Login**: User stuck on login page
3. **Session Not Created**: User appears logged in but session is not established
4. **Login Button Broken**: Cannot submit login form

### Medium Risk Areas:
1. **Poor User Feedback**: No indication of successful login
2. **Redirect to Wrong Page**: Not sent to account dashboard
3. **Fields Don't Accept Input**: Cannot enter credentials
4. **Password Visible**: Password field not masked

### Low Risk Areas:
1. **Missing Labels**: Fields are functional but poorly labeled
2. **Minor UI Issues**: Cosmetic problems
3. **Keyboard Navigation Issues**: Mouse works but keyboard doesn't

### Mitigation Strategies:
- Test with multiple valid accounts
- Verify all login indicators (logout button, welcome message, etc.)
- Check both URL and page content for login confirmation
- Test keyboard navigation in addition to mouse
- Verify session persistence

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ My Account page is accessible
2. ✅ Login form is visible with username, password, and login button
3. ✅ Username field accepts valid email/username input
4. ✅ Password field accepts input and masks characters
5. ✅ Login button is functional and submits form
6. ✅ Authentication succeeds with valid credentials
7. ✅ User is redirected to account dashboard/area
8. ✅ Logged-in state is clearly indicated:
   - User name/email visible
   - Logout option available
   - Welcome message displayed
9. ✅ No error messages appear
10. ✅ User session is established and persists
11. ✅ Keyboard navigation works (Enter key submits)
12. ✅ All 6 test scenarios pass

### Overall Test Plan FAIL Criteria:
1. ❌ Cannot access My Account page
2. ❌ Login form is missing or broken
3. ❌ Cannot enter username
4. ❌ Cannot enter password
5. ❌ Password is not masked
6. ❌ Login button doesn't work
7. ❌ Valid credentials are rejected
8. ❌ No redirect after login
9. ❌ No logged-in indicators visible
10. ❌ Error messages appear with valid credentials
11. ❌ Session is not created
12. ❌ Any critical test scenario fails

---

## Defect Reporting

### Severity Levels:

**Critical:**
- Cannot log in with valid credentials
- Authentication system completely broken
- Login button doesn't work
- Cannot access My Account page

**High:**
- Login succeeds but no redirect
- Session not created after login
- No logged-in indicators visible
- Password field not masked

**Medium:**
- Missing form labels
- Poor user feedback
- Keyboard navigation doesn't work
- Minor redirect issues

**Low:**
- Cosmetic UI issues
- Missing placeholder text
- Minor text inconsistencies

### Required Defect Information:
- Test Case ID
- Step where failure occurred
- Screenshots of:
  - Login page
  - Error message (if any)
  - Post-login state
- Test credentials used (username only, not password)
- Browser and version
- Console errors
- Network requests (if authentication fails)

---

## Test Execution Notes

### Special Considerations:
1. **Password Security**: Do not log passwords in console or screenshots
2. **Test Accounts**: Use dedicated test accounts, not personal accounts
3. **Environment**: Ensure test environment is stable
4. **Cookies**: Clear cookies between test runs for consistency
5. **Consent Dialogs**: Handle GDPR/cookie consent if present

### Execution Tips:
- Clear browser cache and cookies before testing
- Use incognito/private mode for isolated testing
- Take screenshots at key steps (login page, post-login)
- Verify network requests show successful authentication
- Check console for JavaScript errors
- Test on multiple browsers

### Pre-Test Checklist:
- [ ] Website is accessible
- [ ] Test credentials are ready and valid
- [ ] My Account page is functional
- [ ] Browser is in clean state (no existing session)

### Post-Test Actions:
- Log out after testing (if applicable)
- Clear test session/cookies
- Document any unexpected behavior
- Report defects found

---

## Appendix

### Expected Login Page Structure:

```
┌─────────────────────────────────────────────────┐
│              MY ACCOUNT - LOGIN                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  LOGIN                                   │  │
│  │                                          │  │
│  │  Username or email address *             │  │
│  │  [___________________________]           │  │
│  │                                          │  │
│  │  Password *                              │  │
│  │  [___________________________]           │  │
│  │                                          │  │
│  │  [ ] Remember me                         │  │
│  │                                          │  │
│  │  [ LOGIN ]                               │  │
│  │                                          │  │
│  │  Lost your password?                     │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  REGISTER                                │  │
│  │                                          │  │
│  │  Email address *                         │  │
│  │  [___________________________]           │  │
│  │                                          │  │
│  │  [ REGISTER ]                            │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Expected Post-Login Page Indicators:

```
Navigation Bar:
[ Shop ] [ My Account ▼ ] [ Cart ]
              ↓
         [ Dashboard ]
         [ Orders ]
         [ Downloads ]
         [ Addresses ]
         [ Account Details ]
         [ Logout ]

Page Content:
┌─────────────────────────────────────┐
│  Hello, testuser@example.com        │
│                                     │
│  Welcome to your account dashboard  │
│                                     │
│  [ Dashboard ]                      │
│  [ Orders ]                         │
│  [ Account Details ]                │
└─────────────────────────────────────┘
```

### Login Success Indicators:
1. **URL Change**: From `/my-account/` to `/my-account/dashboard/` or similar
2. **Logout Link**: "Logout" or "Sign Out" visible in navigation
3. **Welcome Message**: "Hello [username]" or "Welcome back"
4. **Account Menu**: Expanded menu with dashboard, orders, etc.
5. **User Icon/Avatar**: User indicator in header
6. **No Login Form**: Login form is replaced with account content

### Common Login Page Selectors:
```typescript
// Form selectors
const usernameField = page.locator('#username, input[name="username"], input[type="email"]');
const passwordField = page.locator('#password, input[name="password"], input[type="password"]');
const loginButton = page.locator('button[name="login"], input[type="submit"][value*="Log"]');

// Success indicators
const logoutLink = page.locator('text=/logout/i, a[href*="logout"]');
const welcomeMessage = page.locator('text=/hello/i, text=/welcome/i');
const accountDashboard = page.locator('.woocommerce-MyAccount-navigation, .account-navigation');
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
| 1.0 | 2025-10-29 | QA Team | Initial test plan for My Account login with valid credentials |

---

**End of Test Plan**
