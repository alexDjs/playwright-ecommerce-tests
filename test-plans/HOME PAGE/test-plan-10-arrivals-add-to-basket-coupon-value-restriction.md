# Test Plan 10: Home Page Arrivals Add to Basket - Coupon Value Restriction (< ₹450)

## Application Overview

This test plan validates the coupon system's minimum order value restriction functionality on the practice.automationtesting.in e-commerce platform. The specific focus is testing the "krishnasakinala" coupon code that requires a minimum order value of ₹450 to be eligible for the ₹50 discount.

## Test Objectives

- Verify coupon value restriction enforcement for orders below ₹450
- Validate error messaging when coupon requirements are not met
- Test user experience when attempting to apply restricted coupons
- Ensure proper coupon validation logic implementation

## Prerequisites

- Browser must be properly configured
- Internet connection available
- No previous session data or cookies affecting the test
- Starting from a fresh browser state

## Test Scenarios

### Scenario 1: Single Low-Value Product - Coupon Restriction Validation

**Test Case ID:** TC10.1  
**Priority:** High  
**Test Type:** Negative Testing - Coupon Value Restriction

**Objective:** Verify that the "krishnasakinala" coupon cannot be applied to orders with total value less than ₹450

**Pre-conditions:**
- Browser is launched and ready
- No items in shopping cart
- Fresh session state

**Test Steps:**

1. **Navigate to Application**
   - Open browser
   - Enter URL: `http://practice.automationtesting.in/`
   - Verify home page loads successfully

2. **Handle Consent Dialog** (if present)
   - Click "Do not consent" if consent dialog appears
   - Proceed to main page content

3. **Navigate Through Menu Structure**
   - Click on "Shop" menu item
   - Verify navigation to shop page
   - Click on "Home" menu button
   - Verify return to home page

4. **Verify Arrivals Section**
   - Locate the "new arrivals" section on home page
   - Verify exactly 3 arrival products are displayed
   - Confirm all arrival images are visible and properly loaded

5. **Select Low-Value Product**
   - Identify a product with price < ₹450 (typically the first arrival)
   - Click on the product image in the arrivals section
   - Verify navigation to product detail page
   - Confirm URL contains `/product/` path

6. **Add Product to Basket**
   - Locate "Add To Basket" button on product detail page
   - Verify button is enabled and clickable
   - Click "Add To Basket" button
   - Confirm product is added to cart

7. **Verify Cart Update**
   - Check menu cart icon for item count update
   - Verify cart shows "1 item" with correct pricing
   - Confirm total value is less than ₹450

8. **Navigate to Checkout**
   - Click on cart/item link in menu
   - Verify navigation to checkout/basket page
   - Confirm URL contains `/basket/`, `/cart/`, or `/checkout/`

9. **Verify Order Total**
   - Locate order total section
   - Confirm total amount is less than ₹450
   - Note the exact total amount for validation

10. **Attempt Coupon Application**
    - Locate coupon code input field
    - Enter coupon code: `krishnasakinala`
    - Click "Apply Coupon" or equivalent button
    - Wait for system response

11. **Validate Restriction Message**
    - Verify error message appears indicating minimum order requirement
    - Confirm message mentions ₹450 minimum order value requirement
    - Ensure coupon is NOT applied to the order
    - Verify total amount remains unchanged

**Expected Results:**
- Coupon application is rejected
- Clear error message displayed: "Minimum order amount for this coupon is ₹450" or similar
- Order total remains unchanged (no ₹50 discount applied)
- User is informed about the minimum order requirement
- Coupon input field may be cleared or remain filled for retry

**Success Criteria:**
- ✅ Error message clearly indicates minimum order value requirement
- ✅ Coupon discount is not applied to order totals
- ✅ Total amount remains at original value
- ✅ User experience is clear about why coupon failed

---

### Scenario 2: Multiple Products Testing Value Threshold

**Test Case ID:** TC10.2  
**Priority:** Medium  
**Test Type:** Boundary Testing - Coupon Value Threshold

**Objective:** Test coupon behavior when incrementally adding products to approach the ₹450 threshold

**Test Steps:**

1. **Initial Setup**
   - Navigate to `http://practice.automationtesting.in/`
   - Handle consent dialog if present
   - Navigate via Shop → Home menu path

2. **Add First Low-Value Product**
   - Click first arrival product image
   - Add to basket
   - Note product price and return to home

3. **Check Current Total**
   - Navigate to checkout page
   - Verify current total is < ₹450
   - Attempt to apply "krishnasakinala" coupon
   - Confirm rejection with appropriate error message

4. **Add Second Product**
   - Return to home page arrivals section
   - Click second arrival product image
   - Add to basket
   - Navigate to checkout

5. **Test Combined Total**
   - Verify new total amount
   - If still < ₹450: Attempt coupon application and verify rejection
   - If ≥ ₹450: Attempt coupon application and verify acceptance with ₹50 discount

6. **Continue Adding Products** (if needed)
   - Add third product if total is still < ₹450
   - Test coupon application at each threshold point
   - Document exact threshold behavior

**Expected Results:**
- Coupon consistently rejected when total < ₹450
- Coupon accepted when total ≥ ₹450
- Clear messaging at all threshold points
- Accurate total calculations throughout process

---

### Scenario 3: Edge Case Testing - Exact Threshold Value

**Test Case ID:** TC10.3  
**Priority:** High  
**Test Type:** Boundary Testing - Exact Threshold Validation

**Objective:** Test coupon behavior when order total equals exactly ₹450

**Prerequisites:**
- Ability to create order totaling exactly ₹450
- May require specific product combinations or quantities

**Test Steps:**

1. **Create Exact ₹450 Order**
   - Navigate through standard flow
   - Add products strategically to reach exactly ₹450 total
   - May require adjusting quantities if quantity controls are available

2. **Test Coupon at Exact Threshold**
   - Apply "krishnasakinala" coupon code
   - Verify coupon acceptance (₹450 should meet minimum requirement)
   - Confirm ₹50 discount is applied
   - Verify final total becomes ₹400

3. **Validate Final State**
   - Confirm discount line item appears in order summary
   - Verify total calculation accuracy
   - Check for any additional fees or charges

**Expected Results:**
- Coupon accepted for exactly ₹450 order value
- ₹50 discount properly applied
- Final total shows ₹400 (₹450 - ₹50)
- Clear confirmation messaging displayed

---

### Scenario 4: User Experience Validation - Clear Error Messaging

**Test Case ID:** TC10.4  
**Priority:** Medium  
**Test Type:** Usability Testing - Error Communication

**Objective:** Ensure error messages are user-friendly and provide clear guidance

**Test Steps:**

1. **Create Sub-Threshold Order**
   - Add single low-value product to cart (< ₹450)
   - Navigate to checkout page

2. **Test Error Message Quality**
   - Attempt to apply "krishnasakinala" coupon
   - Capture exact error message text
   - Evaluate message clarity and helpfulness

3. **Test User Guidance**
   - Verify if error message suggests how to meet minimum requirement
   - Check if message indicates specific minimum amount needed
   - Assess overall user experience

4. **Test Multiple Coupon Attempts**
   - Try applying coupon multiple times
   - Verify consistent error messaging
   - Check for any system instability

**Expected Results:**
- Error messages are clear and professional
- Users understand why coupon cannot be applied
- Guidance provided on how to meet requirements
- System remains stable through multiple attempts

## Test Data Requirements

### Product Information:
- **Product 1 (First Arrival):** Typically priced around ₹180-₹200
- **Product 2 (Second Arrival):** Typically priced around ₹150-₹180  
- **Product 3 (Third Arrival):** Typically priced around ₹200-₹250

### Coupon Information:
- **Coupon Code:** `krishnasakinala`
- **Discount Amount:** ₹50
- **Minimum Order Value:** ₹450
- **Expected Error Messages:** Variations of "Minimum order amount required" or "Order value too low"

## Pass/Fail Criteria

### PASS Criteria:
- ✅ Coupon is properly rejected for orders < ₹450
- ✅ Clear, informative error messages are displayed
- ✅ Order totals remain unchanged when coupon fails
- ✅ System behavior is consistent across multiple attempts
- ✅ Coupon works correctly when minimum threshold is met

### FAIL Criteria:
- ❌ Coupon is applied to orders below ₹450 minimum
- ❌ No error message or unclear error messaging
- ❌ System errors or crashes during coupon application
- ❌ Incorrect total calculations
- ❌ Inconsistent behavior between test attempts

## Risk Assessment

**High Risk Areas:**
- Coupon validation logic bypassing minimum value check
- Incorrect error message display or missing error handling
- Currency calculation errors affecting threshold detection

**Medium Risk Areas:**
- User experience confusion due to unclear messaging
- Performance issues during coupon validation process

**Mitigation Strategies:**
- Multiple test iterations with different product combinations
- Thorough validation of all error message scenarios
- Cross-browser testing to ensure consistent behavior

## Notes

- Test should be executed with fresh browser sessions to avoid cart persistence issues
- Product prices may vary; adjust test data accordingly if needed
- Document any deviations from expected behavior for development team review
- Consider testing with different browsers to ensure consistent coupon validation logic
