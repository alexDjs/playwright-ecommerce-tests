# Test Plan 16: Home Page Arrivals - Add to Basket - Checkout Functionality

## Test Plan Information

**Test Plan ID:** TP-016  
**Test Plan Name:** Home Page Arrivals - Add to Basket - Checkout Functionality  
**Application:** Practice Automation Testing Website  
**Module:** E-commerce - Shopping Cart - Checkout Navigation  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website provides a complete WooCommerce-based e-commerce checkout flow. This test plan focuses on validating the **"Proceed to Checkout" button functionality**, ensuring users can successfully navigate from the shopping cart to the payment gateway page after reviewing their order details.

### Key Features Tested:
- **Checkout Navigation**: Transition from cart to payment gateway
- **"Proceed to Checkout" Button**: Functionality and reliability
- **Pre-Checkout Validation**: Verification of totals before proceeding
- **Payment Gateway Access**: Successful loading of payment/billing page
- **User Flow Continuity**: Seamless progression through checkout steps

---

## Test Objectives

1. **Validate Checkout Button**: Verify "Proceed to Checkout" button is visible and clickable
2. **Test Navigation Flow**: Ensure clicking button navigates to payment gateway page
3. **Verify Pre-Checkout Display**: Confirm total and subtotal are visible before checkout
4. **Test URL Transition**: Validate correct URL change to checkout/payment page
5. **Assess User Experience**: Evaluate smoothness of checkout initiation process

---

## Scope

### In Scope:
- Adding products from "new arrivals" to basket
- Navigating to cart/basket page
- Verifying total and subtotal display
- Locating "Proceed to Checkout" button
- Clicking "Proceed to Checkout" button
- Verifying navigation to payment gateway/billing page
- Validating new page URL and content
- Testing button functionality and responsiveness

### Out of Scope:
- Payment form completion
- Actual payment processing
- Payment method selection details
- Billing address entry
- Order submission
- Payment gateway integration testing
- Security/SSL validation
- Error handling during payment

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - At least 3 products in "new arrivals" section
  - Checkout functionality enabled

---

## Test Scenarios

### Scenario 1: Proceed to Checkout Button Visibility and State

**Test Case ID:** TC16.1  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the "Proceed to Checkout" button is visible, properly labeled, and in a clickable state after products are added to the cart.

**Preconditions:**
- Browser is open
- Website is accessible
- At least one product available in arrivals

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
10. Click on cart item link to navigate to cart/checkout page
11. Verify total and subtotal are displayed
12. Locate the "Proceed to Checkout" button
13. Verify button is visible
14. Verify button text/label is clear (e.g., "Proceed to Checkout", "Checkout")
15. Verify button is enabled (not disabled)
16. Check button styling (color, size, prominence)

**Expected Results:**
- "Proceed to Checkout" button is visible on the page
- Button has clear, unambiguous text
- Button is in an enabled/clickable state
- Button is prominently styled and easy to find
- Button is positioned logically (typically below cart totals)
- No visual defects or overlapping elements

**Pass Criteria:**
- ✅ Button is visible and findable
- ✅ Button text is clear and appropriate
- ✅ Button is enabled (clickable)
- ✅ Button styling is professional and prominent
- ✅ No UI defects affecting button

**Fail Criteria:**
- ❌ Button is not visible
- ❌ Button text is unclear or missing
- ❌ Button is disabled when it should be enabled
- ❌ Button is poorly styled or hard to find
- ❌ Visual defects present

---

### Scenario 2: Proceed to Checkout Navigation Success

**Test Case ID:** TC16.2  
**Priority:** Critical  
**Type:** Functional Testing  

**Objective:**  
Validate that clicking the "Proceed to Checkout" button successfully navigates the user to the payment gateway/billing page.

**Preconditions:**
- Product added to basket
- Cart page is displayed
- "Proceed to Checkout" button is visible

**Test Steps:**

1. Navigate to website and add a product to basket (following steps 1-11 from TC16.1)
2. Verify current URL contains "basket" or "cart"
3. Record current page URL
4. Verify total and subtotal are visible above "Proceed to Checkout" button
5. Locate "Proceed to Checkout" button
6. Click the "Proceed to Checkout" button
7. Wait for page navigation/load
8. Record new page URL
9. Verify URL changed from cart to checkout
10. Verify new URL contains "checkout" or "billing" or payment-related keyword
11. Verify page title changed
12. Look for checkout/billing page elements (billing form, payment options, etc.)
13. Verify cart items are still visible or referenced on checkout page
14. Verify total/subtotal information carried over

**Expected Results:**
- Page successfully navigates to new URL
- New URL contains checkout/billing/payment indicators
- New page displays checkout/billing form
- Page title reflects checkout/payment page
- Cart contents are preserved or displayed
- No navigation errors or broken pages
- Page loads completely within reasonable time

**Pass Criteria:**
- ✅ Navigation occurs successfully
- ✅ URL changes to checkout/payment page
- ✅ Checkout/billing page loads correctly
- ✅ Cart information is preserved
- ✅ No errors during navigation

**Fail Criteria:**
- ❌ Navigation fails or button doesn't respond
- ❌ URL doesn't change
- ❌ Wrong page loads
- ❌ Error page or broken page loads
- ❌ Cart contents are lost

---

### Scenario 3: Payment Gateway Page Validation

**Test Case ID:** TC16.3  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the payment gateway/billing page loads correctly with all necessary elements after proceeding from cart.

**Preconditions:**
- Successfully navigated to checkout page via "Proceed to Checkout" button

**Test Steps:**

1. Add product to basket and navigate to cart
2. Click "Proceed to Checkout" button
3. Wait for checkout/billing page to load
4. Verify page URL contains checkout-related path
5. Look for billing form elements:
   - First Name field
   - Last Name field
   - Email field
   - Phone field
   - Address fields
6. Look for payment method options (if visible)
7. Look for order summary/review section
8. Verify order total is displayed
9. Verify product(s) in order are listed
10. Look for "Place Order" or similar final submission button
11. Verify page breadcrumb or progress indicator (if present)
12. Check for SSL/security indicators (if applicable)

**Expected Results:**
- Billing form is displayed with all required fields
- Order summary shows cart items and totals
- Payment options are available or indicated
- Final order button ("Place Order") is present
- Page is secure and properly formatted
- All checkout elements are functional
- Professional and complete checkout experience

**Pass Criteria:**
- ✅ Billing form is present and complete
- ✅ Order summary displays correctly
- ✅ Cart items are shown in order
- ✅ Totals match cart page values
- ✅ Checkout page is fully functional

**Fail Criteria:**
- ❌ Billing form is missing or incomplete
- ❌ Order summary is absent
- ❌ Cart items are not displayed
- ❌ Totals are incorrect or missing
- ❌ Page is broken or non-functional

---

### Scenario 4: Cart Totals Verification Before Checkout

**Test Case ID:** TC16.4  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that total and subtotal values are correctly displayed above the "Proceed to Checkout" button, allowing users to review costs before proceeding.

**Preconditions:**
- Product in cart
- Cart page displayed

**Test Steps:**

1. Add a product to basket (standard flow)
2. Navigate to cart page
3. Locate subtotal row
4. Record subtotal value
5. Locate total row
6. Record total value
7. Locate "Proceed to Checkout" button
8. Verify subtotal is positioned above the button
9. Verify total is positioned above the button
10. Verify both values are clearly visible
11. Compare subtotal and total relationship
12. Verify currency symbols are displayed
13. Verify values are properly formatted

**Expected Results:**
- Subtotal is displayed clearly above "Proceed to Checkout" button
- Total is displayed clearly above "Proceed to Checkout" button
- Both values are visible without scrolling
- Values are properly formatted with currency
- Total ≥ Subtotal (correct e-commerce logic)
- User can review costs before clicking checkout

**Pass Criteria:**
- ✅ Both totals visible above checkout button
- ✅ Values are clear and formatted correctly
- ✅ Proper positioning and visibility
- ✅ Total ≥ Subtotal relationship
- ✅ Easy to review before proceeding

**Fail Criteria:**
- ❌ Totals not visible or poorly positioned
- ❌ Values below or after checkout button
- ❌ Poor formatting or missing currency
- ❌ Incorrect total/subtotal relationship
- ❌ Difficult to review costs

---

### Scenario 5: Multiple Products Checkout Flow

**Test Case ID:** TC16.5  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Validate that the checkout process works correctly when multiple products are in the cart.

**Preconditions:**
- At least 2 different products available in arrivals

**Test Steps:**

1. Navigate to home page (Shop → Home)
2. Add first product to basket
3. Return to home page
4. Add second product to basket
5. Verify cart menu shows multiple items
6. Navigate to cart page
7. Verify both products are listed
8. Verify subtotal reflects sum of both products
9. Verify total is displayed
10. Locate "Proceed to Checkout" button
11. Click "Proceed to Checkout"
12. Verify navigation to checkout page
13. Verify both products appear in order summary
14. Verify quantities are correct
15. Verify totals match cart page

**Expected Results:**
- Both products are visible in cart
- Subtotal = Product1 + Product2
- Checkout button works with multiple items
- Navigation to checkout succeeds
- Both products appear in checkout order summary
- All totals are accurate

**Pass Criteria:**
- ✅ Multiple products handled correctly
- ✅ Checkout button functions properly
- ✅ All products appear in checkout
- ✅ Calculations are accurate
- ✅ Navigation successful

**Fail Criteria:**
- ❌ Products missing from cart or checkout
- ❌ Checkout button fails with multiple items
- ❌ Incorrect calculations
- ❌ Navigation fails
- ❌ Order summary incomplete

---

### Scenario 6: Checkout Button User Experience Testing

**Test Case ID:** TC16.6  
**Priority:** Low  
**Type:** UI/UX Testing  

**Objective:**  
Assess the user experience aspects of the "Proceed to Checkout" button, including visual feedback, loading states, and interaction quality.

**Preconditions:**
- Product in cart
- Cart page displayed

**Test Steps:**

1. Navigate to cart page with product
2. Locate "Proceed to Checkout" button
3. Hover mouse over button
4. Observe hover state changes (color, cursor, etc.)
5. Click the button
6. Observe click feedback (animation, color change, etc.)
7. Monitor for loading indicator during navigation
8. Time the navigation (should be reasonably fast)
9. Check if button is disabled during navigation (prevents double-clicks)
10. Verify smooth transition to checkout page
11. Check for any jarring visual changes
12. Assess overall user experience quality

**Expected Results:**
- Button provides clear hover feedback
- Click action is responsive
- Loading state is indicated (if applicable)
- Navigation completes in reasonable time (< 3 seconds)
- Smooth visual transition
- Professional and polished UX
- No confusing or broken interactions

**Pass Criteria:**
- ✅ Clear hover and click states
- ✅ Responsive button interaction
- ✅ Fast navigation (< 3 seconds)
- ✅ Smooth transitions
- ✅ Professional UX quality

**Fail Criteria:**
- ❌ No hover/click feedback
- ❌ Slow or unresponsive button
- ❌ Slow navigation (> 5 seconds)
- ❌ Jarring transitions
- ❌ Poor UX quality

---

## Test Data

### Product Information:
- **Source:** Home page "new arrivals" section
- **Expected Count:** 3 products
- **Required Fields:** Product name, price, image

### URL Patterns to Validate:
- **Cart Page:** `/basket/`, `/cart/`, or similar
- **Checkout Page:** `/checkout/`, `/billing/`, `/payment/`, or similar

### Expected Page Elements After Checkout:
- Billing form fields (name, email, address, etc.)
- Order summary section
- Payment method selection
- "Place Order" button
- Order total display

---

## Dependencies

### Prerequisites:
1. Test Plan 6: Arrivals Add to Basket (basic add functionality)
2. Test Plan 8: Checkout Items (cart navigation)
3. Test Plan 15: Total & Subtotal Display

### Related Test Plans:
- **Test Plan 13:** Checkout Final Price Display
- **Test Plan 14:** Update Basket functionality
- **Test Plans 9-10:** Coupon application (affects checkout)

---

## Important Note on Total vs Subtotal

**Clarification:**
The requirement states *"total always < subtotal because taxes are added in the subtotal"*, which contains a logical error.

**Correct E-commerce Logic:**
- **Subtotal:** Sum of product prices (before additional charges)
- **Total:** Subtotal + Taxes + Shipping
- **Expected Relationship:** Total ≥ Subtotal

This test plan will validate the correct behavior (Total ≥ Subtotal) while still proceeding with checkout functionality testing.

---

## Risk Assessment

### High Risk Areas:
1. **Navigation Failure:** "Proceed to Checkout" button not working
2. **Cart Data Loss:** Items lost during checkout transition
3. **Broken Checkout Page:** Payment page fails to load
4. **Session Issues:** Cart session expires during navigation

### Medium Risk Areas:
1. **Slow Loading:** Checkout page takes too long to load
2. **Missing Elements:** Incomplete billing form or order summary
3. **Total Mismatch:** Cart totals don't match checkout totals
4. **Button State:** Button remains enabled allowing double-clicks

### Mitigation Strategies:
- Test with various product combinations
- Verify cart persistence across navigation
- Test with different network speeds
- Validate all checkout page elements
- Check for loading indicators and disabled states

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ "Proceed to Checkout" button is visible and accessible
2. ✅ Button successfully navigates to checkout/payment page
3. ✅ Checkout page loads correctly with all elements
4. ✅ Cart items and totals are preserved during navigation
5. ✅ Billing form is displayed and functional
6. ✅ Order summary shows correct products and prices
7. ✅ Total and subtotal are visible before clicking checkout
8. ✅ Navigation works with single and multiple products
9. ✅ User experience is smooth and professional
10. ✅ All 6 test scenarios pass

### Overall Test Plan FAIL Criteria:
1. ❌ "Proceed to Checkout" button is missing or non-functional
2. ❌ Navigation to checkout page fails
3. ❌ Checkout page doesn't load or loads incorrectly
4. ❌ Cart items or totals are lost during navigation
5. ❌ Billing form is missing or incomplete
6. ❌ Order summary is absent or incorrect
7. ❌ Cannot review totals before checkout
8. ❌ Checkout fails with multiple products
9. ❌ Poor user experience or broken interactions
10. ❌ Any critical test scenario fails

---

## Defect Reporting

### Severity Levels:

**Critical:**
- "Proceed to Checkout" button completely non-functional
- Checkout page fails to load
- Cart contents lost during navigation
- Navigation error blocks checkout process

**High:**
- Checkout page missing critical elements
- Totals incorrect on checkout page
- Button intermittently fails
- Slow loading (> 10 seconds)

**Medium:**
- Minor missing elements on checkout page
- Poor button UX (no hover state, etc.)
- Slow but functional loading (5-10 seconds)
- Formatting issues

**Low:**
- Cosmetic button styling issues
- Minor UI inconsistencies
- Non-critical element positioning

### Required Defect Information:
- Test Case ID
- Screenshots of cart and checkout pages
- URL before and after clicking checkout
- Browser and version
- Network conditions
- Console errors (if any)
- Steps to reproduce

---

## Test Execution Notes

### Special Considerations:
1. **Session Management:** Ensure cart session persists
2. **Network Speed:** Test with various connection speeds
3. **Browser Compatibility:** Test across different browsers
4. **Cache Issues:** Clear cache if needed between tests

### Execution Tips:
- Screenshot cart page before clicking checkout
- Screenshot checkout page after navigation
- Record URL changes
- Monitor browser console for errors
- Check network tab for failed requests
- Verify all form fields on checkout page

---

## Appendix

### Checkout Flow Diagram:

```
Product Page
     ↓
Add to Basket
     ↓
Cart Menu (1 item - ₹XXX)
     ↓
Click Cart Link
     ↓
Cart/Basket Page
   - Line Items
   - Subtotal
   - Total
   - [Proceed to Checkout Button]
     ↓
Click "Proceed to Checkout"
     ↓
Checkout/Billing Page
   - Billing Form
   - Payment Options
   - Order Summary
   - [Place Order Button]
```

### Expected URL Transitions:

```
Initial: http://practice.automationtesting.in/
         ↓
Product: http://practice.automationtesting.in/product/[product-name]/
         ↓
Cart:    http://practice.automationtesting.in/basket/
         or
         http://practice.automationtesting.in/cart/
         ↓
Checkout: http://practice.automationtesting.in/checkout/
          or
          http://practice.automationtesting.in/billing/
```

### Common Checkout Page Elements:

**Billing Details:**
- First Name
- Last Name
- Company Name (optional)
- Country/Region
- Street Address
- Town/City
- State/County
- Postcode/ZIP
- Phone
- Email Address

**Order Summary:**
- Product list with quantities
- Subtotal
- Shipping
- Tax (if applicable)
- Total

**Payment:**
- Payment method options
- Payment details fields
- Terms and conditions checkbox
- "Place Order" button

### Glossary:
- **Proceed to Checkout:** Button that initiates the checkout process
- **Payment Gateway:** Page where billing/payment information is collected
- **Billing Page:** Form for entering customer billing details
- **Order Summary:** Display of items, quantities, and prices in the order
- **Cart Persistence:** Maintaining cart contents across page navigation

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
| 1.0 | 2025-10-29 | QA Team | Initial test plan creation for checkout navigation |

---

**End of Test Plan**
