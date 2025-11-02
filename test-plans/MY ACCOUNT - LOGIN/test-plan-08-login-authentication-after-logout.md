# Test Plan 08: MY ACCOUNT - LOGIN - Authentication State After Logout

## Overview
This test plan validates that user authentication state is properly cleared after logout and cannot be restored using browser navigation (back button). This is a critical security feature to prevent unauthorized access to user accounts after explicit logout.

## Module
**MY ACCOUNT - LOGIN**

## Test Plan ID
**TP-MA-LOGIN-008**

## Objective
To verify that:
1. User can successfully log out from their account
2. After logout, using browser back button does NOT restore the authenticated session
3. Authentication state is properly invalidated server-side
4. Session tokens/cookies are cleared upon logout
5. User is redirected to appropriate public pages after logout

## Scope

### In Scope
- Complete login and logout flow
- Session state validation after logout
- Browser back button behavior post-logout
- Security of authentication state management
- Session invalidation mechanisms
- Redirect behavior after logout

### Out of Scope
- Forward button behavior
- Browser cache management
- Multiple tab scenarios
- Session timeout (covered in separate test plan)
- Remember me functionality

## Prerequisites
1. Application URL: http://practice.automationtesting.in/
2. Valid registered user account with known credentials
3. Browser environment: Modern browser (Chrome/Firefox/Edge)
4. Network connectivity
5. JavaScript enabled in browser

## Test Environment
- **Base URL**: http://practice.automationtesting.in/
- **Test Browser**: Chromium (Playwright default)
- **Viewport**: 1280x720
- **Network**: Standard connection

## Test Data

### Valid User Credentials
```
Username: [Use environment variable TEST_USERNAME or default test account]
Password: [Use environment variable TEST_PASSWORD or default test account]
```

**Note**: Test credentials should be actual registered accounts in the system.

## Test Scenarios

### TC-MA-LOGIN-008.1: Basic logout and back button flow
**Priority**: Critical  
**Type**: Security, Functional

**Test Steps**:
1. Navigate to http://practice.automationtesting.in/
2. Click on "My Account" menu
3. Enter valid username
4. Enter valid password
5. Click Login button
6. Verify successful login (Dashboard/Logout link visible)
7. Click Logout link
8. Verify logout confirmation/message
9. Click browser back button
10. Verify user is NOT logged in
11. Verify appropriate public page is displayed

**Expected Result**:
- User successfully logs in
- User successfully logs out
- After logout, back button does NOT restore authenticated session
- User sees public/login page, not account dashboard
- No access to protected resources

**Security Consideration**: This prevents session hijacking via browser history

---

### TC-MA-LOGIN-008.2: Multiple back button presses after logout
**Priority**: High  
**Type**: Security

**Test Steps**:
1. Complete login process
2. Navigate to multiple pages within account area (Dashboard → Orders → Account Details)
3. Logout from the account
4. Press back button multiple times (3-5 times)
5. Verify each page load

**Expected Result**:
- Each back button press shows public/non-authenticated pages
- User never sees authenticated content
- Login form remains accessible
- No cached sensitive data displayed

---

### TC-MA-LOGIN-008.3: Verify logout URL redirect behavior
**Priority**: High  
**Type**: Functional

**Test Steps**:
1. Login to the account
2. Navigate to Account Dashboard
3. Click Logout link
4. Capture the URL after logout
5. Verify logout confirmation message
6. Press back button
7. Verify the resulting URL

**Expected Result**:
- Logout redirects to appropriate page (login or home)
- Logout confirmation message displayed
- Back button shows public page
- URL indicates non-authenticated state
- No sensitive data in URL parameters

---

### TC-MA-LOGIN-008.4: Session invalidation verification
**Priority**: Critical  
**Type**: Security

**Test Steps**:
1. Login to the account
2. Verify user is authenticated (Dashboard visible)
3. Click Logout
4. Press back button to return to account area
5. Attempt to interact with account features (if visible)
6. Verify session is invalid

**Expected Result**:
- After logout + back button, session is invalid
- Any attempt to access protected resources fails
- User is redirected to login page
- No API calls succeed with old session token
- Appropriate error message if user tries to perform action

---

### TC-MA-LOGIN-008.5: Logout link visibility and accessibility
**Priority**: Medium  
**Type**: Functional, Usability

**Test Steps**:
1. Login to the account
2. Locate the Logout link
3. Verify visibility and accessibility
4. Verify link text/label
5. Click Logout link
6. Verify logout process completes

**Expected Result**:
- Logout link is clearly visible when logged in
- Link is accessible (proper contrast, size, location)
- Link text is clear ("Logout", "Sign Out", etc.)
- Logout completes successfully
- User receives confirmation

---

### TC-MA-LOGIN-008.6: Direct URL access after logout
**Priority**: High  
**Type**: Security

**Test Steps**:
1. Login to the account
2. Navigate to account dashboard
3. Copy the dashboard URL
4. Logout from the account
5. Paste and navigate to the copied dashboard URL
6. Verify access is denied

**Expected Result**:
- Direct URL access to protected pages is blocked
- User is redirected to login page
- Appropriate message displayed (e.g., "Please login to continue")
- Session cannot be restored by URL access

---

### TC-MA-LOGIN-008.7: Verify session cookies are cleared on logout
**Priority**: Critical  
**Type**: Security

**Test Steps**:
1. Login to the account
2. Inspect browser cookies (authentication/session cookies)
3. Record session cookie values
4. Logout from the account
5. Inspect browser cookies again
6. Compare cookie state

**Expected Result**:
- Session/authentication cookies are deleted or invalidated
- Cookie values are cleared or changed
- No valid session token remains in browser
- Re-login creates new session cookies

---

### TC-MA-LOGIN-008.8: Concurrent session handling (optional advanced test)
**Priority**: Medium  
**Type**: Security

**Test Steps**:
1. Open browser window/tab 1 and login
2. Open browser window/tab 2 (same browser, same session)
3. Verify user is logged in both tabs
4. In tab 1, logout from the account
5. Switch to tab 2
6. Refresh the page or attempt to access account feature
7. Verify session state in tab 2

**Expected Result**:
- Logout in one tab invalidates session in all tabs
- Tab 2 shows user is logged out after refresh
- Session is globally invalidated
- User must re-login to access account

---

## Risk Assessment

### High Risk Areas
1. **Session Hijacking**: If back button restores session, attackers could gain access
2. **Shared Computer Security**: On public computers, previous user sessions must be completely cleared
3. **Browser Cache**: Sensitive data must not be visible from cache after logout
4. **Session Invalidation**: Server-side session must be terminated, not just client-side

### Security Implications
- **Critical**: Back button access to authenticated pages is a severe security vulnerability
- **High**: Session tokens must be invalidated server-side, not just client-side
- **High**: Sensitive data must not persist in browser history or cache

### Mitigation Strategies
- Implement proper cache-control headers (no-cache, no-store for authenticated pages)
- Destroy server-side session on logout
- Clear client-side session/authentication cookies
- Use proper HTTP headers (Cache-Control, Pragma, Expires)
- Implement token-based authentication with revocation

## Pass/Fail Criteria

### Pass Criteria
✅ User can successfully login and logout  
✅ After logout, back button does NOT restore authenticated session  
✅ User sees public/login page after logout + back button  
✅ Session cookies are cleared or invalidated on logout  
✅ Direct URL access to protected pages is blocked after logout  
✅ Logout link is visible and functional when logged in  
✅ No cached sensitive data visible after logout  
✅ Appropriate messages/redirects occur during logout flow

### Fail Criteria
❌ Back button restores authenticated session after logout  
❌ User can access account features after logout  
❌ Session cookies remain valid after logout  
❌ Direct URL access to account pages succeeds after logout  
❌ Logout link is not visible or does not work  
❌ Sensitive data visible in browser cache/history  
❌ Session is not invalidated server-side

## Test Execution Notes

### Important Considerations
1. **Browser Behavior**: Different browsers may handle cache/history differently
2. **Server Implementation**: Session invalidation must occur server-side
3. **HTTP Headers**: Verify Cache-Control headers on authenticated pages
4. **Cookie Flags**: Check for Secure, HttpOnly, SameSite flags on session cookies
5. **Timing**: Allow sufficient time for logout to complete before testing back button

### Best Practices
- Clear browser cache between test runs for consistency
- Test with multiple browsers (Chrome, Firefox, Edge, Safari)
- Verify both client-side and server-side session state
- Use browser DevTools to inspect network traffic and cookies
- Document exact logout flow and redirect paths

## Related Test Plans
- **Test Plan 01**: Login with valid credentials (prerequisite)
- **Test Plan 02**: Login with invalid credentials
- **Test Plan 09**: Session timeout and management (if applicable)
- **Test Plan 10**: Remember me functionality (if applicable)

## Automated Test Coverage
- All scenarios (TC-MA-LOGIN-008.1 through 008.8) will be automated using Playwright
- Tests will verify:
  - Complete login/logout flow
  - Browser back button behavior
  - Session state validation
  - Cookie inspection and verification
  - URL access control
  - Page content validation

## References
- **OWASP**: Session Management Cheat Sheet
- **CWE-613**: Insufficient Session Expiration
- **Security Standard**: Sessions must be invalidated on explicit logout
