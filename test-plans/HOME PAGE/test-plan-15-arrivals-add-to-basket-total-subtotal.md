# Test Plan 15: Home Page Arrivals - Add to Basket - Total & Subtotal Validation

## Test Plan Information

**Test Plan ID:** TP-015  
**Test Plan Name:** Home Page Arrivals - Add to Basket - Total & Subtotal Condition Validation  
**Application:** Practice Automation Testing Website  
**Module:** E-commerce - Shopping Cart - Price Calculation Logic  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website utilizes WooCommerce for e-commerce functionality. This test plan focuses on validating the **Total and Subtotal** calculation logic in the checkout process, specifically verifying the relationship between these values and ensuring proper tax/fee application.

### Key Features Tested:
- **Subtotal Calculation**: Sum of all item line totals before taxes and fees
- **Total Calculation**: Final amount including taxes, shipping, and fees
- **Tax Application**: Verification that taxes are correctly added to subtotal
- **Price Relationship**: Validation that Total > Subtotal when taxes/fees are applied
- **Display Accuracy**: Correct positioning and visibility of total and subtotal values

---

## Test Objectives

1. **Validate Subtotal Display**: Verify subtotal shows sum of all products before additional charges
2. **Validate Total Display**: Confirm total reflects subtotal plus taxes and fees
3. **Test Price Relationship**: Ensure Total ≥ Subtotal (typically Total > Subtotal due to taxes)
4. **Verify Positioning**: Confirm total and subtotal are displayed above "Proceed to Checkout" button
5. **Test Calculation Accuracy**: Validate mathematical correctness of all price components

---

## Scope

### In Scope:
- Adding products from "new arrivals" to basket
- Navigating to checkout page
- Locating subtotal and total values
- Verifying subtotal = sum of line items
- Verifying total includes taxes and additional fees
- Testing relationship: Total ≥ Subtotal
- Validating display position relative to "Proceed to Checkout" button
- Single and multiple product scenarios

### Out of Scope:
- Payment processing
- Discount/coupon application (covered in Test Plans 9-10)
- Shipping cost variations
- Tax rate configuration
- International tax calculations
- Quantity updates (covered in Test Plans 12, 14)

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - At least 3 products in "new arrivals" section
  - Tax configuration active on the site

---

## Important Note on Total vs Subtotal Relationship

**Expected Behavior:**
- **Subtotal:** Sum of all product line totals (price × quantity)
- **Total:** Subtotal + Taxes + Shipping Fees + Other Charges
- **Relationship:** Total ≥ Subtotal

**Common Scenarios:**
1. **Total > Subtotal:** When taxes, shipping, or fees are applied (most common)
2. **Total = Subtotal:** When free shipping and no taxes apply
3. **Total < Subtotal:** Only possible with discounts (covered in separate test plans)

**Note:** The requirement states "total always < subtotal because taxes are added" appears to be a documentation error. In standard e-commerce logic, taxes are **added to** the subtotal, making Total > Subtotal. This test plan will validate the correct behavior: **Total ≥ Subtotal**.

---

## Test Scenarios

### Scenario 1: Subtotal and Total Display Verification (Single Product)

**Test Case ID:** TC15.1  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that both subtotal and total values are clearly displayed in the checkout page above the "Proceed to Checkout" button, and that they are visible and accessible to users.

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
10. Click on cart item link to navigate to checkout
11. Locate the "Proceed to Checkout" button
12. Verify subtotal is displayed above the "Proceed to Checkout" button
13. Verify total is displayed above the "Proceed to Checkout" button
14. Verify both values are clearly labeled
15. Verify both values display currency symbol (₹)

**Expected Results:**
- Subtotal row is visible and labeled clearly
- Total row is visible and labeled clearly
- Both are positioned above "Proceed to Checkout" button
- Currency symbol (₹) is displayed for both values
- Values are formatted consistently (e.g., ₹XXX.00)
- Labels are distinguishable (e.g., "Subtotal" and "Total")

**Pass Criteria:**
- ✅ Subtotal is visible and clearly labeled
- ✅ Total is visible and clearly labeled
- ✅ Both positioned above "Proceed to Checkout" button
- ✅ Both display ₹ currency symbol
- ✅ Professional formatting applied

**Fail Criteria:**
- ❌ Subtotal or Total not visible
- ❌ Values positioned incorrectly
- ❌ Missing currency symbols
- ❌ Unclear or missing labels
- ❌ Inconsistent formatting

---

### Scenario 2: Total and Subtotal Relationship Validation

**Test Case ID:** TC15.2  
**Priority:** Critical  
**Type:** Functional Testing  

**Objective:**  
Validate that the Total is greater than or equal to the Subtotal, reflecting proper application of taxes, shipping, and fees.

**Preconditions:**
- Product added to basket
- Checkout page is displayed

**Test Steps:**

1. Navigate to website following steps 1-10 from TC15.1
2. In checkout page, locate and record the subtotal value
3. Locate and record the total value
4. Extract numeric values from both (removing currency symbols)
5. Compare Total vs Subtotal
6. Verify: Total ≥ Subtotal
7. If Total > Subtotal, identify the difference
8. Check for tax line items explaining the difference
9. Check for shipping charges explaining the difference
10. Verify the difference is reasonable and explainable

**Expected Results:**
- Total ≥ Subtotal (Total is greater than or equal to Subtotal)
- Typically: Total > Subtotal (due to taxes/shipping)
- Difference is explained by visible tax/shipping line items
- Mathematical relationship is correct: Total = Subtotal + Taxes + Shipping - Discounts

**Pass Criteria:**
- ✅ Total ≥ Subtotal
- ✅ Difference is explained by line items
- ✅ Calculation is mathematically accurate
- ✅ No unexplained price differences

**Fail Criteria:**
- ❌ Total < Subtotal (without discount explanation)
- ❌ Unexplained price differences
- ❌ Mathematical errors in calculation
- ❌ Negative values

---

### Scenario 3: Subtotal Calculation Accuracy (Single Product)

**Test Case ID:** TC15.3  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the subtotal accurately reflects the sum of all product line totals (price × quantity) without taxes or fees.

**Preconditions:**
- Product available in arrivals
- Product price is known

**Test Steps:**

1. Navigate to home page and go to Shop → Home
2. Note the price of the first arrival product (Price P)
3. Click on product image
4. Verify product detail page shows same price P
5. Click "Add To Basket" button
6. Verify cart menu shows price P
7. Navigate to checkout by clicking cart menu
8. In checkout, locate the line item for the product
9. Verify line total shows ₹P (for quantity = 1)
10. Locate the subtotal row
11. Verify subtotal = ₹P (since only one product with quantity 1)
12. Calculate: Expected Subtotal = P × 1 = P
13. Compare displayed subtotal with expected value

**Expected Results:**
- Subtotal equals the product price P (for quantity 1)
- Calculation: Subtotal = Line Total = Price × Quantity = P × 1 = P
- Subtotal does NOT include taxes or shipping
- Subtotal is clearly separated from Total

**Pass Criteria:**
- ✅ Subtotal = Product Price (for qty 1)
- ✅ No taxes included in subtotal
- ✅ Calculation is accurate
- ✅ Value matches cart display

**Fail Criteria:**
- ❌ Subtotal ≠ Product Price
- ❌ Taxes included in subtotal
- ❌ Calculation errors
- ❌ Mismatch with cart menu

---

### Scenario 4: Tax Application Verification

**Test Case ID:** TC15.4  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that taxes are correctly applied to the subtotal and reflected in the total amount, explaining the difference between Total and Subtotal.

**Preconditions:**
- Product in basket
- Checkout page displayed
- Tax configuration active on site

**Test Steps:**

1. Add a product to basket (following standard steps)
2. Navigate to checkout page
3. Record Subtotal value (S)
4. Record Total value (T)
5. Look for tax line items in the cart totals breakdown
6. If tax line exists, record tax amount (TAX)
7. Look for shipping line items
8. If shipping line exists, record shipping amount (SHIP)
9. Calculate: Expected Total = S + TAX + SHIP
10. Compare Expected Total with Displayed Total (T)
11. Verify: T = S + TAX + SHIP (within ₹0.01 tolerance)
12. Calculate percentage: TAX_RATE = (TAX / S) × 100%

**Expected Results:**
- Tax line item is visible (if taxes apply)
- Tax amount is reasonable (typically 5-18% of subtotal)
- Total = Subtotal + Tax + Shipping
- All components are clearly labeled
- Calculation is transparent and verifiable

**Pass Criteria:**
- ✅ Tax line item displayed (if applicable)
- ✅ Total = Subtotal + Tax + Shipping
- ✅ Tax calculation is accurate
- ✅ All components clearly labeled
- ✅ Mathematical relationship verified

**Fail Criteria:**
- ❌ Tax not displayed when applied
- ❌ Total ≠ Subtotal + Tax + Shipping
- ❌ Tax calculation errors
- ❌ Missing or unclear labels
- ❌ Mathematical inconsistencies

---

### Scenario 5: Multiple Products Total and Subtotal Validation

**Test Case ID:** TC15.5  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that subtotal and total are calculated correctly when multiple different products are in the cart.

**Preconditions:**
- At least 2 different products available in arrivals

**Test Steps:**

1. Navigate to home page (Shop → Home)
2. Note price of first product: P1
3. Add first product to basket
4. Return to home page
5. Note price of second product: P2
6. Add second product to basket
7. Navigate to checkout
8. Verify checkout shows 2 line items
9. Verify first line total = P1
10. Verify second line total = P2
11. Record displayed Subtotal (S)
12. Calculate expected: S_expected = P1 + P2
13. Verify: S = S_expected (within ₹0.01)
14. Record displayed Total (T)
15. Verify: T ≥ S
16. Check for tax and shipping explaining (T - S)

**Expected Results:**
- Subtotal = P1 + P2
- Total = Subtotal + Taxes + Shipping
- Total > Subtotal (typically)
- All line items displayed correctly
- Individual prices preserved
- Calculations are accurate

**Pass Criteria:**
- ✅ Subtotal = Sum of all line totals
- ✅ Total ≥ Subtotal
- ✅ All products listed separately
- ✅ Prices match original product prices
- ✅ Calculations accurate to ₹0.01

**Fail Criteria:**
- ❌ Subtotal ≠ Sum of line totals
- ❌ Total < Subtotal (without discount)
- ❌ Missing line items
- ❌ Price discrepancies
- ❌ Calculation errors

---

### Scenario 6: Display Position Relative to Proceed to Checkout Button

**Test Case ID:** TC15.6  
**Priority:** Medium  
**Type:** UI/UX Testing  

**Objective:**  
Verify that the total and subtotal values are positioned above the "Proceed to Checkout" button, ensuring users can review costs before proceeding.

**Preconditions:**
- Product in basket
- Checkout page displayed

**Test Steps:**

1. Add a product to basket and navigate to checkout
2. Locate the "Proceed to Checkout" button
3. Record button position (Y coordinate)
4. Locate the Subtotal row
5. Record subtotal position (Y coordinate)
6. Locate the Total row
7. Record total position (Y coordinate)
8. Compare Y coordinates
9. Verify: Subtotal_Y < ProceedButton_Y
10. Verify: Total_Y < ProceedButton_Y
11. Check visual hierarchy and spacing
12. Verify both values are visible without scrolling

**Expected Results:**
- Subtotal is positioned above "Proceed to Checkout" button
- Total is positioned above "Proceed to Checkout" button
- Both values are in the viewport when button is visible
- Clear visual separation between price breakdown and action button
- User can see final costs before clicking checkout

**Pass Criteria:**
- ✅ Subtotal Y position < Button Y position
- ✅ Total Y position < Button Y position
- ✅ Both visible in same viewport as button
- ✅ Clear visual hierarchy
- ✅ Good spacing and readability

**Fail Criteria:**
- ❌ Subtotal or Total below button
- ❌ Values hidden or require scrolling
- ❌ Poor visual hierarchy
- ❌ Confusing layout
- ❌ Overlap with button

---

## Test Data

### Product Information:
- **Source:** Home page "new arrivals" section
- **Expected Count:** 3 products
- **Required Fields:** Product name, price, image

### Expected Price Relationships:
```
Line Total = Unit Price × Quantity
Subtotal = Sum of all Line Totals
Tax = Subtotal × Tax Rate
Shipping = Fixed or calculated amount
Total = Subtotal + Tax + Shipping - Discounts

Expected: Total ≥ Subtotal
Typically: Total > Subtotal (when taxes/shipping apply)
```

### Currency:
- **Symbol:** ₹ (Indian Rupee)
- **Format:** ₹XXX.00 or ₹X,XXX.00

---

## Dependencies

### Prerequisites:
1. Test Plan 6: Arrivals Add to Basket (basic add functionality)
2. Test Plan 8: Checkout Items (navigation to checkout)
3. Test Plan 13: Checkout Final Price Display

### Related Test Plans:
- **Test Plan 9-10:** Coupon functionality (affects totals)
- **Test Plan 12:** Quantity updates (affects subtotal)
- **Test Plan 14:** Update basket (affects calculations)

---

## Risk Assessment

### High Risk Areas:
1. **Tax Calculation Errors:** Incorrect tax rates could show wrong totals
2. **Rounding Errors:** Decimal precision issues in calculations
3. **Missing Components:** Tax or shipping not included in total
4. **Relationship Violation:** Total < Subtotal when it shouldn't be

### Medium Risk Areas:
1. **Display Issues:** Values hidden or poorly positioned
2. **Currency Formatting:** Inconsistent decimal places or symbols
3. **Label Confusion:** Unclear distinction between subtotal and total

### Mitigation Strategies:
- Validate calculations with multiple test cases
- Test with various product prices
- Verify all price components are visible
- Check calculation formulas against e-commerce standards

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ Subtotal is visible and positioned above "Proceed to Checkout" button
2. ✅ Total is visible and positioned above "Proceed to Checkout" button
3. ✅ Total ≥ Subtotal in all test cases
4. ✅ Subtotal = Sum of all line item totals
5. ✅ Total = Subtotal + Tax + Shipping (when applicable)
6. ✅ All calculations are mathematically accurate (±₹0.01 tolerance)
7. ✅ Clear labels distinguish Subtotal from Total
8. ✅ Currency symbols displayed consistently
9. ✅ All 6 test scenarios pass
10. ✅ Price breakdown is transparent and verifiable

### Overall Test Plan FAIL Criteria:
1. ❌ Subtotal or Total not visible in checkout
2. ❌ Values positioned below "Proceed to Checkout" button
3. ❌ Total < Subtotal (without discount explanation)
4. ❌ Subtotal ≠ Sum of line items
5. ❌ Mathematical errors in calculations
6. ❌ Missing tax or shipping components
7. ❌ Confusing or missing labels
8. ❌ Inconsistent currency formatting
9. ❌ Any critical test scenario fails
10. ❌ Price calculations cannot be verified

---

## Important Clarification

### Regarding Requirement Statement:
The original requirement states: *"The total always < subtotal because taxes are added in the subtotal"*

**Clarification:**
This statement appears to contain a logical error. In standard e-commerce practice:

- **Subtotal:** Sum of product prices (before additional charges)
- **Taxes:** Applied **TO** the subtotal, **added ON TOP**
- **Total:** Subtotal **PLUS** taxes and shipping
- **Correct Relationship:** Total = Subtotal + Taxes + Shipping
- **Result:** Total > Subtotal (when taxes/shipping apply)

**This test plan validates the CORRECT behavior:**
```
Subtotal = ₹500.00
+ Tax (18%) = ₹90.00
+ Shipping = ₹50.00
─────────────────────
Total = ₹640.00

Therefore: Total (₹640) > Subtotal (₹500) ✓
```

The tests will verify that Total ≥ Subtotal, which is the expected and correct behavior.

---

## Defect Reporting

### Severity Levels:

**Critical:**
- Total < Subtotal without valid discount
- Missing subtotal or total display
- Completely wrong calculations

**High:**
- Incorrect tax calculations
- Subtotal not matching line item sum
- Poor visibility of price breakdown

**Medium:**
- Minor rounding errors (> ₹0.01)
- Positioning issues
- Label ambiguity

**Low:**
- Formatting inconsistencies
- Minor UI spacing issues

### Required Defect Information:
- Test Case ID
- Screenshot of checkout page
- Recorded values: Subtotal, Total, Tax, Shipping
- Expected vs Actual calculations
- Browser and version
- Console errors (if any)

---

## Test Execution Notes

### Special Considerations:
1. **Tax Configuration:** Verify if site has tax enabled
2. **Shipping Settings:** Check if shipping costs apply
3. **Decimal Precision:** Use ±₹0.01 tolerance for comparisons
4. **Free Shipping:** May result in Total = Subtotal + Tax

### Execution Tips:
- Take screenshots of full price breakdown
- Record all intermediate values
- Verify calculations manually
- Check for hidden tax/shipping rows
- Test with different product price ranges

---

## Appendix

### Calculation Formulas:

```
Line Total = Unit Price × Quantity

Subtotal = Σ(Line Totals)
         = Line Total₁ + Line Total₂ + ... + Line Totalₙ

Tax = Subtotal × Tax Rate

Total = Subtotal + Tax + Shipping - Discounts
```

### Example Calculation:

```
Product 1: ₹300.00 × 1 = ₹300.00
Product 2: ₹450.00 × 1 = ₹450.00
─────────────────────────────────
Subtotal:              ₹750.00
Tax (18%):            ₹135.00
Shipping:              ₹50.00
─────────────────────────────────
Total:                ₹935.00

Verification: ₹935.00 > ₹750.00 ✓
```

### Glossary:
- **Subtotal:** Sum of all product line totals before taxes/fees
- **Total:** Final amount including all charges
- **Line Total:** Price × Quantity for a single product
- **Tax:** Government-imposed charge on subtotal
- **Proceed to Checkout:** Button to advance to payment/shipping information

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
| 1.0 | 2025-10-29 | QA Team | Initial test plan creation with Total ≥ Subtotal validation |

---

**End of Test Plan**
