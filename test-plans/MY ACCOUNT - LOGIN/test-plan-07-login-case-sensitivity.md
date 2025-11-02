# Test Plan 07: My Account - Login - Handles Case Sensitive

## Overview

**Module:** MY ACCOUNT - LOGIN  
**Feature:** Security - Case Sensitivity Validation  
**Test Plan ID:** TP-MA-LOGIN-007  
**Priority:** High  
**Created:** 2025-10-29  
**Environment:** http://practice.automationtesting.in/

---

## Objective

To verify that the login system properly handles case sensitivity in username and password fields. This test ensures the application correctly rejects login attempts when credentials are entered with incorrect case, which is a fundamental security requirement.

---

## Scope

### In Scope
- Username case sensitivity validation
- Password case sensitivity validation
- Combined case change validation (both fields)
- Error message validation for incorrect case
- Case variations testing (uppercase, lowercase, mixed)
- Security validation (case-changed credentials should fail)

### Out of Scope
- Valid login scenarios (covered in Test Plan 01)
- Invalid credentials with different characters (covered in Test Plan 02)
- Empty field validation (covered in Test Plans 03, 04, 05)
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
- Valid registered user account credentials available for testing
- Know the exact case of registered credentials
- No active session (logged out state)

---

## Test Data

**Assumptions:**
- Registered Username: `testuser@example.com` (all lowercase)
- Registered Password: `TestPassword123!` (mixed case)

**Test Variations:**

| Test Case | Username | Password | Expected Result |
|-----------|----------|----------|-----------------|
| Valid (baseline) | `testuser@example.com` | `TestPassword123!` | ✅ Login succeeds |
| Username uppercase | `TESTUSER@EXAMPLE.COM` | `TestPassword123!` | ❌ Login fails |
| Username mixed case | `TestUser@Example.Com` | `TestPassword123!` | ❌ Login fails (or succeeds if email case-insensitive) |
| Password lowercase | `testuser@example.com` | `testpassword123!` | ❌ Login fails |
| Password uppercase | `testuser@example.com` | `TESTPASSWORD123!` | ❌ Login fails |
| Both uppercase | `TESTUSER@EXAMPLE.COM` | `TESTPASSWORD123!` | ❌ Login fails |
| Both mixed case | `TestUser@Example.Com` | `testPASSWORD123!` | ❌ Login fails |

---

## Test Scenarios

### TC-MA-LOGIN-007.1: Password Case Sensitivity - All Lowercase

**Priority:** Critical  
**Type:** Security Testing / Negative Testing

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Handle consent dialog if present
4. Click on "My Account" menu
5. Verify navigation to My Account page
6. Enter correct username: `testuser@example.com`
7. Enter password with changed case (all lowercase): `testpassword123!`
   - Original: `TestPassword123!`
   - Changed: `testpassword123!`
8. Click on "Login" button
9. Wait for response

**Expected Results:**

- Login should FAIL
- Error message displayed indicating incorrect credentials:
  - "ERROR: Incorrect username or password"
  - "ERROR: Invalid credentials"
  - "ERROR: The password you entered is incorrect"
- User is NOT logged in
- Login form remains visible
- Username may be retained in field

**Pass Criteria:**
- ✅ Login fails with case-changed password
- ✅ Error message displayed
- ✅ User not logged in

**Fail Criteria:**
- ❌ Login succeeds with incorrect case
- ❌ No error message displayed
- ❌ Case sensitivity not enforced

---

### TC-MA-LOGIN-007.2: Password Case Sensitivity - All Uppercase

**Priority:** Critical  
**Type:** Security Testing / Negative Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter correct username: `testuser@example.com`
3. Enter password with changed case (all uppercase): `TESTPASSWORD123!`
   - Original: `TestPassword123!`
   - Changed: `TESTPASSWORD123!`
4. Click Login button
5. Verify login fails

**Expected Results:**

- Login should FAIL
- Error message displayed
- User NOT logged in
- Form remains accessible

**Pass Criteria:**
- ✅ Login fails
- ✅ Error message displayed
- ✅ Case sensitivity enforced

**Fail Criteria:**
- ❌ Login succeeds
- ❌ Password treated as case-insensitive

---

### TC-MA-LOGIN-007.3: Username Case Sensitivity - All Uppercase

**Priority:** High  
**Type:** Security Testing / Negative Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter username with changed case (all uppercase): `TESTUSER@EXAMPLE.COM`
   - Original: `testuser@example.com`
   - Changed: `TESTUSER@EXAMPLE.COM`
3. Enter correct password: `TestPassword123!`
4. Click Login button
5. Verify login result

**Expected Results:**

**Note:** Email addresses are typically case-insensitive in most systems

**If email is case-insensitive (common):**
- Login may SUCCEED
- This is acceptable behavior for email usernames

**If email is case-sensitive (rare):**
- Login should FAIL
- Error message displayed

**Pass Criteria:**
- ✅ System behavior is consistent
- ✅ If fails: error message displayed
- ✅ If succeeds: email treated as case-insensitive (acceptable)

**Fail Criteria:**
- ❌ Inconsistent behavior
- ❌ No feedback to user

---

### TC-MA-LOGIN-007.4: Username Case Sensitivity - Mixed Case

**Priority:** High  
**Type:** Security Testing / Negative Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter username with changed case (mixed): `TestUser@Example.Com`
   - Original: `testuser@example.com`
   - Changed: `TestUser@Example.Com`
3. Enter correct password: `TestPassword123!`
4. Click Login button
5. Verify login result

**Expected Results:**

- Behavior depends on system implementation
- Most systems treat email usernames as case-insensitive
- Login may succeed (acceptable if email case-insensitive)
- If fails, error message should be displayed

**Pass Criteria:**
- ✅ Consistent behavior
- ✅ Clear feedback to user

**Fail Criteria:**
- ❌ Inconsistent behavior

---

### TC-MA-LOGIN-007.5: Both Username and Password Case Changed

**Priority:** Critical  
**Type:** Security Testing / Negative Testing

**Test Steps:**

1. Navigate to My Account page
2. Enter username with changed case: `TESTUSER@EXAMPLE.COM`
   - Original: `testuser@example.com`
   - Changed: `TESTUSER@EXAMPLE.COM`
3. Enter password with changed case: `TESTPASSWORD123!`
   - Original: `TestPassword123!`
   - Changed: `TESTPASSWORD123!`
4. Click Login button
5. Verify login fails

**Expected Results:**

- Login should FAIL (password case is always sensitive)
- Error message displayed: "ERROR: Incorrect username or password"
- User NOT logged in
- Form remains accessible

**Pass Criteria:**
- ✅ Login fails
- ✅ Error message displayed
- ✅ Both fields validated

**Fail Criteria:**
- ❌ Login succeeds
- ❌ Case sensitivity not enforced

---

### TC-MA-LOGIN-007.6: Password Case Sensitivity - Partial Case Change

**Priority:** High  
**Type:** Security Testing / Negative Testing

**Test Steps:**

Test multiple partial case changes:

**Test 1: First character uppercase changed to lowercase**
- Original: `TestPassword123!`
- Changed: `testPassword123!`
- Expected: Login fails

**Test 2: One middle character case changed**
- Original: `TestPassword123!`
- Changed: `TestpAssword123!`
- Expected: Login fails

**Test 3: Last letter case changed**
- Original: `TestPassword123!` (assuming last letter is 'T' before '!')
- Changed: `TestPassword123!` → `TestPassworD123!`
- Expected: Login fails

**Test 4: Multiple random characters case changed**
- Original: `TestPassword123!`
- Changed: `tEsTpAsSWoRd123!`
- Expected: Login fails

**Expected Results:**

- ANY case change in password should cause login to fail
- Error messages should be consistent
- System enforces strict password case sensitivity

**Pass Criteria:**
- ✅ All partial case changes rejected
- ✅ Consistent error messages
- ✅ Strict case sensitivity enforced

**Fail Criteria:**
- ❌ Some case changes allowed
- ❌ Inconsistent validation

---

### TC-MA-LOGIN-007.7: Case Sensitivity Error Message Consistency

**Priority:** Medium  
**Type:** Content Validation

**Test Steps:**

1. Test multiple case-changed login attempts
2. Collect error messages from each attempt
3. Analyze message consistency

**Attempts:**
- Attempt 1: Username uppercase, correct password
- Attempt 2: Correct username, password lowercase
- Attempt 3: Both fields case changed
- Attempt 4: Password partial case change

**Expected Results:**

- Error messages should be consistent
- Should not reveal which field is incorrect (security)
- Generic message like: "ERROR: Incorrect username or password"
- Should not say specifically "password case is wrong"

**Security Note:**
- Specific error messages can help attackers
- Generic errors are better security practice

**Pass Criteria:**
- ✅ Consistent error messages
- ✅ Generic error (doesn't reveal which field)
- ✅ No information leakage

**Fail Criteria:**
- ❌ Inconsistent messages
- ❌ Messages reveal which field is wrong
- ❌ Messages reveal case sensitivity details

---

### TC-MA-LOGIN-007.8: Case Sensitivity with Special Characters

**Priority:** Medium  
**Type:** Security Testing

**Test Steps:**

Test password with special characters and case changes:

**Original Password:** `P@ssw0rd!Test#123`

**Test variations:**
1. All lowercase: `p@ssw0rd!test#123`
2. All uppercase: `P@SSW0RD!TEST#123`
3. Reverse case: `p@SSW0RD!tEST#123`

**Expected Results:**

- Special characters remain unchanged (!, @, #, etc.)
- Letter case changes should cause failure
- Numbers remain unchanged (0, 1, 2, 3)
- Only alphabetic characters are case-sensitive

**Pass Criteria:**
- ✅ All case variations fail
- ✅ Special characters not affected
- ✅ Only letters are case-sensitive

**Fail Criteria:**
- ❌ Case changes allowed
- ❌ Special characters affected by case

---

## Risk Assessment

### Critical Risk Areas
1. **Security:** Weak case sensitivity allows easier password guessing
2. **Authentication:** Case-insensitive passwords reduce security
3. **Account Access:** Unauthorized access if case not enforced

### High Risk Areas
1. **Password Security:** Case-insensitive passwords are less secure
2. **Brute Force:** Easier attacks if case ignored
3. **User Confusion:** Inconsistent behavior confuses users

### Medium Risk Areas
1. **Email Standards:** Email addresses are typically case-insensitive
2. **User Experience:** Users may forget exact case
3. **Error Messages:** Balance security vs. user guidance

### Low Risk Areas
1. **Special Characters:** Not affected by case sensitivity

---

## Expected Behavior Summary

| Scenario | Username | Password | Expected Result |
|----------|----------|----------|-----------------|
| Correct credentials | `testuser@example.com` | `TestPassword123!` | ✅ Login succeeds |
| Password all lowercase | `testuser@example.com` | `testpassword123!` | ❌ Login fails |
| Password all uppercase | `testuser@example.com` | `TESTPASSWORD123!` | ❌ Login fails |
| Password partial case change | `testuser@example.com` | `TestpAssword123!` | ❌ Login fails |
| Username uppercase | `TESTUSER@EXAMPLE.COM` | `TestPassword123!` | ⚠️ May succeed (email case-insensitive) |
| Both case changed | `TESTUSER@EXAMPLE.COM` | `TESTPASSWORD123!` | ❌ Login fails |

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria
- ✅ All critical scenarios (007.1, 007.2, 007.5, 007.6) pass
- ✅ Password is case-sensitive (ANY case change fails)
- ✅ Error messages are consistent
- ✅ No unauthorized access with case changes
- ✅ Username behavior is consistent (case-sensitive or case-insensitive)

### Overall Test Plan FAIL Criteria
- ❌ Any critical scenario fails
- ❌ Password case-insensitivity (security issue)
- ❌ Login succeeds with case-changed password
- ❌ Inconsistent error messages
- ❌ Case sensitivity not enforced

---

## Defect Reporting Guidelines

**If case sensitivity fails, report with:**

**Title:** "Password case sensitivity not enforced - security vulnerability"

**Priority:** Critical

**Severity:** Security Issue

**Steps to Reproduce:**
1. Navigate to My Account
2. Enter correct username: `testuser@example.com`
3. Enter password with changed case: `testpassword123!` (should be `TestPassword123!`)
4. Click Login button

**Expected:** Login fails with error: "ERROR: Incorrect username or password"

**Actual:** [Describe what happened - e.g., "Login succeeded" or "No error displayed"]

**Evidence:**
- Screenshot of successful login with wrong case
- Video recording of login attempt
- Network logs showing authentication
- Browser and OS details

**Security Impact:** High - Reduces password security space, easier brute force attacks

---

## Test Execution Notes

### Setup
```bash
# Set valid test credentials with known case
export TEST_USERNAME="testuser@example.com"  # lowercase
export TEST_PASSWORD="TestPassword123!"      # mixed case

# Run test plan 07
npx playwright test "tests/MY ACCOUNT - LOGIN/7-login-case-sensitivity.spec.ts" --project=chromium
```

### Validation Checklist
- [ ] Know exact case of registered credentials
- [ ] Test username lowercase
- [ ] Test password mixed case documented
- [ ] Website accessible
- [ ] Browser properly configured

### Important Notes
- Document the EXACT case of test credentials
- Email addresses may be case-insensitive (acceptable)
- Passwords should ALWAYS be case-sensitive
- Use actual registered test account

---

## Related Test Plans

- **Test Plan 01:** Login with Valid Credentials (baseline)
- **Test Plan 02:** Login with Incorrect Credentials
- **Test Plan 06:** Password Masking Security

---

## Notes

- **Password case sensitivity is critical for security**
- Reduces password space if case-insensitive (52 letters → 26)
- Email addresses are commonly case-insensitive (RFC 5321)
- Username behavior may vary by implementation
- Error messages should be generic (don't reveal which field)
- Case sensitivity prevents easier brute force attacks
- This is a standard security requirement

---

## Security Best Practices

- **Passwords:** MUST be case-sensitive
- **Usernames (email):** Often case-insensitive (acceptable)
- **Error Messages:** Generic, don't reveal which field is wrong
- **Validation:** Server-side validation required
- **Consistency:** Behavior must be consistent

---

## Compliance & Standards

- **OWASP:** Recommends case-sensitive passwords
- **NIST:** Password guidelines include case sensitivity
- **Industry Standard:** Passwords are case-sensitive

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-29 | Test Automation Team | Initial test plan creation |

---

**Test Plan Status:** Ready for Execution  
**Approval Required:** Security Team, QA Lead  
**Estimated Execution Time:** 25 minutes
