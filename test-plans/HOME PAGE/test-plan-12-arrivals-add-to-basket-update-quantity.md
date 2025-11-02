# Test Plan 12: Home Page Arrivals Add to Basket - Update Book Quantity

## Application Overview

This test plan validates the quantity update functionality during the checkout process on the practice.automationtesting.in e-commerce platform. The focus is on testing the user's ability to modify the quantity of items in their cart/basket directly from the checkout page, including the dynamic "Update Basket" button activation and proper quantity calculations.

## Test Objectives

- Verify that users can successfully modify book quantities on checkout page
- Validate quantity textbox functionality and numeric input handling
- Test "Update Basket" button activation and behavior
- Ensure proper cart total recalculation after quantity updates
- Confirm quantity change persistence and user experience flow

## Prerequisites

- Browser must be properly configured
- Internet connection available
- No previous session data or cookies affecting the test
- Starting from a fresh browser state

## Test Scenarios

### Scenario 1: Basic Quantity Update - Increase Book Quantity

**Test Case ID:** TC12.1  
**Priority:** High  
**Test Type:** Functional Testing - Quantity Management

**Objective:** Verify that users can successfully increase book quantity from checkout page and system properly updates totals

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

5. **Select Product for Testing**
   - Choose any arrival product (typically first arrival for consistency)
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
   - Note the product name and price for validation

8. **Navigate to Checkout**
   - Click on cart/item link in menu
   - Verify navigation to checkout/basket page
   - Confirm URL contains `/basket/`, `/cart/`, or `/checkout/`

9. **Verify Initial Checkout State**
   - Confirm the added book is displayed in checkout grid/table
   - Verify product details (name, price, quantity = 1) are correct
   - Note the initial total amount

10. **Locate Quantity Controls**
    - Find the quantity textbox/input field for the product
    - Verify current quantity displays as "1"
    - Check that quantity field is editable

11. **Modify Quantity - Increase**
    - Click on quantity textbox to focus
    - Clear existing value (if needed)
    - Enter new quantity value (e.g., "3")
    - Verify new value is displayed in the textbox

12. **Verify Update Basket Button Activation**
    - Check that "Update Basket" button becomes clickable/enabled
    - Verify button visual state changes (if any)
    - Confirm button is no longer disabled

13. **Execute Update Action**
    - Click on "Update Basket" button
    - Wait for page/cart update processing
    - Verify system processes the quantity change

14. **Validate Quantity Update Results**
    - Confirm quantity textbox shows updated value
    - Verify line total reflects new quantity × unit price
    - Check that cart total is recalculated correctly
    - Ensure cart menu item reflects updated totals

15. **Verify User Experience Elements**
    - Check for any success messages or confirmations
    - Verify no error messages appear
    - Confirm page remains stable during update

**Expected Results:**
- Quantity textbox accepts numeric input correctly
- "Update Basket" button activates when quantity changes
- Cart totals recalculate accurately (quantity × unit price)
- Menu cart item reflects updated totals
- System provides clear feedback during update process
- No errors or unexpected behavior occurs

**Success Criteria:**
- ✅ Quantity modification works immediately and accurately
- ✅ Update Basket button activation is responsive
- ✅ Cart totals recalculate correctly
- ✅ User interface provides clear feedback
- ✅ Changes persist throughout session

---

### Scenario 2: Quantity Decrease and Edge Case Testing

**Test Case ID:** TC12.2  
**Priority:** High  
**Test Type:** Boundary Testing - Quantity Limits

**Objective:** Test quantity decrease functionality and validate edge cases like minimum quantities

**Test Steps:**

1. **Setup Initial State**
   - Follow standard flow to add product to cart
   - Navigate to checkout page
   - Increase quantity to 3 (using TC12.1 steps)

2. **Test Quantity Decrease**
   - Modify quantity from 3 to 2
   - Click "Update Basket"
   - Verify totals decrease accordingly

3. **Test Minimum Quantity Boundary**
   - Modify quantity to 1
   - Verify system accepts minimum quantity
   - Test with quantity 0
   - Verify system behavior (should remove item or show error)

4. **Test Invalid Input Handling**
   - Try entering non-numeric values (letters, symbols)
   - Test negative numbers
   - Test very large numbers
   - Verify system validation and error handling

**Expected Results:**
- Quantity decrease works correctly
- Minimum quantity (1) is handled properly
- Zero quantity either removes item or shows appropriate message
- Invalid inputs are handled gracefully with clear error messages
- System prevents invalid operations

---

### Scenario 3: Multiple Products Quantity Management

**Test Case ID:** TC12.3  
**Priority:** Medium  
**Test Type:** Multiple Item Management

**Objective:** Test quantity updates when multiple different products are in cart

**Test Steps:**

1. **Add Multiple Products**
   - Add first arrival product to cart
   - Add second arrival product to cart
   - Navigate to checkout with 2 different products

2. **Test Individual Product Updates**
   - Modify quantity of first product
   - Verify "Update Basket" button activates
   - Update basket and verify only first product quantity changes
   - Repeat for second product

3. **Test Simultaneous Updates**
   - Modify quantities of both products
   - Verify single "Update Basket" click updates all changes
   - Confirm total calculations account for all products

**Expected Results:**
- Individual product quantity updates work independently
- Multiple product updates can be processed together
- Cart totals reflect all quantity changes correctly
- Update button handles multiple changes efficiently

---

### Scenario 4: Update Basket Button States and User Experience

**Test Case ID:** TC12.4  
**Priority:** Medium  
**Test Type:** User Interface Testing

**Objective:** Validate Update Basket button behavior and user experience elements

**Test Steps:**

1. **Initial Button State Testing**
   - Add product to cart and navigate to checkout
   - Verify "Update Basket" button initial state (likely disabled)
   - Check button styling and accessibility

2. **Button Activation Testing**
   - Modify quantity value
   - Verify immediate button activation
   - Test button visual feedback (color, hover effects)

3. **Update Process Testing**
   - Click "Update Basket" and monitor loading states
   - Check for loading indicators or progress feedback
   - Verify button state during processing

4. **Post-Update State Testing**
   - Verify button returns to appropriate state after update
   - Test multiple consecutive updates
   - Check for any performance issues

**Expected Results:**
- Button states are clear and intuitive
- Visual feedback guides user through update process
- Loading/processing states are communicated effectively
- Multiple updates work consistently

## Test Data Requirements

### Product Information:
- **Test Products:** Any of the 3 arrival products from home page
- **Price Ranges:** Typically ₹150-₹500 per product
- **Quantity Test Values:** 1, 2, 3, 5, 10 (for positive testing)
- **Invalid Values:** 0, -1, "abc", "!@#", 999999 (for negative testing)

### Expected Calculations:
- **Line Total:** Quantity × Unit Price
- **Cart Total:** Sum of all line totals
- **Tax/Shipping:** May be added to cart total (note if applicable)

### UI Elements:
- **Quantity Input:** Usually `input[type="number"]` or `input[name="quantity"]`
- **Update Button:** Common selectors include `[name="update_cart"]`, `.button.update`
- **Total Displays:** `.cart-subtotal`, `.order-total`, `.amount`

## Pass/Fail Criteria

### PASS Criteria:
- ✅ Quantity textbox accepts valid numeric input
- ✅ "Update Basket" button activates when quantities change
- ✅ Cart totals recalculate correctly after updates
- ✅ Menu cart item reflects updated quantities and totals
- ✅ Multiple product quantity updates work properly
- ✅ System handles edge cases gracefully
- ✅ User interface provides clear feedback throughout process

### FAIL Criteria:
- ❌ Quantity changes don't update totals correctly
- ❌ "Update Basket" button doesn't activate or work
- ❌ Invalid input causes system crashes or errors
- ❌ Calculations are incorrect or inconsistent
- ❌ Multiple product updates interfere with each other
- ❌ User interface is confusing or unresponsive
- ❌ Changes don't persist or get lost

## Risk Assessment

**High Risk Areas:**
- Calculation errors in quantity × price mathematics
- Update button not activating properly
- System allowing invalid quantities (negative, zero for non-removable items)

**Medium Risk Areas:**
- Performance issues with multiple rapid updates
- User experience confusion during update process
- Quantity limits not properly enforced

**Mitigation Strategies:**
- Test with various quantity values and product combinations
- Verify calculations manually against automated results
- Test rapid successive updates for race conditions
- Validate all edge cases and boundary values

## Browser Compatibility

- **Primary Testing:** Chrome/Chromium (as specified in Playwright config)
- **Quantity Input Support:** Verify numeric input behavior across browsers
- **JavaScript Functionality:** Ensure update mechanisms work consistently

## Notes

- Some systems may have maximum quantity limits per product
- Update button behavior may vary (immediate activation vs. change detection)
- Cart totals may include tax/shipping calculations
- Consider testing with products that have different price formats
- Monitor for any quantity rounding issues with decimal inputs
- Document specific error messages for invalid inputs

## Related Test Plans

- **Test Plan 6:** Basic Add to Basket functionality (prerequisite)
- **Test Plan 8:** Checkout Items functionality (related cart operations)
- **Test Plan 11:** Remove Book functionality (related cart modifications)
- **Test Plan 9-10:** Coupon functionality (quantity may affect coupon eligibility)
