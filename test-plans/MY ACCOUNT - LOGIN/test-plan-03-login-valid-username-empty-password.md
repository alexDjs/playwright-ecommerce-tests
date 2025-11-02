# Test Plan 03: My Account - Login with Valid Username and Empty Password

## Overview

**Module:** MY ACCOUNT - LOGIN  
**Feature:** Authentication - Field Validation (Empty Password)  
**Test Plan ID:** TP-MA-LOGIN-003  
**Priority:** High  
**Created:** 2025-10-29  
**Environment:** http://practice.automationtesting.in/

---

## Objective

To verify that the login system properly validates required fields and displays appropriate error messages when a user attempts to login with a valid username but leaves the password field empty. This test ensures the application enforces password requirements and provides clear user feedback.

---

## Scope

### In Scope
- Username field population with valid credentials
- Empty password field submission
- Error message validation for empty password
- Error message clarity and user guidance
- Form field state after validation error
- Multiple submission attempts with empty password
- Browser-level HTML5 validation (if present)
- Form accessibility after error

### Out of Scope
- Valid login scenarios (covered in Test Plan 01)
- Invalid credentials (covered in Test Plan 02)
- Password reset functionality
- Registration process
- Session management
- Multi-factor authentication

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browser:** Chromium (Playwright default)
- **Test Framework:** Playwright with TypeScript
- **Screen Resolution:** Default viewport (1280x720)
- **Network:** Standard connection

---

## Prerequisites

- Website is accessible
- Test browser is properly configured
- Valid registered user account credentials available for testing
- No active session (logged out state)

---

## Test Data

| Field | Valid Value | Invalid Value | Notes |
|-------|-------------|---------------|-------|
| Username | Registered email/username | N/A | Use actual registered account |
| Password | N/A | (empty/blank) | No input provided |

**Test Credentials:**
- Valid Username: Use registered account (e.g., `testuser@example.com`)
- Password: Leave empty/blank

---

## Test Scenarios

### TC-MA-LOGIN-003.1: Login with Valid Username and Empty Password (Basic Flow)

**Priority:** Critical  
**Type:** Negative Testing / Validation

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Handle consent dialog if present
4. Click on "My Account" menu
5. Verify navigation to My Account page
6. Verify login form is visible
7. Enter valid registered username in username field
8. Verify username appears in the field
9. Leave password field empty (do not enter any value)
10. Verify password field is blank
11. Click on "Login" button
12. Wait for validation response

**Expected Results:**

- Error message is displayed indicating password is required
- Error message should contain text like:
  - "Password is required"
  - "Please enter a password"
  - "The password field is empty"
  - "ERROR: The password field is empty"
- Error message is clearly visible and styled appropriately
- User is NOT logged in
- Login form remains visible and accessible
- Username field retains the entered value
- Password field remains empty and editable

**Pass Criteria:**
- ✅ Error message displayed
- ✅ Error message specifically mentions password requirement
- ✅ User not logged in
- ✅ Form remains accessible

**Fail Criteria:**
- ❌ No error message displayed
- ❌ Login succeeds without password
- ❌ Generic or unclear error message
- ❌ Form becomes inaccessible

---

### TC-MA-LOGIN-003.2: Error Message Content Validation

**Priority:** High  
**Type:** Content Validation

**Test Steps:**

1. Navigate to My Account page
2. Enter valid username
3. Leave password field empty
4. Click Login button
5. Capture and analyze error message

**Validation Points:**

- Error message is visible
- Error message uses appropriate styling (color, icon)
- Error message text is clear and specific
- Error message mentions "password" or "Password field"
- Error message indicates the field is "empty" or "required"
- Error message provides guidance (e.g., "Please enter your password")

**Expected Error Message Examples:**
```
"ERROR: The password field is empty."
"Password is required."
"Please fill in the password field."
"ERROR: Password cannot be blank."
```

**Pass Criteria:**
- ✅ Error message clearly identifies password as the issue
- ✅ Message is user-friendly and actionable
- ✅ Proper formatting and styling applied

**Fail Criteria:**
- ❌ Vague or generic error message
- ❌ Error message doesn't mention password
- ❌ Poor formatting or invisible text

---

### TC-MA-LOGIN-003.3: Browser HTML5 Validation Check

**Priority:** Medium  
**Type:** Client-Side Validation

**Test Steps:**

1. Navigate to My Account page
2. Inspect password field for HTML5 attributes
3. Enter valid username
4. Leave password empty
5. Click Login button
6. Check if browser shows native validation

**Validation Points:**

- Check if password field has `required` attribute
- Check if browser displays native validation tooltip
- Verify if form submission is prevented by browser
- Verify if custom validation runs after/before browser validation

**Expected Results:**

- Either browser validation prevents submission OR
- Application validation handles the empty field
- Clear feedback provided to user either way

**Pass Criteria:**
- ✅ Validation occurs (browser or application)
- ✅ User receives clear feedback
- ✅ Empty submission is prevented

**Fail Criteria:**
- ❌ Form submits without validation
- ❌ No feedback provided to user

---

### TC-MA-LOGIN-003.4: Multiple Attempts with Empty Password

**Priority:** Medium  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter valid username
3. Leave password empty
4. Click Login button
5. Verify error message
6. Click Login button again (without filling password)
7. Verify error message appears again
8. Fill password field with valid password
9. Click Login button
10. Verify successful login

**Expected Results:**

- First attempt: Error message displayed
- Second attempt: Error message displayed again
- Third attempt (with password): Login succeeds
- Form remains functional throughout
- No account lockout or throttling due to empty submissions

**Pass Criteria:**
- ✅ Error message displayed consistently
- ✅ Form remains accessible after multiple errors
- ✅ Login succeeds when password is provided

**Fail Criteria:**
- ❌ Account locked after empty submissions
- ❌ Form becomes non-functional
- ❌ Inconsistent error messages

---

### TC-MA-LOGIN-003.5: Form Field State After Error

**Priority:** High  
**Type:** Usability Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter valid username: `testuser@example.com`
3. Leave password empty
4. Click Login button
5. After error appears, verify form state

**Field State Verification:**

**Username Field:**
- Should still contain the entered username
- Should be editable
- Should allow clearing and re-entering

**Password Field:**
- Should be empty
- Should be editable
- Should accept input
- Should maintain type="password" (masked input)

**Login Button:**
- Should remain visible
- Should remain enabled
- Should be clickable

**Expected Results:**

- Username value is retained (user doesn't need to re-type)
- All fields remain accessible and editable
- User can correct the error and resubmit
- No fields are disabled or locked

**Pass Criteria:**
- ✅ Username retained in field
- ✅ All fields editable
- ✅ Login button functional

**Fail Criteria:**
- ❌ Form fields cleared unnecessarily
- ❌ Fields disabled
- ❌ Form becomes inaccessible

---

### TC-MA-LOGIN-003.6: Empty Password with Different Username Formats

**Priority:** Medium  
**Type:** Validation Coverage

**Test Steps:**

Test empty password with various valid username formats:

1. **Email format username**
   - Username: `testuser@example.com`
   - Password: (empty)
   - Expected: Password required error

2. **Simple username format** (if supported)
   - Username: `testuser`
   - Password: (empty)
   - Expected: Password required error

3. **Username with special characters** (if supported)
   - Username: `test.user@example.com`
   - Password: (empty)
   - Expected: Password required error

**Expected Results:**

- Empty password validation works regardless of username format
- Consistent error messages across all username types
- Validation prioritizes empty password over username format validation

**Pass Criteria:**
- ✅ Empty password detected for all username formats
- ✅ Consistent error messages
- ✅ Validation is independent of username format

**Fail Criteria:**
- ❌ Validation inconsistent across username formats
- ❌ Different errors for different username types

---

## Risk Assessment

### High Risk Areas
1. **Security:** Allowing empty password submission could indicate weak validation
2. **Usability:** Unclear error messages frustrate users
3. **Data Loss:** Form clearing username after error wastes user time

### Medium Risk Areas
1. **Browser Compatibility:** HTML5 validation may vary across browsers
2. **Accessibility:** Error messages must be accessible to screen readers
3. **Performance:** Multiple validation errors should not degrade performance

### Low Risk Areas
1. **Styling:** Minor visual inconsistencies in error display
2. **Timing:** Slight delays in error message appearance

---

## Expected Behavior Summary

| Scenario | Expected Error Message | User Logged In? | Form State |
|----------|----------------------|-----------------|------------|
| Valid username + Empty password | "ERROR: The password field is empty" | ❌ No | Accessible, username retained |
| Valid username + Empty password (retry) | Same error message | ❌ No | Accessible, username retained |
| Valid username + Valid password | No error | ✅ Yes | Redirected to dashboard |

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria
- ✅ All critical scenarios (003.1, 003.2, 003.5) pass
- ✅ Error message clearly indicates password is required
- ✅ Login does not succeed with empty password
- ✅ Form remains functional after error
- ✅ Username value is retained after validation error

### Overall Test Plan FAIL Criteria
- ❌ Any critical scenario fails
- ❌ Login succeeds without password
- ❌ No error message displayed
- ❌ Form becomes unusable after error
- ❌ Error message is misleading or unclear

---

## Defect Reporting Guidelines

**If validation fails, report with:**

**Title:** "Login validation allows empty password" or "No error for empty password field"

**Priority:** Critical

**Steps to Reproduce:**
1. Navigate to My Account
2. Enter valid username: [specify]
3. Leave password empty
4. Click Login button

**Expected:** Error message: "ERROR: The password field is empty"

**Actual:** [Describe what happened - e.g., "Login succeeded" or "No error displayed"]

**Evidence:**
- Screenshot of form state
- Screenshot of error (or lack thereof)
- Browser console logs
- Network request/response

---

## Test Execution Notes

### Setup
```bash
# Set valid test username
export TEST_USERNAME="your-registered-email@example.com"

# Run test plan 03
npx playwright test "tests/MY ACCOUNT - LOGIN/3-login-valid-username-empty-password.spec.ts" --project=chromium
```

### Validation Checklist
- [ ] Valid registered username available
- [ ] Website accessible
- [ ] Browser properly configured
- [ ] Error message selectors identified
- [ ] Expected error text documented

---

## Related Test Plans

- **Test Plan 01:** Login with Valid Credentials (positive flow)
- **Test Plan 02:** Login with Incorrect Credentials
- **Test Plan 04:** Login with Empty Username and Valid Password (future)
- **Test Plan 05:** Login with Both Fields Empty (future)

---

## Notes

- Empty password is a common user error (accidental or intentional)
- Proper validation prevents unnecessary server requests
- Error messages should guide user toward successful login
- Field retention (username) improves user experience
- Browser HTML5 validation may provide first line of defense
- Application-level validation should always be present as backup

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-29 | Test Automation Team | Initial test plan creation |

---

**Test Plan Status:** Ready for Execution  
**Approval Required:** QA Lead  
**Estimated Execution Time:** 15 minutes
