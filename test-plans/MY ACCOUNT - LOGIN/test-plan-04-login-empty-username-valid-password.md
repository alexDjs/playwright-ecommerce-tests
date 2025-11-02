# Test Plan 04: My Account - Login with Empty Username and Valid Password

## Overview

**Module:** MY ACCOUNT - LOGIN  
**Feature:** Authentication - Field Validation (Empty Username)  
**Test Plan ID:** TP-MA-LOGIN-004  
**Priority:** High  
**Created:** 2025-10-29  
**Environment:** http://practice.automationtesting.in/

---

## Objective

To verify that the login system properly validates required fields and displays appropriate error messages when a user attempts to login with an empty username field but provides a valid password. This test ensures the application enforces username requirements and provides clear user feedback.

---

## Scope

### In Scope
- Empty username field submission
- Password field population with valid credentials
- Error message validation for empty username
- Error message clarity and user guidance
- Form field state after validation error
- Multiple submission attempts with empty username
- Browser-level HTML5 validation (if present)
- Form accessibility after error

### Out of Scope
- Valid login scenarios (covered in Test Plan 01)
- Invalid credentials (covered in Test Plan 02)
- Empty password validation (covered in Test Plan 03)
- Both fields empty (future test plan)
- Password reset functionality
- Registration process

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
- Valid registered user account password available for testing
- No active session (logged out state)

---

## Test Data

| Field | Valid Value | Invalid Value | Notes |
|-------|-------------|---------------|-------|
| Username | N/A | (empty/blank) | No input provided |
| Password | Valid registered password | N/A | Use actual password |

**Test Credentials:**
- Username: Leave empty/blank
- Valid Password: Use registered account password (e.g., `TestPassword123!`)

---

## Test Scenarios

### TC-MA-LOGIN-004.1: Login with Empty Username and Valid Password (Basic Flow)

**Priority:** Critical  
**Type:** Negative Testing / Validation

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Handle consent dialog if present
4. Click on "My Account" menu
5. Verify navigation to My Account page
6. Verify login form is visible
7. Leave username field empty (do not enter any value)
8. Verify username field is blank
9. Enter valid registered password in password field
10. Verify password is entered (field shows masked dots/asterisks)
11. Click on "Login" button
12. Wait for validation response

**Expected Results:**

- Error message is displayed indicating username is required
- Error message should contain text like:
  - "Username is required"
  - "Please enter a username"
  - "The username field is empty"
  - "ERROR: The username field is empty"
  - "ERROR: Username is required"
- Error message is clearly visible and styled appropriately
- User is NOT logged in
- Login form remains visible and accessible
- Password field may retain masked value or be cleared (based on implementation)
- Username field remains empty and editable

**Pass Criteria:**
- ✅ Error message displayed
- ✅ Error message specifically mentions username requirement
- ✅ User not logged in
- ✅ Form remains accessible

**Fail Criteria:**
- ❌ No error message displayed
- ❌ Login succeeds without username
- ❌ Generic or unclear error message
- ❌ Form becomes inaccessible

---

### TC-MA-LOGIN-004.2: Error Message Content Validation

**Priority:** High  
**Type:** Content Validation

**Test Steps:**

1. Navigate to My Account page
2. Leave username field empty
3. Enter valid password
4. Click Login button
5. Capture and analyze error message

**Validation Points:**

- Error message is visible
- Error message uses appropriate styling (color, icon)
- Error message text is clear and specific
- Error message mentions "username" or "Username field"
- Error message indicates the field is "empty" or "required"
- Error message provides guidance (e.g., "Please enter your username")

**Expected Error Message Examples:**
```
"ERROR: The username field is empty."
"Username is required."
"Please fill in the username field."
"ERROR: Username cannot be blank."
"ERROR: A username is required to log in."
```

**Pass Criteria:**
- ✅ Error message clearly identifies username as the issue
- ✅ Message is user-friendly and actionable
- ✅ Proper formatting and styling applied

**Fail Criteria:**
- ❌ Vague or generic error message
- ❌ Error message doesn't mention username
- ❌ Poor formatting or invisible text

---

### TC-MA-LOGIN-004.3: Browser HTML5 Validation Check

**Priority:** Medium  
**Type:** Client-Side Validation

**Test Steps:**

1. Navigate to My Account page
2. Inspect username field for HTML5 attributes
3. Leave username empty
4. Enter valid password
5. Click Login button
6. Check if browser shows native validation

**Validation Points:**

- Check if username field has `required` attribute
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

### TC-MA-LOGIN-004.4: Multiple Attempts with Empty Username

**Priority:** Medium  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Leave username empty
3. Enter valid password
4. Click Login button
5. Verify error message
6. Click Login button again (without filling username)
7. Verify error message appears again
8. Fill username field with valid username
9. Click Login button
10. Verify successful login

**Expected Results:**

- First attempt: Error message displayed
- Second attempt: Error message displayed again
- Third attempt (with username): Login succeeds
- Form remains functional throughout
- No account lockout or throttling due to empty submissions

**Pass Criteria:**
- ✅ Error message displayed consistently
- ✅ Form remains accessible after multiple errors
- ✅ Login succeeds when username is provided

**Fail Criteria:**
- ❌ Form becomes non-functional
- ❌ Inconsistent error messages
- ❌ Cannot recover by filling username

---

### TC-MA-LOGIN-004.5: Form Field State After Error

**Priority:** High  
**Type:** Usability Testing

**Test Steps:**

1. Navigate to My Account page
2. Leave username empty
3. Enter valid password: `TestPassword123!`
4. Click Login button
5. After error appears, verify form state

**Field State Verification:**

**Username Field:**
- Should be empty
- Should be editable
- Should accept input
- Should be focusable

**Password Field:**
- May retain the entered value (masked) OR be cleared
- Should be editable
- Should accept input
- Should maintain type="password" (masked input)

**Login Button:**
- Should remain visible
- Should remain enabled
- Should be clickable

**Expected Results:**

- Username field is accessible and ready for input
- Password behavior depends on implementation (retention or clearing both acceptable)
- All fields remain accessible and editable
- User can correct the error and resubmit
- No fields are disabled or locked

**Pass Criteria:**
- ✅ Username field accessible
- ✅ All fields editable
- ✅ Login button functional

**Fail Criteria:**
- ❌ Form fields disabled
- ❌ Fields locked or inaccessible
- ❌ Cannot enter username after error

---

### TC-MA-LOGIN-004.6: Security Validation - Password Handling

**Priority:** High  
**Type:** Security Testing

**Test Steps:**

1. Navigate to My Account page
2. Leave username empty
3. Enter valid password
4. Click Login button
5. Verify error message
6. Check password field behavior

**Security Validation Points:**

- Password remains masked (type="password") after error
- Password is not visible in error message
- Password is not exposed in URL
- Password is not visible in browser console
- Error message doesn't reveal that password is valid

**Expected Results:**

- Error message focuses only on missing username
- No indication whether password is correct or not
- Password field maintains security (masked)
- No password leakage in any form

**Pass Criteria:**
- ✅ Password remains masked
- ✅ Error message doesn't reference password validity
- ✅ No password exposed in error or logs

**Fail Criteria:**
- ❌ Password becomes visible
- ❌ Error reveals password correctness
- ❌ Password leaked in any form

---

## Risk Assessment

### High Risk Areas
1. **Security:** Error message should not reveal password validity
2. **Usability:** Unclear error messages frustrate users
3. **Security:** Password should remain masked and secure after error

### Medium Risk Areas
1. **Browser Compatibility:** HTML5 validation may vary across browsers
2. **Accessibility:** Error messages must be accessible to screen readers
3. **UX:** Clearing password field unnecessarily frustrates users

### Low Risk Areas
1. **Styling:** Minor visual inconsistencies in error display
2. **Timing:** Slight delays in error message appearance

---

## Expected Behavior Summary

| Scenario | Expected Error Message | User Logged In? | Form State |
|----------|----------------------|-----------------|------------|
| Empty username + Valid password | "ERROR: The username field is empty" | ❌ No | Accessible, username empty |
| Empty username + Valid password (retry) | Same error message | ❌ No | Accessible, username empty |
| Valid username + Valid password | No error | ✅ Yes | Redirected to dashboard |

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria
- ✅ All critical scenarios (004.1, 004.2, 004.5, 004.6) pass
- ✅ Error message clearly indicates username is required
- ✅ Login does not succeed with empty username
- ✅ Form remains functional after error
- ✅ Password security maintained (remains masked)
- ✅ Error doesn't reveal password validity

### Overall Test Plan FAIL Criteria
- ❌ Any critical scenario fails
- ❌ Login succeeds without username
- ❌ No error message displayed
- ❌ Form becomes unusable after error
- ❌ Error message is misleading or unclear
- ❌ Password security compromised

---

## Defect Reporting Guidelines

**If validation fails, report with:**

**Title:** "Login validation allows empty username" or "No error for empty username field"

**Priority:** Critical

**Steps to Reproduce:**
1. Navigate to My Account
2. Leave username empty
3. Enter valid password: [do not specify actual password]
4. Click Login button

**Expected:** Error message: "ERROR: The username field is empty"

**Actual:** [Describe what happened - e.g., "Login succeeded" or "No error displayed"]

**Evidence:**
- Screenshot of form state
- Screenshot of error (or lack thereof)
- Browser console logs (ensure no sensitive data)
- Network request/response

---

## Test Execution Notes

### Setup
```bash
# Set valid test password
export TEST_PASSWORD="your-registered-password"

# Run test plan 04
npx playwright test "tests/MY ACCOUNT - LOGIN/4-login-empty-username-valid-password.spec.ts" --project=chromium
```

### Validation Checklist
- [ ] Valid registered password available
- [ ] Website accessible
- [ ] Browser properly configured
- [ ] Error message selectors identified
- [ ] Expected error text documented

---

## Related Test Plans

- **Test Plan 01:** Login with Valid Credentials (positive flow)
- **Test Plan 02:** Login with Incorrect Credentials
- **Test Plan 03:** Login with Valid Username and Empty Password
- **Test Plan 05:** Login with Both Fields Empty (future)

---

## Notes

- Empty username is a common user error (field skipped)
- Proper validation prevents unnecessary server requests
- Error messages should guide user toward successful login
- Password security must be maintained even when validation fails
- Error should not reveal whether password is correct (prevents enumeration)
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
