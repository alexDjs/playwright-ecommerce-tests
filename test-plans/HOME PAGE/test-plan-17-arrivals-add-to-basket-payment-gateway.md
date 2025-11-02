# Test Plan 17: Home Page Arrivals - Add to Basket - Payment Gateway

## Test Plan Information

**Test Plan ID:** TP-017  
**Test Plan Name:** Home Page Arrivals - Add to Basket - Payment Gateway Validation  
**Application:** Practice Automation Testing Website  
**Module:** E-commerce - Checkout - Payment Gateway Integration  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website implements a complete WooCommerce checkout and payment gateway system. This test plan focuses on validating the **Payment Gateway page** functionality, including billing details form, order summary, payment method selection, and coupon application at checkout.

### Key Features Tested:
- **Billing Details Form**: Customer information collection
- **Order Details Display**: Cart summary and price breakdown
- **Additional Details Section**: Extra order information fields
- **Payment Gateway Options**: Multiple payment method selection
- **Coupon Application**: Discount code functionality at checkout
- **Form Validation**: Required field enforcement and data validation
- **Complete Checkout Flow**: End-to-end checkout process

---

## Test Objectives

1. **Validate Payment Page Access**: Verify successful navigation to payment gateway
2. **Test Billing Form**: Ensure all billing fields are present and functional
3. **Verify Order Summary**: Confirm order details are accurate and complete
4. **Test Payment Methods**: Validate all payment options are available
5. **Test Coupon Functionality**: Verify coupon application on payment page
6. **Assess Form Usability**: Evaluate user experience of checkout forms

---

## Scope

### In Scope:
- Navigation from cart to payment gateway page
- Billing details form presence and functionality
- Order details/summary display
- Additional details section
- Payment method options (Direct Bank Transfer, Cheque, Cash on Delivery, PayPal)
- Coupon code application at checkout
- Total and subtotal display on payment page
- Form field validation (required fields)
- User data entry and selection capabilities

### Out of Scope:
- Actual payment processing
- Payment gateway integration testing (bank/PayPal connectivity)
- Order submission and confirmation
- Email notifications
- Database validation
- Security/PCI compliance testing
- Fraud detection
- International payment methods

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - Products in "new arrivals" section
  - Checkout and payment gateway enabled
  - Multiple payment methods configured

---

## Test Scenarios

### Scenario 1: Payment Gateway Page Access and Structure

**Test Case ID:** TC17.1  
**Priority:** Critical  
**Type:** Functional Testing  

**Objective:**  
Verify that users can successfully access the payment gateway page and that all major sections (Billing Details, Order Details, Additional Details, Payment Gateway) are present.

**Preconditions:**
- Browser is open
- Website is accessible
- Product available in arrivals

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
10. Click on cart item link to navigate to cart page
11. Verify total and subtotal are displayed
12. Click "Proceed to Checkout" button
13. Wait for payment gateway page to load
14. Verify URL contains "checkout" or "billing"
15. Locate **Billing Details** section
16. Locate **Order Details** section
17. Locate **Additional Details** section (if present)
18. Locate **Payment Gateway** section
19. Verify all sections are visible and accessible

**Expected Results:**
- Successfully navigates to payment gateway page
- Page URL indicates checkout/billing page
- **Billing Details** form is visible with input fields
- **Order Details** summary shows cart items and totals
- **Additional Details** section is present (may include order notes)
- **Payment Gateway** options are visible
- All sections are properly formatted and organized
- Page is complete and functional

**Pass Criteria:**
- ✅ Payment gateway page loads successfully
- ✅ Billing Details section is present
- ✅ Order Details section is present
- ✅ Payment options are visible
- ✅ All sections are accessible and functional

**Fail Criteria:**
- ❌ Cannot access payment gateway page
- ❌ Missing Billing Details section
- ❌ Missing Order Details section
- ❌ No payment options available
- ❌ Page is broken or incomplete

---

### Scenario 2: Billing Details Form Validation

**Test Case ID:** TC17.2  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the Billing Details form contains all necessary fields and allows users to input their billing information correctly.

**Preconditions:**
- Navigated to payment gateway page
- Billing Details form is visible

**Test Steps:**

1. Navigate to payment gateway page (following steps from TC17.1)
2. Locate Billing Details section
3. Identify and verify presence of the following fields:
   - First Name
   - Last Name
   - Company Name (optional)
   - Email Address
   - Phone Number
   - Country/Region
   - Street Address
   - Town/City
   - State/County/Province
   - Postcode/ZIP
4. Verify required fields are marked (asterisk or "required" label)
5. Test inputting data into each field:
   - Click on First Name field
   - Type test data (e.g., "John")
   - Verify text appears in field
6. Repeat for all input fields
7. Test dropdown fields (Country, State) if present
8. Verify field formatting and validation hints

**Expected Results:**
- All standard billing fields are present
- Required fields are clearly marked
- All fields accept appropriate input
- Text fields allow typing
- Dropdown fields show options
- Fields have proper labels
- Form is organized logically
- No broken or non-functional fields

**Pass Criteria:**
- ✅ All expected billing fields are present
- ✅ Required fields are marked
- ✅ All fields accept input correctly
- ✅ Field labels are clear
- ✅ Form is user-friendly

**Fail Criteria:**
- ❌ Missing critical billing fields
- ❌ Required fields not marked
- ❌ Fields don't accept input
- ❌ Unclear or missing labels
- ❌ Form is confusing or broken

---

### Scenario 3: Order Details Display Validation

**Test Case ID:** TC17.3  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that the Order Details section accurately displays the cart contents, including products, quantities, prices, subtotal, and total.

**Preconditions:**
- Product added to basket
- Payment gateway page loaded

**Test Steps:**

1. Add a product to basket and navigate to payment gateway
2. Locate Order Details/Order Review section
3. Verify section header (e.g., "Your order", "Order details")
4. Check for product listing:
   - Product name displayed
   - Quantity displayed
   - Individual price displayed
   - Line total displayed (price × quantity)
5. Verify Subtotal row:
   - Label: "Subtotal"
   - Value: Sum of all line totals
   - Currency symbol (₹)
6. Check for Shipping row (if applicable)
7. Check for Tax row (if applicable)
8. Verify Total row:
   - Label: "Total"
   - Value: Subtotal + Shipping + Tax
   - Prominently displayed
9. Compare order details with cart page values
10. Verify all prices are formatted correctly

**Expected Results:**
- Order Details section is clearly visible
- All cart products are listed
- Product names, quantities, and prices match cart
- Subtotal = Sum of line items
- Total includes all charges
- Total ≥ Subtotal (correct e-commerce logic)
- Currency symbols displayed
- All values properly formatted
- Information is accurate and complete

**Pass Criteria:**
- ✅ Order Details section is complete
- ✅ All products from cart are shown
- ✅ Prices match cart page
- ✅ Subtotal calculation is correct
- ✅ Total calculation is correct

**Fail Criteria:**
- ❌ Order Details section is missing
- ❌ Products missing from order
- ❌ Prices don't match cart
- ❌ Incorrect calculations
- ❌ Missing totals

---

### Scenario 4: Payment Gateway Options Validation

**Test Case ID:** TC17.4  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that multiple payment method options are available and selectable, including Direct Bank Transfer, Cheque Payment, Cash on Delivery, and PayPal.

**Preconditions:**
- Payment gateway page is loaded
- Payment section is visible

**Test Steps:**

1. Navigate to payment gateway page
2. Scroll to Payment section
3. Locate payment method options
4. Verify presence of the following payment methods:
   - **Direct Bank Transfer**
   - **Cheque Payment**
   - **Cash on Delivery (COD)**
   - **PayPal** (or other online payment)
5. For each payment method:
   - Verify radio button or checkbox is present
   - Verify payment method name/label is clear
   - Click/select the payment method
   - Verify selection is indicated (radio button filled, option highlighted)
   - Check for payment instructions or description
6. Test switching between payment methods
7. Verify only one can be selected at a time (if radio buttons)
8. Check for payment method icons/logos

**Expected Results:**
- Payment section is clearly visible
- Multiple payment methods are available
- At least the following options present:
  - Direct Bank Transfer
  - Cheque Payment
  - Cash on Delivery
  - PayPal
- Each method is selectable
- Clear labels and descriptions
- Selection is visually indicated
- Switching between methods works correctly
- Payment instructions displayed when selected

**Pass Criteria:**
- ✅ Payment section is visible
- ✅ At least 3-4 payment methods available
- ✅ All methods are selectable
- ✅ Clear labels and instructions
- ✅ Selection mechanism works properly

**Fail Criteria:**
- ❌ Payment section missing
- ❌ Fewer than 2 payment methods
- ❌ Payment methods not selectable
- ❌ Unclear or missing labels
- ❌ Selection doesn't work

---

### Scenario 5: Additional Details Section Validation

**Test Case ID:** TC17.5  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that the Additional Details section is present and allows users to enter extra order information such as order notes.

**Preconditions:**
- Payment gateway page loaded

**Test Steps:**

1. Navigate to payment gateway page
2. Look for Additional Details section
3. Common locations: between Billing and Payment, or below Order Details
4. Identify section header (e.g., "Additional Information", "Order Notes")
5. Look for order notes field:
   - Label: "Order notes" or "Additional information"
   - Field type: Textarea
   - Placeholder text (if any)
6. Test entering text in the notes field:
   - Click in the field
   - Type test message (e.g., "Please deliver after 5 PM")
   - Verify text appears
7. Check character limit (if any)
8. Verify field is optional (not required)

**Expected Results:**
- Additional Details section is present (may be optional)
- Order notes or similar field available
- Field accepts text input
- Textarea provides sufficient space
- Field is clearly labeled
- Optional nature is indicated
- User can enter special instructions

**Pass Criteria:**
- ✅ Additional Details section exists
- ✅ Order notes field is functional
- ✅ Field accepts text input
- ✅ Clear labeling
- ✅ User-friendly

**Fail Criteria:**
- ❌ Section completely missing (acceptable if not required)
- ❌ Notes field not functional
- ❌ Cannot enter text
- ❌ Poor labeling
- ❌ Confusing implementation

**Note:** Some sites may not have this section; its absence is not necessarily a failure.

---

### Scenario 6: Coupon Application on Payment Gateway Page

**Test Case ID:** TC17.6  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that users can apply discount coupons on the payment gateway page and that the coupon affects the order total correctly.

**Preconditions:**
- Payment gateway page loaded
- Valid coupon code available (e.g., "krishnasakinala")

**Test Steps:**

1. Navigate to payment gateway page with product in cart
2. Locate coupon code field
3. Common locations:
   - Above or below order details
   - In a collapsible section
   - Near the total/subtotal area
4. Identify coupon field elements:
   - Text input for coupon code
   - "Apply Coupon" button or link
5. Record original Subtotal (S1)
6. Record original Total (T1)
7. Enter valid coupon code (e.g., "krishnasakinala")
8. Click "Apply Coupon" button
9. Wait for page update/refresh
10. Verify coupon application:
    - Success message displayed
    - Discount row appears in order details
    - Discount amount shown (e.g., "₹50.00")
11. Record new Subtotal (S2)
12. Record new Total (T2)
13. Verify: T2 = T1 - Discount Amount
14. Verify coupon is listed in order summary
15. Test removing coupon (if "Remove" option exists)

**Expected Results:**
- Coupon field is present on payment page
- Field accepts text input
- "Apply Coupon" button is functional
- Valid coupon applies successfully
- Success message confirms application
- Discount appears in order breakdown
- Total is reduced by discount amount
- Calculations are accurate
- User can see applied coupon in order summary

**Pass Criteria:**
- ✅ Coupon field is present and functional
- ✅ Valid coupon applies successfully
- ✅ Discount appears in order details
- ✅ Total is reduced correctly
- ✅ Success message displayed

**Fail Criteria:**
- ❌ Coupon field is missing
- ❌ Coupon doesn't apply
- ❌ No discount shown
- ❌ Incorrect calculation
- ❌ No confirmation of application

---

### Scenario 7: Form Field Validation and Required Fields

**Test Case ID:** TC17.7  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that the billing form enforces required field validation and prevents checkout with incomplete information.

**Preconditions:**
- Payment gateway page loaded

**Test Steps:**

1. Navigate to payment gateway page
2. Identify all required fields (marked with *)
3. Leave required fields empty
4. Select a payment method
5. Attempt to submit/place order (if possible without filling fields)
6. Verify validation errors appear:
   - Error messages displayed
   - Fields highlighted in red or with error indicators
   - Clear indication of what's missing
7. Fill in one required field
8. Attempt submit again
9. Verify error only shows for remaining empty fields
10. Fill all required fields with valid data
11. Verify no validation errors
12. Test invalid data:
    - Invalid email format
    - Non-numeric phone number
    - Invalid postcode format
13. Verify appropriate error messages

**Expected Results:**
- Required fields are clearly marked
- Cannot proceed with empty required fields
- Validation errors are clear and helpful
- Error messages appear near relevant fields
- Valid data passes validation
- Invalid data triggers appropriate errors
- Email validation works
- Phone number validation works
- User receives clear guidance on fixing errors

**Pass Criteria:**
- ✅ Required fields enforced
- ✅ Clear validation error messages
- ✅ Errors appear for invalid data
- ✅ Valid data is accepted
- ✅ User-friendly error handling

**Fail Criteria:**
- ❌ Can submit with empty required fields
- ❌ No validation errors shown
- ❌ Unclear error messages
- ❌ Invalid data is accepted
- ❌ Poor error UX

---

### Scenario 8: Total and Subtotal Display on Payment Page

**Test Case ID:** TC17.8  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that total and subtotal values are correctly displayed on the payment gateway page and match the values from the cart page.

**Preconditions:**
- Product in cart with known price
- Navigated to payment gateway

**Test Steps:**

1. Add product to cart and note price (P)
2. Navigate to cart page
3. Record cart page Subtotal (S_cart)
4. Record cart page Total (T_cart)
5. Click "Proceed to Checkout"
6. On payment gateway page, locate order details
7. Find and record Subtotal (S_payment)
8. Find and record Total (T_payment)
9. Compare values:
   - Verify: S_payment = S_cart
   - Verify: T_payment = T_cart
10. Verify: T_payment ≥ S_payment
11. Check for tax line item (if Total > Subtotal)
12. Check for shipping line item
13. Verify all prices display ₹ currency symbol
14. Verify proper formatting (₹XXX.00)

**Expected Results:**
- Subtotal on payment page matches cart page
- Total on payment page matches cart page
- Total ≥ Subtotal (correct e-commerce logic)
- All prices properly formatted
- Currency symbols displayed
- Tax/shipping line items explain any difference
- Values are consistent across pages

**Pass Criteria:**
- ✅ Payment page totals match cart page
- ✅ Total ≥ Subtotal
- ✅ Proper formatting and currency
- ✅ Calculations are correct
- ✅ Values are consistent

**Fail Criteria:**
- ❌ Totals don't match between pages
- ❌ Total < Subtotal (without discount)
- ❌ Poor formatting
- ❌ Calculation errors
- ❌ Inconsistent values

---

## Test Data

### Product Information:
- **Source:** Home page "new arrivals" section
- **Expected Count:** 3 products
- **Required Fields:** Product name, price, image

### Test Billing Data:
```
First Name: John
Last Name: Doe
Email: john.doe@example.com
Phone: +91 9876543210
Country: India
Street Address: 123 Test Street
Town/City: Mumbai
State: Maharashtra
Postcode: 400001
```

### Payment Methods to Verify:
1. **Direct Bank Transfer** - Manual bank payment
2. **Cheque Payment** - Check/Cheque payment option
3. **Cash on Delivery (COD)** - Pay upon delivery
4. **PayPal** - Online payment gateway

### Valid Coupon Code:
- Code: `krishnasakinala`
- Discount: ₹50.00
- Minimum: ₹450.00

---

## Dependencies

### Prerequisites:
1. Test Plan 6: Arrivals Add to Basket
2. Test Plan 15: Total & Subtotal Display
3. Test Plan 16: Checkout Functionality
4. Test Plan 9: Coupon Application

### Related Test Plans:
- **Test Plan 13:** Checkout Final Price Display
- **Test Plan 10:** Coupon Value Restrictions

---

## Important Notes

### On Total vs Subtotal:
The requirement states "total always < subtotal because taxes are added in the subtotal". This is incorrect e-commerce logic. The correct relationship is:
- **Total = Subtotal + Taxes + Shipping**
- **Expected: Total ≥ Subtotal**

This test plan validates the correct behavior.

### On Payment Processing:
This test plan focuses on the **payment gateway page interface** and does NOT include:
- Actual payment processing
- Bank/PayPal integration testing
- Order completion and confirmation
- These are out of scope for front-end validation

---

## Risk Assessment

### High Risk Areas:
1. **Form Validation Bypass:** Users submit incomplete information
2. **Payment Method Selection:** No payment method selected or saved
3. **Price Mismatch:** Totals differ between cart and payment pages
4. **Coupon Issues:** Coupon doesn't apply or applies incorrectly

### Medium Risk Areas:
1. **Missing Fields:** Incomplete billing form
2. **Poor UX:** Confusing form layout or labels
3. **Validation Errors:** Unhelpful or missing error messages
4. **Payment Options:** Fewer than expected payment methods

### Mitigation Strategies:
- Test all form fields thoroughly
- Verify payment method selection works
- Compare prices across all pages
- Test coupon with various scenarios
- Validate error messages are helpful

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ Payment gateway page loads successfully
2. ✅ Billing Details form is complete with all fields
3. ✅ Order Details section shows accurate cart summary
4. ✅ Multiple payment methods available (minimum 3)
5. ✅ All payment methods are selectable
6. ✅ Coupon field is present and functional
7. ✅ Valid coupons apply and reduce total correctly
8. ✅ Required field validation works
9. ✅ Totals match between cart and payment pages
10. ✅ Total ≥ Subtotal relationship is correct
11. ✅ All sections (Billing, Order, Payment) are functional
12. ✅ All 8 test scenarios pass

### Overall Test Plan FAIL Criteria:
1. ❌ Cannot access payment gateway page
2. ❌ Billing form is incomplete or non-functional
3. ❌ Order Details section is missing
4. ❌ Fewer than 2 payment methods available
5. ❌ Payment methods are not selectable
6. ❌ Coupon functionality is broken
7. ❌ No required field validation
8. ❌ Price mismatch between cart and payment pages
9. ❌ Incorrect Total/Subtotal calculations
10. ❌ Major sections are missing or broken
11. ❌ Any critical test scenario fails

---

## Defect Reporting

### Severity Levels:

**Critical:**
- Cannot access payment gateway page
- No payment methods available
- Cannot enter billing information
- Price calculations completely wrong
- Required validation completely missing

**High:**
- Missing critical form fields
- Payment method selection doesn't work
- Coupon doesn't apply when valid
- Price mismatch between pages
- Unhelpful or missing validation errors

**Medium:**
- Minor missing fields
- Poor form UX
- Coupon field hard to find
- Formatting issues
- Unclear labels

**Low:**
- Cosmetic issues
- Minor spacing problems
- Non-critical field order
- Optional features missing

### Required Defect Information:
- Test Case ID
- Section affected (Billing/Order/Payment)
- Screenshots of the issue
- Expected vs Actual behavior
- Steps to reproduce
- Browser and version
- Console errors (if any)

---

## Test Execution Notes

### Special Considerations:
1. **Payment Methods:** Availability may vary by site configuration
2. **Coupon Codes:** Ensure test coupon is active
3. **Form Fields:** Country/state fields may differ by region
4. **Additional Details:** May not be present on all sites

### Execution Tips:
- Take screenshots of each section
- Record all form field names
- Document available payment methods
- Test coupon before and after application
- Compare totals across cart and payment pages
- Check console for JavaScript errors

---

## Appendix

### Payment Gateway Page Structure:

```
┌─────────────────────────────────────────────────┐
│         PAYMENT GATEWAY / CHECKOUT PAGE         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      BILLING DETAILS                     │  │
│  │  • First Name            *               │  │
│  │  • Last Name             *               │  │
│  │  • Company Name                          │  │
│  │  • Email Address         *               │  │
│  │  • Phone                 *               │  │
│  │  • Country               *               │  │
│  │  • Street Address        *               │  │
│  │  • Town/City             *               │  │
│  │  • State                 *               │  │
│  │  • Postcode              *               │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      ADDITIONAL DETAILS (Optional)       │  │
│  │  • Order Notes (Textarea)                │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      YOUR ORDER / ORDER DETAILS          │  │
│  │                                          │  │
│  │  Product                    Total        │  │
│  │  ─────────────────────────────────       │  │
│  │  Product Name × 1          ₹XXX.00       │  │
│  │                                          │  │
│  │  Subtotal                  ₹XXX.00       │  │
│  │  Shipping                  Free/₹XX.00   │  │
│  │  Tax                       ₹XX.00        │  │
│  │  ─────────────────────────────────       │  │
│  │  Total                     ₹XXX.00       │  │
│  │                                          │  │
│  │  [Coupon Code Field] [Apply Coupon]     │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │      PAYMENT GATEWAY                     │  │
│  │                                          │  │
│  │  ○ Direct Bank Transfer                  │  │
│  │  ○ Cheque Payment                        │  │
│  │  ○ Cash on Delivery                      │  │
│  │  ○ PayPal                                │  │
│  │                                          │  │
│  │  [Payment Instructions/Details]          │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [ I agree to Terms & Conditions ]             │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │        [ PLACE ORDER ]                   │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Sample Payment Method Descriptions:

**Direct Bank Transfer:**
Make your payment directly into our bank account. Please use your Order ID as the payment reference.

**Cheque Payment:**
Please send a cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.

**Cash on Delivery:**
Pay with cash upon delivery.

**PayPal:**
Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.

### Glossary:
- **Billing Details:** Customer's billing/invoice address information
- **Order Details:** Summary of products, quantities, and prices
- **Additional Details:** Optional order notes or special instructions
- **Payment Gateway:** Section for selecting payment method
- **Coupon Code:** Discount code field and application
- **Place Order:** Final button to submit order (not tested in detail here)

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
| 1.0 | 2025-10-29 | QA Team | Initial test plan creation for payment gateway validation |

---

**End of Test Plan**
