# Test Plan 13: Home Page Arrivals Add to Basket - Checkout Book Final Price

## Application Overview

This test plan validates the final price calculation and display functionality on the checkout page of the practice.automationtesting.in e-commerce platform. The focus is on verifying that users can clearly see and understand the total price of their books during the checkout process, including all relevant pricing components (subtotal, taxes, shipping, discounts, etc.).

## Test Objectives

- Verify that book prices are correctly displayed in the checkout page
- Validate total price calculation accuracy (including all components)
- Test price visibility and presentation in checkout grid/table
- Ensure users can easily find and understand the final total price
- Confirm price consistency between cart menu and checkout page

## Prerequisites

- Browser must be properly configured
- Internet connection available
- No previous session data or cookies affecting the test
- Starting from a fresh browser state

## Test Scenarios

### Scenario 1: Single Book Final Price Display and Calculation

**Test Case ID:** TC13.1  
**Priority:** High  
**Test Type:** Functional Testing - Price Display and Calculation

**Objective:** Verify that the final price for a single book is correctly calculated and clearly displayed in the checkout grid

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

5. **Select Product and Note Price**
   - Choose any arrival product (typically first arrival for consistency)
   - Note the product name and displayed price
   - Document the price shown on home page for comparison

6. **Navigate to Product Detail Page**
   - Click on the product image in the arrivals section
   - Verify navigation to product detail page
   - Confirm URL contains `/product/` path
   - Verify price is displayed on product detail page
   - Compare price with home page price (should match)

7. **Add Product to Basket**
   - Locate "Add To Basket" button on product detail page
   - Verify button is enabled and clickable
   - Click "Add To Basket" button
   - Confirm product is added to cart

8. **Verify Cart Menu Item Display**
   - Check menu cart icon for item count update
   - Verify cart menu shows "1 item" with price
   - Note the price displayed in cart menu
   - Compare with product page price (should match)

9. **Navigate to Checkout Page**
   - Click on cart/item link in menu
   - Verify navigation to checkout/basket page
   - Confirm URL contains `/basket/`, `/cart/`, or `/checkout/`

10. **Locate Price Information in Checkout Grid**
    - Identify the checkout table/grid structure
    - Find the product line item with unit price
    - Locate quantity field (should show 1)
    - Find line total (unit price × quantity)

11. **Verify Price Components Display**
    - Locate subtotal section
    - Verify subtotal equals product price (for single item)
    - Check for any additional charges (shipping, taxes, fees)
    - Identify discount section (if applicable)

12. **Find and Verify Final Total Price**
    - Locate the "Total" or "Order Total" section
    - Verify total price is clearly displayed
    - Confirm total is prominently formatted (bold, larger font, etc.)
    - Verify currency symbol is displayed (₹)

13. **Validate Total Price Calculation**
    - Calculate expected total manually:
      - Base: Product price
      - Plus: Any additional fees
      - Minus: Any discounts
    - Compare calculated total with displayed total
    - Verify accuracy of calculation

14. **Test Price Visibility and Accessibility**
    - Confirm total price is easily visible without scrolling
    - Verify price formatting is clear and readable
    - Check that all price components are labeled clearly
    - Ensure price breakdown is logical and understandable

**Expected Results:**
- Product price is consistent across all pages (home, product detail, cart, checkout)
- Total price is clearly displayed in checkout grid
- Price calculation is mathematically correct
- All price components are labeled and visible
- User can easily identify the final amount to pay
- Currency symbols are displayed correctly (₹)
- No hidden fees or unexpected charges

**Success Criteria:**
- ✅ Price displayed matches expected amount
- ✅ Total calculation is accurate
- ✅ Price is prominently displayed in checkout
- ✅ User can easily find the final total
- ✅ Price breakdown is clear and complete

---

### Scenario 2: Multiple Books Total Price Calculation

**Test Case ID:** TC13.2  
**Priority:** High  
**Test Type:** Functional Testing - Multiple Item Price Calculation

**Objective:** Verify total price calculation accuracy when multiple books are in the cart

**Test Steps:**

1. **Setup - Add Multiple Products**
   - Navigate through standard flow
   - Add first arrival product to cart (note price: Price1)
   - Return to home page
   - Add second arrival product to cart (note price: Price2)
   - Optionally add third product (note price: Price3)

2. **Navigate to Checkout**
   - Click on cart menu item
   - Verify navigation to checkout page
   - Confirm multiple products are displayed

3. **Verify Individual Line Items**
   - Check first product: name, unit price, quantity, line total
   - Check second product: name, unit price, quantity, line total
   - Check third product (if added): name, unit price, quantity, line total
   - Verify each line total = unit price × quantity

4. **Verify Subtotal Calculation**
   - Locate subtotal in checkout grid
   - Calculate expected subtotal: Sum of all line totals
   - Compare displayed subtotal with calculated value
   - Verify accuracy

5. **Verify Final Total**
   - Locate total price section
   - Account for any additional fees or discounts
   - Calculate expected total
   - Compare with displayed total
   - Verify accuracy within acceptable rounding

6. **Test Price Consistency**
   - Check cart menu total matches checkout total
   - Verify individual product prices haven't changed
   - Confirm no unexpected price modifications

**Expected Results:**
- Each product line shows correct unit price and line total
- Subtotal equals sum of all line items
- Final total includes all applicable fees and discounts
- All calculations are mathematically accurate
- Price display is clear and comprehensive

---

### Scenario 3: Price Components Breakdown Validation

**Test Case ID:** TC13.3  
**Priority:** Medium  
**Test Type:** Detailed Price Component Validation

**Objective:** Verify all price components are correctly displayed and labeled in checkout

**Test Steps:**

1. **Add Product to Cart**
   - Follow standard flow to add product to cart
   - Navigate to checkout page

2. **Identify All Price Components**
   - **Product Line Items:** Unit price × Quantity
   - **Subtotal:** Sum of all line items
   - **Shipping Charges:** If applicable
   - **Tax/VAT:** If applicable
   - **Discounts:** Coupons or promotions
   - **Grand Total:** Final amount to pay

3. **Verify Each Component Display**
   - Check each component has clear label
   - Verify amounts are formatted correctly
   - Confirm currency symbols are present
   - Validate component positioning in checkout grid

4. **Test Mathematical Relationships**
   - Verify: Subtotal = Sum(Line Items)
   - Verify: Total = Subtotal + Shipping + Tax - Discounts
   - Check for proper rounding in all calculations
   - Validate decimal place handling

5. **Test Edge Cases**
   - Free shipping scenario (if applicable)
   - Zero tax scenario
   - With and without discounts
   - Various product price combinations

**Expected Results:**
- All price components are clearly labeled
- Mathematical relationships are correct
- No missing or duplicate components
- Proper formatting and currency display

---

### Scenario 4: Price Display Responsiveness and User Experience

**Test Case ID:** TC13.4  
**Priority:** Medium  
**Test Type:** UI/UX Testing - Price Display

**Objective:** Ensure price display provides excellent user experience

**Test Steps:**

1. **Visual Presentation Testing**
   - Add product to cart and navigate to checkout
   - Evaluate total price visibility (size, color, position)
   - Check price component hierarchy (what's emphasized)
   - Verify readability and clarity

2. **Accessibility Testing**
   - Test with different screen resolutions
   - Verify prices remain visible without horizontal scrolling
   - Check mobile/responsive view (if applicable)
   - Confirm color contrast for price text

3. **Information Architecture**
   - Verify logical flow of price information
   - Check that subtotal comes before total
   - Confirm additional fees are clearly separated
   - Validate discount presentation

4. **User Comprehension**
   - Assess if average user can quickly find total
   - Check if price breakdown is intuitive
   - Verify no confusion between subtotal and total
   - Confirm clear distinction between prices

**Expected Results:**
- Total price is prominently displayed
- Price information is logically organized
- User can quickly understand what they'll pay
- Professional and clear presentation

## Test Data Requirements

### Product Information:
- **Product Names:** Names of the 3 arrival products
- **Product Prices:** Individual prices for each product
- **Expected Price Range:** ₹150-₹500 per product typically

### Price Components to Verify:
- **Unit Price:** Price per single book
- **Line Total:** Unit price × Quantity
- **Subtotal:** Sum of all line totals
- **Shipping:** May be free or calculated based on location
- **Tax/VAT:** May be included or separate
- **Discounts:** Coupon or promotional discounts
- **Grand Total:** Final payable amount

### Expected Display Locations:
- **Product Line:** Row in checkout table/grid
- **Subtotal:** Below product lines or in summary section
- **Total:** Bottom of checkout grid, prominently displayed
- **Cart Menu:** Header/navigation area showing cart total

## Pass/Fail Criteria

### PASS Criteria:
- ✅ Product price is consistent across all pages
- ✅ Unit price, line total, and quantities are correctly displayed
- ✅ Subtotal calculation is mathematically accurate
- ✅ Final total includes all applicable components
- ✅ Total price is prominently and clearly displayed
- ✅ Currency symbols (₹) are shown correctly
- ✅ All price components are labeled clearly
- ✅ Price display provides good user experience
- ✅ No hidden fees or unexpected charges

### FAIL Criteria:
- ❌ Price inconsistencies between pages
- ❌ Incorrect calculation of totals
- ❌ Missing or unlabeled price components
- ❌ Total price is difficult to find or read
- ❌ Currency symbols missing or incorrect
- ❌ Unexpected fees without explanation
- ❌ Mathematical errors in price calculations
- ❌ Poor visibility or formatting of prices

## Risk Assessment

**High Risk Areas:**
- Calculation errors in price totals
- Inconsistent pricing across different pages
- Hidden fees not properly displayed
- Rounding errors in decimal calculations

**Medium Risk Areas:**
- Poor visual presentation of total price
- Confusing price component labels
- Currency symbol display issues
- Tax/shipping calculation errors

**Mitigation Strategies:**
- Test with multiple product combinations
- Verify calculations manually and automatically
- Test with different quantities and scenarios
- Cross-check prices across all pages
- Document all price components and calculations

## Calculation Formulas

### Basic Calculations:
```
Line Total = Unit Price × Quantity

Subtotal = Sum of all Line Totals

Total = Subtotal + Shipping + Tax - Discounts
```

### Validation Rules:
- All prices should be positive numbers
- Decimal places: typically 2 decimal places for currency
- Rounding: standard rounding to nearest cent/paisa
- Currency: Indian Rupee (₹)

## Browser Compatibility

- **Primary Testing:** Chrome/Chromium (as specified in Playwright config)
- **Price Display:** Verify formatting across different browsers
- **Decimal Handling:** Ensure consistent decimal display

## Notes

- Product prices may vary; always capture actual prices during test execution
- Some systems may include tax in displayed price vs. separate line item
- Shipping may be free, fixed, or calculated based on various factors
- Coupon codes may affect final total (test with and without)
- Price display should follow standard e-commerce conventions
- Currency formatting should match Indian standards (₹ symbol, comma separators)

## Related Test Plans

- **Test Plan 6:** Basic Add to Basket functionality (prerequisite)
- **Test Plan 8:** Checkout Items functionality (related cart operations)
- **Test Plan 9:** Coupon functionality (affects final price calculation)
- **Test Plan 10:** Coupon value restrictions (conditional pricing)
- **Test Plan 11:** Remove Book functionality (price recalculation)
- **Test Plan 12:** Update Quantity functionality (affects line totals and final price)
