# Test Plan 05: My Account - Login with Empty Username and Empty Password

## Overview

**Module:** MY ACCOUNT - LOGIN  
**Feature:** Authentication - Field Validation (Both Fields Empty)  
**Test Plan ID:** TP-MA-LOGIN-005  
**Priority:** High  
**Created:** 2025-10-29  
**Environment:** http://practice.automationtesting.in/

---

## Objective

To verify that the login system properly validates required fields and displays appropriate error messages when a user attempts to login with both username and password fields empty. This test ensures the application enforces all required field validations and provides clear user feedback.

---

## Scope

### In Scope
- Empty username field submission
- Empty password field submission
- Error message validation for both empty fields
- Error message priority (which field error shows first)
- Error message clarity and user guidance
- Form field state after validation error
- Multiple submission attempts with both fields empty
- Browser-level HTML5 validation (if present)
- Form accessibility after error

### Out of Scope
- Valid login scenarios (covered in Test Plan 01)
- Invalid credentials (covered in Test Plan 02)
- Single empty field validation (covered in Test Plans 03 and 04)
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
- No active session (logged out state)

---

## Test Data

| Field | Valid Value | Invalid Value | Notes |
|-------|-------------|---------------|-------|
| Username | N/A | (empty/blank) | No input provided |
| Password | N/A | (empty/blank) | No input provided |

**Test Credentials:**
- Username: Leave empty/blank
- Password: Leave empty/blank

---

## Test Scenarios

### TC-MA-LOGIN-005.1: Login with Both Fields Empty (Basic Flow)

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
8. Leave password field empty (do not enter any value)
9. Verify both fields are blank
10. Click on "Login" button
11. Wait for validation response

**Expected Results:**

- Error message is displayed indicating required fields
- Error message should contain text like:
  - "Username is required" OR
  - "ERROR: Username is required" OR
  - "ERROR: The username field is empty" OR
  - Multiple error messages (one for username, one for password) OR
  - "Please fill in all required fields"
- Error message is clearly visible and styled appropriately
- User is NOT logged in
- Login form remains visible and accessible
- Both fields remain empty and editable

**Pass Criteria:**
- ✅ Error message displayed
- ✅ Error message mentions required field(s)
- ✅ User not logged in
- ✅ Form remains accessible

**Fail Criteria:**
- ❌ No error message displayed
- ❌ Login succeeds without credentials
- ❌ Generic or unclear error message
- ❌ Form becomes inaccessible

---

### TC-MA-LOGIN-005.2: Error Message Priority and Content

**Priority:** High  
**Type:** Content Validation

**Test Steps:**

1. Navigate to My Account page
2. Leave both username and password fields empty
3. Click Login button
4. Capture and analyze error message(s)

**Validation Points:**

- Error message is visible
- Determine which field error is shown first (if single error)
- Check if multiple errors are displayed simultaneously
- Error message uses appropriate styling (color, icon)
- Error message text is clear and specific
- Error provides guidance on what to do next

**Expected Error Message Examples:**

**Single Error (Priority):**
```
"ERROR: Username is required."
"ERROR: The username field is empty."
```

**Multiple Errors:**
```
"ERROR: Username is required."
"ERROR: Password is required."
```

**Combined Error:**
```
"ERROR: Username and Password are required."
"Please fill in all required fields."
```

**Pass Criteria:**
- ✅ At least one error message displayed
- ✅ Error clearly identifies the issue
- ✅ Message is user-friendly and actionable
- ✅ Proper formatting and styling applied

**Fail Criteria:**
- ❌ No error message
- ❌ Vague or generic error message
- ❌ Poor formatting or invisible text

---

### TC-MA-LOGIN-005.3: Browser HTML5 Validation Check

**Priority:** Medium  
**Type:** Client-Side Validation

**Test Steps:**

1. Navigate to My Account page
2. Inspect username and password fields for HTML5 attributes
3. Leave both fields empty
4. Click Login button
5. Check if browser shows native validation

**Validation Points:**

- Check if fields have `required` attribute
- Check if browser displays native validation tooltip
- Verify which field browser validates first
- Verify if form submission is prevented by browser
- Verify if custom validation runs after/before browser validation

**Expected Results:**

- Either browser validation prevents submission OR
- Application validation handles the empty fields
- Clear feedback provided to user either way
- Browser typically validates first field in DOM order

**Pass Criteria:**
- ✅ Validation occurs (browser or application)
- ✅ User receives clear feedback
- ✅ Empty submission is prevented

**Fail Criteria:**
- ❌ Form submits without validation
- ❌ No feedback provided to user

---

### TC-MA-LOGIN-005.4: Multiple Attempts with Both Fields Empty

**Priority:** Medium  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Leave both fields empty
3. Click Login button
4. Verify error message
5. Click Login button again (without filling fields)
6. Verify error message appears again
7. Fill both fields with valid credentials
8. Click Login button
9. Verify successful login

**Expected Results:**

- First attempt: Error message displayed
- Second attempt: Error message displayed again
- Third attempt (with credentials): Login succeeds
- Form remains functional throughout
- No account lockout or throttling due to empty submissions
- Error messages consistent across attempts

**Pass Criteria:**
- ✅ Error message displayed consistently
- ✅ Form remains accessible after multiple errors
- ✅ Login succeeds when credentials are provided

**Fail Criteria:**
- ❌ Form becomes non-functional
- ❌ Inconsistent error messages
- ❌ Cannot recover by filling fields

---

### TC-MA-LOGIN-005.5: Form Field State After Error

**Priority:** High  
**Type:** Usability Testing

**Test Steps:**

1. Navigate to My Account page
2. Leave both fields empty
3. Click Login button
4. After error appears, verify form state

**Field State Verification:**

**Username Field:**
- Should be empty
- Should be editable
- Should accept input
- Should be focusable
- Should have focus indicator

**Password Field:**
- Should be empty
- Should be editable
- Should accept input
- Should maintain type="password" (masked input)
- Should be focusable

**Login Button:**
- Should remain visible
- Should remain enabled
- Should be clickable

**Expected Results:**

- Both fields are accessible and ready for input
- All fields remain accessible and editable
- User can correct the error and resubmit
- No fields are disabled or locked
- Form maintains proper tab order

**Pass Criteria:**
- ✅ Both fields accessible
- ✅ All fields editable
- ✅ Login button functional

**Fail Criteria:**
- ❌ Form fields disabled
- ❌ Fields locked or inaccessible
- ❌ Cannot enter credentials after error

---

### TC-MA-LOGIN-005.6: Partial Field Completion Recovery

**Priority:** Medium  
**Type:** User Experience Testing

**Test Steps:**

1. Navigate to My Account page
2. Leave both fields empty
3. Click Login button
4. Verify error message
5. Fill only username field
6. Click Login button again
7. Verify error changes to password-specific error
8. Fill password field
9. Click Login button
10. Verify successful login

**Expected Results:**

- Initial error: Both fields or username required
- After username filled: Error changes to password required
- After both filled: Login succeeds
- Error messages update appropriately as fields are filled
- User receives progressive guidance

**Pass Criteria:**
- ✅ Error messages update as fields are filled
- ✅ Progressive validation provides guidance
- ✅ Login succeeds when all fields completed

**Fail Criteria:**
- ❌ Error messages don't update
- ❌ Validation doesn't adapt to field state
- ❌ Confusing or misleading feedback

---

## Risk Assessment

### High Risk Areas
1. **Usability:** Unclear error messages frustrate users
2. **Validation:** No validation allows empty form submission
3. **User Experience:** Users may not understand what to do next

### Medium Risk Areas
1. **Browser Compatibility:** HTML5 validation may vary across browsers
2. **Accessibility:** Error messages must be accessible to screen readers
3. **Error Priority:** Confusing if multiple errors shown incorrectly

### Low Risk Areas
1. **Styling:** Minor visual inconsistencies in error display
2. **Timing:** Slight delays in error message appearance

---

## Expected Behavior Summary

| Scenario | Expected Error Message | User Logged In? | Form State |
|----------|----------------------|-----------------|------------|
| Both fields empty | "ERROR: Username is required" OR multiple errors | ❌ No | Accessible, both fields empty |
| Both fields empty (retry) | Same error message | ❌ No | Accessible, both fields empty |
| Username filled, password empty | "ERROR: Password is required" | ❌ No | Accessible, username retained |
| Both filled (valid) | No error | ✅ Yes | Redirected to dashboard |

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria
- ✅ All critical scenarios (005.1, 005.2, 005.5) pass
- ✅ Error message clearly indicates required fields
- ✅ Login does not succeed with empty fields
- ✅ Form remains functional after error
- ✅ Error messages are clear and actionable

### Overall Test Plan FAIL Criteria
- ❌ Any critical scenario fails
- ❌ Login succeeds without credentials
- ❌ No error message displayed
- ❌ Form becomes unusable after error
- ❌ Error messages are misleading or unclear

---

## Defect Reporting Guidelines

**If validation fails, report with:**

**Title:** "Login validation allows empty form submission" or "No error for empty login fields"

**Priority:** Critical

**Steps to Reproduce:**
1. Navigate to My Account
2. Leave username empty
3. Leave password empty
4. Click Login button

**Expected:** Error message: "ERROR: Username is required" or similar

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
# Run test plan 05
npx playwright test "tests/MY ACCOUNT - LOGIN/5-login-empty-username-empty-password.spec.ts" --project=chromium
```

### Validation Checklist
- [ ] Website accessible
- [ ] Browser properly configured
- [ ] Error message selectors identified
- [ ] Expected error text documented
- [ ] Test accounts NOT needed (testing empty fields)

---

## Related Test Plans

- **Test Plan 01:** Login with Valid Credentials (positive flow)
- **Test Plan 02:** Login with Incorrect Credentials
- **Test Plan 03:** Login with Valid Username and Empty Password
- **Test Plan 04:** Login with Empty Username and Valid Password

---

## Notes

- Empty form submission is a common user error
- Proper validation prevents unnecessary server requests
- Error messages should guide user toward successful login
- Validation typically prioritizes first field (username) or shows both errors
- Browser HTML5 validation may provide first line of defense
- Application-level validation should always be present as backup
- This is the most basic validation test - all fields required

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-29 | Test Automation Team | Initial test plan creation |

---

**Test Plan Status:** Ready for Execution  
**Approval Required:** QA Lead  
**Estimated Execution Time:** 15 minutes
