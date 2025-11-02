# Test Plan 06: My Account - Login - Password Should Be Masked

## Overview

**Module:** MY ACCOUNT - LOGIN  
**Feature:** Security - Password Field Masking  
**Test Plan ID:** TP-MA-LOGIN-006  
**Priority:** Critical  
**Created:** 2025-10-29  
**Environment:** http://practice.automationtesting.in/

---

## Objective

To verify that the password field properly masks user input to protect sensitive information from being visible on the screen. This test ensures the application implements proper security measures by displaying password characters as asterisks, bullets, or dots instead of plain text.

---

## Scope

### In Scope
- Password field type attribute validation (type="password")
- Visual masking of password characters
- Masking behavior during input
- Masking persistence after input
- Masking across different browsers
- Password field behavior on focus/blur
- Copy-paste functionality with masked field
- Password visibility toggle (if present)

### Out of Scope
- Password strength validation
- Actual login functionality (covered in other test plans)
- Password reset functionality
- Browser autofill behavior
- Third-party password managers

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

| Test Case | Input Password | Expected Display | Notes |
|-----------|---------------|------------------|-------|
| TC-006.1 | SimplePass123 | ••••••••••••• (13 bullets) | Basic alphanumeric |
| TC-006.2 | P@ssw0rd! | •••••••• (9 bullets) | Special characters |
| TC-006.3 | 12345 | ••••• (5 bullets) | Numbers only |
| TC-006.4 | a | • (1 bullet) | Single character |
| TC-006.5 | VeryLongPasswordWith50Characters123456789012345 | •••••••••••••••••••••••••••••••••••••••••••••• | Long password |

---

## Test Scenarios

### TC-MA-LOGIN-006.1: Password Field Type Attribute Validation

**Priority:** Critical  
**Type:** Security Testing

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Handle consent dialog if present
4. Click on "My Account" menu
5. Verify navigation to My Account page
6. Locate password field
7. Inspect password field HTML attributes
8. Verify `type="password"` attribute is set

**Expected Results:**

- Password field is present on the page
- Password field has `type="password"` attribute
- Field is identifiable as a password input
- Field does not have `type="text"` attribute

**Validation:**

```javascript
const passwordField = page.locator('#password, input[name="password"]');
const fieldType = await passwordField.getAttribute('type');
// Expected: fieldType === 'password'
```

**Pass Criteria:**
- ✅ Password field `type="password"`
- ✅ Attribute is present and correct

**Fail Criteria:**
- ❌ Password field has `type="text"`
- ❌ Type attribute is missing
- ❌ Field displays plain text

---

### TC-MA-LOGIN-006.2: Visual Password Masking During Input

**Priority:** Critical  
**Type:** Security Testing / Visual Validation

**Test Steps:**

1. Navigate to My Account page
2. Click on password field to focus it
3. Type password: `SimplePass123`
4. Observe visual display while typing
5. Verify characters are masked as they are entered

**Expected Results:**

- Each character appears briefly (optional browser behavior) then is masked
- Masked characters display as:
  - Bullets (•)
  - Asterisks (*)
  - Dots (●)
  - Or other non-alphanumeric symbols
- No plain text characters remain visible after typing
- Field shows masked representation: `•••••••••••••` (13 characters)

**Visual Check:**
- Password input area does not show readable characters
- Masking symbols are consistently displayed
- Character count matches input length (when visible)

**Pass Criteria:**
- ✅ Characters are masked
- ✅ Plain text not visible
- ✅ Masking is immediate (or very brief delay acceptable)

**Fail Criteria:**
- ❌ Characters remain visible as plain text
- ❌ Password is readable on screen
- ❌ Masking fails or is inconsistent

---

### TC-MA-LOGIN-006.3: Password Masking with Different Character Types

**Priority:** High  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Test multiple password variations:

**Test 1: Alphanumeric with special characters**
- Enter: `P@ssw0rd!`
- Expected: `•••••••••` (9 masked characters)

**Test 2: Numbers only**
- Clear field
- Enter: `12345`
- Expected: `•••••` (5 masked characters)

**Test 3: Special characters**
- Clear field
- Enter: `!@#$%^&*()`
- Expected: `••••••••••` (10 masked characters)

**Test 4: Mixed case letters**
- Clear field
- Enter: `AbCdEfGh`
- Expected: `••••••••` (8 masked characters)

**Test 5: Spaces (if allowed)**
- Clear field
- Enter: `Pass Word`
- Expected: `•••••••••` (9 masked characters including space)

**Expected Results:**

- All character types are masked equally
- No special treatment for numbers, letters, or symbols
- Masking is consistent regardless of character type
- Character count preserved

**Pass Criteria:**
- ✅ All character types masked
- ✅ Consistent masking behavior
- ✅ No characters visible

**Fail Criteria:**
- ❌ Some character types not masked
- ❌ Inconsistent masking behavior
- ❌ Any readable characters

---

### TC-MA-LOGIN-006.4: Password Masking Persistence

**Priority:** High  
**Type:** Security Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter password: `TestPassword123`
3. Verify password is masked
4. Click outside password field (blur)
5. Verify password remains masked
6. Click back into password field (focus)
7. Verify password remains masked
8. Navigate to different field (username)
9. Return to password field
10. Verify password still masked

**Expected Results:**

- Password remains masked after losing focus
- Password remains masked when regaining focus
- Password remains masked during navigation between fields
- Masking persists throughout the session
- No plain text exposure at any point

**Pass Criteria:**
- ✅ Masking persists on blur
- ✅ Masking persists on re-focus
- ✅ No plain text exposure

**Fail Criteria:**
- ❌ Password becomes visible on blur
- ❌ Plain text shown on focus
- ❌ Masking breaks during navigation

---

### TC-MA-LOGIN-006.5: Password Field Length and Masking

**Priority:** Medium  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Test passwords of varying lengths:

**Single Character:**
- Enter: `a`
- Expected: `•` (1 masked character)

**Short Password (5 chars):**
- Enter: `Pass1`
- Expected: `•••••` (5 masked characters)

**Medium Password (12 chars):**
- Enter: `Password123!`
- Expected: `••••••••••••` (12 masked characters)

**Long Password (30 chars):**
- Enter: `VeryLongPasswordForTestingPur1`
- Expected: `••••••••••••••••••••••••••••••` (30 masked characters)

**Very Long Password (50+ chars):**
- Enter: `SuperLongPasswordWithFiftyCharactersForSecurityTest12`
- Expected: All characters masked (54 masked characters)

**Expected Results:**

- Masking works for passwords of any length
- Single character is masked
- Very long passwords are fully masked
- No character limit breaks masking
- Field accommodates various password lengths

**Pass Criteria:**
- ✅ All lengths properly masked
- ✅ Single character masked
- ✅ Long passwords fully masked

**Fail Criteria:**
- ❌ Short passwords not masked
- ❌ Long passwords break masking
- ❌ Character limit issues

---

### TC-MA-LOGIN-006.6: Password Visibility Toggle (If Present)

**Priority:** Medium  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Check for "Show Password" / "Eye" icon
3. If present:
   - Enter password: `TestPassword123`
   - Verify password is masked
   - Click "Show Password" icon
   - Verify password becomes visible: `TestPassword123`
   - Click icon again to hide
   - Verify password is masked again

4. If not present:
   - Document that no toggle exists
   - Confirm password remains masked at all times

**Expected Results:**

**If toggle present:**
- Toggle icon is visible and clickable
- Clicking toggle reveals password in plain text
- Clicking again re-masks password
- Toggle state is clear to user
- Icon changes to indicate state (e.g., eye vs. crossed-eye)

**If toggle not present:**
- Password remains masked permanently
- No way to reveal password
- This is acceptable security practice

**Pass Criteria:**
- ✅ If toggle present: works correctly
- ✅ If no toggle: password always masked
- ✅ Toggle provides clear feedback

**Fail Criteria:**
- ❌ Toggle present but doesn't work
- ❌ Password reveals without user action
- ❌ Toggle state unclear

---

### TC-MA-LOGIN-006.7: Password Field Security - Developer Tools Check

**Priority:** High  
**Type:** Security Testing

**Test Steps:**

1. Navigate to My Account page
2. Open browser Developer Tools (F12)
3. Inspect password field element
4. Enter password: `SecurePassword123!`
5. Check if password value is visible in DOM
6. Verify field `type` attribute remains "password"

**Expected Results:**

- Field type remains `type="password"`
- While value is stored in DOM (normal behavior), it's not visually displayed
- Developer Tools may show value attribute, but this is expected
- Field does not change to `type="text"` automatically
- No JavaScript errors exposing password

**Security Notes:**
- DOM value storage is normal and necessary for form submission
- The critical security measure is visual masking (type="password")
- Preventing DOM inspection is not the goal
- Focus is on protecting from casual observation

**Pass Criteria:**
- ✅ Field remains `type="password"`
- ✅ Visual masking maintained
- ✅ No automatic type changes

**Fail Criteria:**
- ❌ Field changes to `type="text"`
- ❌ Password visible on screen
- ❌ JavaScript errors break masking

---

### TC-MA-LOGIN-006.8: Copy-Paste with Masked Password

**Priority:** Medium  
**Type:** Functional Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter password: `CopyPasteTest123`
3. Verify password is masked
4. Select all text in password field (Ctrl+A)
5. Copy text (Ctrl+C)
6. Clear password field
7. Paste text (Ctrl+V)
8. Verify pasted password is masked

**Expected Results:**

- Password selection works (even though masked)
- Copy operation succeeds
- Clipboard contains actual password (not masked characters)
- Pasted password is immediately masked
- Functionality preserved despite masking

**Pass Criteria:**
- ✅ Copy works from masked field
- ✅ Paste results in masked display
- ✅ Clipboard contains actual password

**Fail Criteria:**
- ❌ Copy-paste fails
- ❌ Pasted text not masked
- ❌ Clipboard contains masked characters

---

## Risk Assessment

### Critical Risk Areas
1. **Security:** Password visible on screen exposes credentials
2. **Privacy:** Shoulder surfing attacks if password not masked
3. **Compliance:** Violates security best practices if unmasked

### High Risk Areas
1. **User Trust:** Unmasked passwords damage user confidence
2. **Data Exposure:** Screenshots or recordings capture passwords
3. **Public Use:** Particularly dangerous on shared computers

### Medium Risk Areas
1. **Browser Compatibility:** Masking may vary across browsers
2. **Accessibility:** Screen readers still need to handle password fields

### Low Risk Areas
1. **Aesthetic:** Masking character style (bullet vs asterisk)

---

## Expected Behavior Summary

| Action | Password Field Type | Visual Display | Security |
|--------|-------------------|----------------|----------|
| Initial state | `type="password"` | Empty field | ✅ Secure |
| During typing | `type="password"` | `•••••` (masked) | ✅ Secure |
| After blur | `type="password"` | `•••••` (masked) | ✅ Secure |
| After focus | `type="password"` | `•••••` (masked) | ✅ Secure |
| If visible toggle ON | `type="text"` | `ActualPassword` | ⚠️ User choice |
| If visible toggle OFF | `type="password"` | `•••••` (masked) | ✅ Secure |

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria
- ✅ All critical scenarios (006.1, 006.2, 006.4, 006.7) pass
- ✅ Password field has `type="password"` attribute
- ✅ Password characters are visually masked
- ✅ Masking persists throughout user interaction
- ✅ All character types are masked equally
- ✅ No plain text password visible on screen

### Overall Test Plan FAIL Criteria
- ❌ Any critical scenario fails
- ❌ Password field has `type="text"`
- ❌ Password characters visible on screen
- ❌ Masking breaks or fails
- ❌ Plain text exposure at any point

---

## Defect Reporting Guidelines

**If masking fails, report with:**

**Title:** "Password field not masked - security vulnerability"

**Priority:** Critical

**Severity:** Security Issue

**Steps to Reproduce:**
1. Navigate to My Account page
2. Click password field
3. Enter any password (e.g., "TestPassword123")
4. Observe password display

**Expected:** Password characters displayed as `•••••••••••••` (masked)

**Actual:** [Describe what is visible - e.g., "Password visible as plain text"]

**Evidence:**
- Screenshot showing visible password (blur actual password in report)
- Browser DevTools screenshot showing `type` attribute
- Browser version and OS
- Video recording if masking intermittently fails

**Security Impact:** High - Password visible to anyone viewing screen

---

## Test Execution Notes

### Setup
```bash
# Run test plan 06
npx playwright test "tests/MY ACCOUNT - LOGIN/6-login-password-masking.spec.ts" --project=chromium
```

### Validation Checklist
- [ ] Website accessible
- [ ] Browser properly configured
- [ ] Password field identified
- [ ] Type attribute can be inspected
- [ ] No actual sensitive passwords used in testing

### Security Notes
- Use test passwords only (never real credentials)
- This test focuses on visual security (masking)
- DOM inspection is expected and normal
- Screenshots should not show actual passwords

---

## Related Test Plans

- **Test Plan 01:** Login with Valid Credentials
- **Test Plan 02:** Login with Incorrect Credentials
- **Test Plan 03:** Login with Valid Username and Empty Password
- **Test Plan 04:** Login with Empty Username and Valid Password
- **Test Plan 05:** Login with Both Fields Empty

---

## Notes

- Password masking is a fundamental security requirement
- Masking protects against shoulder surfing and screen capture
- `type="password"` is the standard HTML attribute for masking
- Some modern browsers may briefly show last typed character (acceptable)
- Password visibility toggles are becoming common UX pattern
- Masking does not encrypt password (encryption happens during transmission)
- This test is purely about visual security on the client side

---

## Compliance & Standards

- **OWASP:** Password masking is recommended security practice
- **WCAG:** Password fields must be accessible (type="password" compatible with screen readers)
- **Common Practice:** Industry standard for login forms

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-29 | Test Automation Team | Initial test plan creation |

---

**Test Plan Status:** Ready for Execution  
**Approval Required:** Security Team, QA Lead  
**Estimated Execution Time:** 20 minutes
