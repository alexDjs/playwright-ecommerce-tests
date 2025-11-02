# Test Plan 11: Home Page Arrivals Add to Basket - Remove Book from Checkout

## Application Overview

This test plan validates the book removal functionality during the checkout process on the practice.automationtesting.in e-commerce platform. The focus is on testing the user's ability to remove items from their cart/basket directly from the checkout page, ensuring a flexible shopping experience where users can modify their orders before finalizing the purchase.

## Test Objectives

- Verify that users can successfully remove books from checkout page
- Validate the remove functionality updates cart totals correctly
- Test user experience during item removal process
- Ensure proper cart state management after item removal
- Confirm removal icons/buttons are accessible and functional

## Prerequisites

- Browser must be properly configured
- Internet connection available
- No previous session data or cookies affecting the test
- Starting from a fresh browser state

## Test Scenarios

### Scenario 1: Single Book Removal from Checkout

**Test Case ID:** TC11.1  
**Priority:** High  
**Test Type:** Functional Testing - Cart Management

**Objective:** Verify that users can successfully remove a single book from the checkout page and the system properly updates the cart state

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

9. **Verify Checkout Page Elements**
   - Confirm the added book is displayed in checkout grid/table
   - Verify product details (name, price, quantity) are correct
   - Locate the remove button/icon for the product

10. **Test Remove Functionality**
    - Identify the remove icon/button (typically "×", "Remove", or trash icon)
    - Verify the remove element is clickable and visible
    - Click on the remove icon/button
    - Wait for system response

11. **Validate Removal Results**
    - Confirm the book is removed from the checkout grid
    - Verify cart total is updated (should show ₹0 or empty cart)
    - Check that cart menu item reflects the removal
    - Ensure no ghost items remain in the display

12. **Verify Empty Cart State**
    - Confirm checkout page shows appropriate empty cart messaging
    - Verify "Return to Shop" or similar navigation options are available
    - Check that cart icon in menu shows empty state

**Expected Results:**
- Remove icon/button is clearly visible and accessible
- Book is successfully removed from checkout page
- Cart totals update to reflect removal (₹0 for single item)
- Cart menu item shows empty state
- Appropriate empty cart messaging is displayed
- No system errors or unexpected behavior occurs

**Success Criteria:**
- ✅ Remove functionality works immediately upon clicking
- ✅ Product disappears from checkout grid/table
- ✅ Cart totals recalculate correctly
- ✅ Menu cart item reflects updated state
- ✅ Empty cart state is properly displayed

---

### Scenario 2: Multiple Books - Selective Removal

**Test Case ID:** TC11.2  
**Priority:** Medium  
**Test Type:** Functional Testing - Multiple Item Management

**Objective:** Test removal functionality when multiple books are in cart, ensuring only selected items are removed

**Test Steps:**

1. **Initial Setup**
   - Navigate to `http://practice.automationtesting.in/`
   - Handle consent dialog if present
   - Navigate via Shop → Home menu path

2. **Add Multiple Products**
   - Add first arrival product to basket
   - Return to home page
   - Add second arrival product to basket
   - Optionally add third product if needed

3. **Navigate to Checkout**
   - Click on cart menu item
   - Verify multiple products are displayed in checkout

4. **Test Selective Removal**
   - Identify remove buttons for each product
   - Remove one specific product (e.g., second product added)
   - Verify only that product is removed
   - Confirm remaining products stay in cart

5. **Validate Partial Removal**
   - Check that cart totals reflect removal of only one item
   - Verify remaining products are still functional
   - Test removing another item
   - Confirm final removal results in empty cart

**Expected Results:**
- Only selected items are removed
- Remaining items persist with correct details
- Cart totals update accurately for each removal
- System handles multiple removals consistently

---

### Scenario 3: Remove Button Accessibility and User Experience

**Test Case ID:** TC11.3  
**Priority:** Medium  
**Test Type:** Usability Testing - Interface Validation

**Objective:** Ensure remove functionality provides good user experience and accessibility

**Test Steps:**

1. **Setup Test Environment**
   - Add product to cart following standard flow
   - Navigate to checkout page

2. **Test Remove Button Characteristics**
   - Verify remove button/icon is clearly visible
   - Check button size is appropriate for clicking
   - Test hover effects (if any)
   - Confirm button label or icon is intuitive

3. **Test Confirmation Behavior**
   - Click remove button
   - Check if confirmation dialog appears (optional)
   - If confirmation exists, test both "Yes" and "Cancel" options
   - Verify immediate removal vs. confirmed removal

4. **Test Edge Cases**
   - Test double-clicking remove button
   - Try removing already removed items
   - Test removal during page loading (if applicable)

**Expected Results:**
- Remove buttons are user-friendly and intuitive
- Confirmation dialogs (if present) work correctly
- Edge cases are handled gracefully
- No duplicate removal requests cause errors

---

### Scenario 4: Cart State Persistence After Removal

**Test Case ID:** TC11.4  
**Priority:** Medium  
**Test Type:** State Management Testing

**Objective:** Verify that removal changes persist correctly across page navigation and refresh

**Test Steps:**

1. **Create and Remove Items**
   - Add product to cart
   - Navigate to checkout
   - Remove the product
   - Verify empty cart state

2. **Test State Persistence**
   - Refresh the checkout page
   - Verify cart remains empty
   - Navigate to home page and back
   - Confirm removal persists

3. **Test Re-adding After Removal**
   - Add same product back to cart
   - Verify it appears correctly
   - Remove again and confirm functionality

**Expected Results:**
- Removal changes persist across page refreshes
- Cart state is consistent throughout navigation
- Re-adding items works correctly after removal

## Test Data Requirements

### Product Information:
- **Test Products:** Any of the 3 arrival products from home page
- **Product Details:** Names, prices, and images should be noted for validation
- **Expected Prices:** Typically range from ₹150-₹500 per product

### Remove Button Identifiers:
- **Common Selectors:** `.remove`, `[data-product_id]`, `.woocommerce-cart-form__cart-item .remove`
- **Visual Indicators:** "×", "Remove", trash icon, or similar
- **Action Elements:** Links, buttons, or clickable icons

## Pass/Fail Criteria

### PASS Criteria:
- ✅ Remove functionality successfully removes selected items
- ✅ Cart totals recalculate correctly after removal
- ✅ Menu cart item reflects updated item count
- ✅ Empty cart state displays appropriate messaging
- ✅ Multiple item removal works selectively
- ✅ Remove buttons are accessible and user-friendly
- ✅ State changes persist across page navigation

### FAIL Criteria:
- ❌ Remove button doesn't work or causes errors
- ❌ Items remain in cart after removal attempt
- ❌ Cart totals don't update correctly
- ❌ Wrong items are removed (in multi-item scenarios)
- ❌ System crashes or shows error messages
- ❌ Remove buttons are not visible or accessible
- ❌ Removal changes don't persist

## Risk Assessment

**High Risk Areas:**
- Remove functionality not working properly
- Cart state inconsistencies after removal
- Multiple item removal causing data corruption

**Medium Risk Areas:**
- User experience issues with remove button design
- Performance problems during removal operations
- Inconsistent behavior across different browsers

**Mitigation Strategies:**
- Test removal with different product combinations
- Verify removal functionality across multiple browsers
- Test removal under various network conditions
- Validate cart state persistence thoroughly

## Browser Compatibility

- **Primary Testing:** Chrome/Chromium (as specified in Playwright config)
- **Additional Testing:** Firefox, Safari, Edge (if required)
- **Mobile Testing:** Consider responsive behavior of remove buttons

## Notes

- Test should be executed with fresh browser sessions to avoid cart persistence issues
- Remove button designs may vary; adapt selectors accordingly
- Document any unusual removal behavior for development team review
- Consider testing with different product types if available
- Pay attention to any confirmation dialogs that may appear during removal

## Related Test Plans

- **Test Plan 6:** Basic Add to Basket functionality (prerequisite)
- **Test Plan 8:** Checkout Items functionality (related cart operations)
- **Test Plan 9:** Coupon functionality (potential interaction with removed items)
- **Test Plan 10:** Coupon value restrictions (cart total impact)
