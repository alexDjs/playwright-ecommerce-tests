# Test Plan 14: Home Page Arrivals - Add to Basket - Update Basket at Checkout

## Test Plan Information

**Test Plan ID:** TP-014  
**Test Plan Name:** Home Page Arrivals - Add to Basket - Update Basket at Checkout  
**Application:** Practice Automation Testing Website  
**Module:** E-commerce - Shopping Cart - Checkout Update Functionality  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website provides a WooCommerce-based e-commerce platform for testing purposes. This test plan focuses on validating the **Update Basket** functionality during the checkout process, ensuring users can modify item quantities and update their cart before completing their purchase.

### Key Features Tested:
- **Quantity Modification**: Ability to change product quantities in the checkout page
- **Update Basket Button**: Activation and functionality of the update mechanism
- **Dynamic Updates**: Real-time reflection of quantity changes in pricing
- **User Experience**: Intuitive cart management during checkout process
- **Cart Recalculation**: Accurate price updates after quantity modifications

---

## Test Objectives

1. **Validate Quantity Input Field**: Verify users can interact with quantity textbox in checkout
2. **Test Update Button Activation**: Confirm "Update Basket" button becomes clickable after quantity changes
3. **Verify Price Recalculation**: Ensure prices update correctly after basket update
4. **Test User Workflow**: Validate the complete flow from product addition to basket update
5. **Assess Usability**: Evaluate the ease of modifying cart contents at checkout

---

## Scope

### In Scope:
- Adding products from "new arrivals" section to basket
- Navigating to checkout page
- Modifying quantity values in checkout
- Activating and clicking "Update Basket" button
- Verifying price and cart updates
- Testing single and multiple quantity changes
- Validating button state transitions (disabled → enabled)

### Out of Scope:
- Payment processing
- User authentication
- Product inventory validation
- Shipping calculations
- Coupon application during update
- Remove functionality (covered in Test Plan 11)
- Multi-product scenarios
- Edge cases like zero or negative quantities (covered in Test Plan 12)

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - At least 3 products in "new arrivals" section

---

## Test Scenarios

### Scenario 1: Update Basket Button Activation on Quantity Change

**Test Case ID:** TC14.1  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the "Update Basket" button transitions from disabled to enabled state when the quantity is modified in the checkout page.

**Preconditions:**
- Browser is open
- Website is accessible
- At least one product is available in arrivals section

**Test Steps:**

1. Open browser
2. Navigate to `http://practice.automationtesting.in/`
3. Click on "Shop" menu
4. Click on "Home" menu button
5. Verify home page displays exactly 3 arrivals
6. Click on the first arrival image
7. Verify navigation to product detail page
8. Click "Add To Basket" button
9. Verify product appears in cart menu with price
10. Click on cart item link to navigate to checkout
11. Locate the quantity textbox in checkout page
12. Note the current "Update Basket" button state (should be disabled/non-clickable)
13. Modify the quantity value in the textbox (e.g., change from 1 to 2)
14. Verify "Update Basket" button becomes enabled/clickable
15. Observe button visual state change

**Expected Results:**
- "Update Basket" button is initially disabled or visually inactive
- After quantity modification, button becomes enabled
- Button shows visual indication of being clickable (e.g., color change, cursor change)
- No errors or console warnings appear

**Pass Criteria:**
- ✅ Button state transitions from disabled to enabled
- ✅ Visual feedback is clear and immediate
- ✅ Button is clickable after quantity change
- ✅ No JavaScript errors in console

**Fail Criteria:**
- ❌ Button remains disabled after quantity change
- ❌ No visual indication of button state change
- ❌ Button does not respond to clicks
- ❌ Console errors appear

---

### Scenario 2: Successful Basket Update with Price Recalculation

**Test Case ID:** TC14.2  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Validate that clicking "Update Basket" button successfully updates the cart and recalculates all prices based on the new quantity.

**Preconditions:**
- Product added to basket
- Checkout page is open
- Quantity has been modified

**Test Steps:**

1. Open browser and navigate to `http://practice.automationtesting.in/`
2. Navigate via Shop → Home
3. Verify 3 arrivals are displayed
4. Note the price of the first arrival product (let's call it P)
5. Click on first arrival image
6. Click "Add To Basket" button
7. Verify cart shows "1 item - ₹P"
8. Click cart to navigate to checkout
9. Verify initial quantity is 1
10. Verify initial subtotal is ₹P
11. Verify initial total matches subtotal
12. Change quantity from 1 to 3 in the textbox
13. Click "Update Basket" button
14. Wait for page update/refresh
15. Verify quantity now shows 3
16. Verify line total shows ₹(P × 3)
17. Verify subtotal shows ₹(P × 3)
18. Verify final total reflects the updated amount

**Expected Results:**
- Quantity updates from 1 to 3
- Line total = Original Price × 3
- Subtotal = Original Price × 3
- Final total includes updated subtotal
- Cart menu updates to show new item count and total
- No error messages displayed
- Update happens smoothly without broken states

**Pass Criteria:**
- ✅ Quantity reflects new value (3)
- ✅ All prices calculated correctly (P × 3)
- ✅ Cart totals are accurate
- ✅ Page updates without errors
- ✅ Cart menu shows updated information

**Fail Criteria:**
- ❌ Quantity doesn't update
- ❌ Prices remain unchanged
- ❌ Calculation errors in totals
- ❌ Error messages appear
- ❌ Page breaks or enters invalid state

---

### Scenario 3: Multiple Sequential Basket Updates

**Test Case ID:** TC14.3  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that users can perform multiple consecutive basket updates without issues, and each update correctly reflects in the cart.

**Preconditions:**
- Product in basket
- Checkout page accessible

**Test Steps:**

1. Navigate to website and add a product to basket (following steps 1-11 from previous scenarios)
2. In checkout, note initial quantity: Q1 = 1
3. Change quantity to Q2 = 3
4. Click "Update Basket"
5. Verify quantity shows 3 and price = P × 3
6. Change quantity to Q3 = 5
7. Verify "Update Basket" button becomes enabled again
8. Click "Update Basket"
9. Verify quantity shows 5 and price = P × 5
10. Change quantity to Q4 = 2
11. Click "Update Basket"
12. Verify quantity shows 2 and price = P × 2
13. Verify cart menu reflects the final quantity and price

**Expected Results:**
- Each update operation completes successfully
- Prices recalculate correctly for each quantity change
- "Update Basket" button re-enables after each modification
- System handles multiple updates without performance degradation
- Final state accurately reflects the last update

**Pass Criteria:**
- ✅ All three updates execute successfully
- ✅ Prices are accurate after each update
- ✅ Button activation works for each change
- ✅ No cumulative errors or state issues
- ✅ Final cart state is correct

**Fail Criteria:**
- ❌ Any update fails to process
- ❌ Price calculations become incorrect
- ❌ Button stops activating
- ❌ System becomes unresponsive
- ❌ Cart enters invalid state

---

### Scenario 4: Update Basket User Experience and Validation

**Test Case ID:** TC14.4  
**Priority:** Medium  
**Type:** Usability Testing  

**Objective:**  
Assess the user experience of the basket update functionality, including visual feedback, button states, and interaction patterns.

**Preconditions:**
- Product added to basket
- Checkout page displayed

**Test Steps:**

1. Navigate to checkout page with one product
2. **Initial State Assessment:**
   - Observe "Update Basket" button appearance
   - Check if button is visually disabled (grayed out, different color)
   - Verify cursor type when hovering over disabled button
3. **Quantity Field Interaction:**
   - Click on quantity textbox
   - Verify field is editable
   - Test typing a new value
   - Test using increment/decrement arrows (if present)
4. **Button State Transition:**
   - Modify quantity value
   - Observe immediate button state change
   - Check for visual cues (color change, opacity change)
   - Verify cursor changes to pointer on hover
5. **Update Process:**
   - Click "Update Basket" button
   - Observe any loading indicators
   - Check for success message or confirmation
   - Verify smooth transition to updated state
6. **Post-Update State:**
   - Verify button returns to disabled state
   - Check that all updated values are clearly displayed
   - Confirm no confusing UI elements remain

**Expected Results:**
- Clear visual distinction between enabled/disabled button states
- Quantity field is easily editable
- Button activation is immediate upon quantity change
- Update process provides feedback (loading indicator or quick refresh)
- Updated values are clearly visible
- Overall experience is intuitive and smooth

**Pass Criteria:**
- ✅ Button states are visually distinct and clear
- ✅ Quantity field is user-friendly
- ✅ Immediate feedback on interactions
- ✅ Update process is smooth
- ✅ No confusing or misleading UI elements

**Fail Criteria:**
- ❌ Button states are unclear or ambiguous
- ❌ Quantity field is difficult to edit
- ❌ No feedback during update process
- ❌ Updates cause page flickering or jarring transitions
- ❌ UI elements are confusing

---

## Test Data

### Product Information:
- **Source:** Home page "new arrivals" section
- **Expected Count:** 3 products
- **Required Fields:** Product name, price, image

### Quantity Test Values:
- **Initial:** 1 (default)
- **Test Values:** 2, 3, 5, 10
- **Sequence:** 1 → 3 → 5 → 2

### Price Validation:
- Formula: Line Total = Unit Price × Quantity
- Currency: ₹ (Indian Rupee)
- Format: ₹XXX.00 or ₹X,XXX.00

---

## Dependencies

### Prerequisites:
1. Test Plan 6: Arrivals Add to Basket (basic add functionality)
2. Test Plan 8: Checkout Items (navigation to checkout)
3. Test Plan 12: Update Quantity (related quantity modification testing)

### Related Test Plans:
- **Test Plan 11:** Remove Book from Checkout
- **Test Plan 13:** Checkout Final Price Display
- **Test Plan 9-10:** Coupon functionality (may interact with updates)

---

## Risk Assessment

### High Risk Areas:
1. **Price Calculation Errors:** Incorrect multiplication could show wrong totals
2. **Button State Management:** Button might not activate or deactivate properly
3. **Cart Synchronization:** Cart menu might not update after basket update
4. **Race Conditions:** Rapid updates might cause data inconsistencies

### Medium Risk Areas:
1. **Browser Compatibility:** Button behavior might differ across browsers
2. **Network Issues:** Slow updates could confuse users
3. **Input Validation:** Non-numeric inputs might break functionality

### Mitigation Strategies:
- Validate calculations with multiple test values
- Test across different browsers
- Implement timeout handling for slow networks
- Test with various input types (numeric, text, special characters)

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ "Update Basket" button activates when quantity is modified
2. ✅ Button successfully updates cart when clicked
3. ✅ All prices recalculate correctly after update
4. ✅ Multiple sequential updates work without issues
5. ✅ Cart menu reflects updated quantity and price
6. ✅ Button states (enabled/disabled) are clear and functional
7. ✅ No console errors during update process
8. ✅ User experience is smooth and intuitive
9. ✅ All 4 test scenarios pass

### Overall Test Plan FAIL Criteria:
1. ❌ "Update Basket" button does not activate after quantity change
2. ❌ Clicking button does not update the cart
3. ❌ Price calculations are incorrect
4. ❌ Multiple updates cause errors or data corruption
5. ❌ Cart menu does not synchronize with checkout
6. ❌ Button states are confusing or non-functional
7. ❌ Critical JavaScript errors in console
8. ❌ Any test scenario results in complete failure

---

## Defect Reporting

### Severity Levels:

**Critical:**
- Update Basket button completely non-functional
- Cart data loss after update
- Price calculations completely wrong

**High:**
- Button doesn't activate consistently
- Prices occasionally incorrect
- Cart menu not updating

**Medium:**
- Visual feedback unclear
- Slow update performance
- Minor calculation rounding errors

**Low:**
- Minor UI inconsistencies
- Cosmetic button state issues

### Required Defect Information:
- Test Case ID
- Steps to reproduce
- Expected vs Actual result
- Screenshots/videos
- Browser and version
- Console errors (if any)

---

## Test Execution Notes

### Special Considerations:
1. **Network Speed:** Test with both fast and slow connections
2. **Browser Caching:** Clear cache between test runs if needed
3. **Product Availability:** Ensure test products remain in "new arrivals"
4. **Cart Persistence:** Note if cart persists between sessions

### Execution Tips:
- Wait for page load after clicking "Update Basket"
- Verify cart menu updates (may require page refresh in some implementations)
- Take screenshots of button state changes for evidence
- Record console output for debugging

---

## Appendix

### Test Automation Notes:
- Use explicit waits for "Update Basket" button state changes
- Verify button `disabled` attribute or CSS class changes
- Capture before/after prices for comparison
- Handle potential page reloads or AJAX updates

### Related WooCommerce Features:
- Cart session management
- AJAX cart updates
- Quantity validation
- Stock level checking (may limit updates)

### Glossary:
- **Update Basket:** Button that commits quantity changes in checkout
- **Line Total:** Price for a single product (unit price × quantity)
- **Subtotal:** Sum of all line totals
- **Cart Menu:** Top navigation element showing cart summary

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
| 1.0 | 2025-10-29 | QA Team | Initial test plan creation |

---

**End of Test Plan**
