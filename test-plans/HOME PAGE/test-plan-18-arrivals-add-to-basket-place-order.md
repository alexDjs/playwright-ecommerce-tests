# Test Plan 18: Home Page Arrivals - Add to Basket - Place Order

## Test Plan Information

**Test Plan ID:** TP-018  
**Test Plan Name:** Home Page Arrivals - Add to Basket - Complete Order Placement  
**Application:** Practice Automation Testing Website  
**Module:** E-commerce - Complete Checkout Flow - Order Confirmation  
**Version:** 1.0  
**Created:** October 29, 2025  
**Author:** QA Team  

---

## Application Overview

The Practice Automation Testing website implements a complete end-to-end e-commerce checkout process. This test plan validates the **entire order placement workflow**, from product selection through payment gateway submission to final order confirmation. This is the most comprehensive test plan covering all checkout stages including the final "Place Order" action and order confirmation page.

### Key Features Tested:
- **Product Selection**: Arrivals section product browsing
- **Add to Basket**: Shopping cart functionality
- **Cart Management**: View cart items with pricing
- **Checkout Navigation**: Proceed to checkout flow
- **Billing Information**: Customer details form completion
- **Payment Method Selection**: Multiple payment gateway options
- **Order Placement**: Submit order via "Place Order" button
- **Order Confirmation**: Verify order confirmation page with all details

---

## Test Objectives

1. **Validate Complete Checkout Flow**: Test end-to-end order placement process
2. **Test Billing Form Completion**: Ensure all billing fields can be filled
3. **Verify Payment Method Selection**: Confirm payment options are selectable
4. **Test Order Submission**: Validate "Place Order" button functionality
5. **Verify Order Confirmation**: Confirm navigation to order confirmation page
6. **Validate Order Details Display**: Check all order information on confirmation page

---

## Scope

### In Scope:
- Complete navigation from home page to order confirmation
- Product selection from arrivals section
- Add to basket functionality
- Cart item display with pricing
- Checkout navigation
- Billing details form completion (all required fields)
- Payment method selection (Direct Bank Transfer, Cheque, Cash on Delivery, PayPal)
- "Place Order" button click and submission
- Order confirmation page navigation
- Order confirmation page content validation:
  - Order details (products, quantities, prices)
  - Bank details (for bank transfer payment)
  - Customer details (billing information)
  - Billing details display
  - Order number/reference
  - Order status

### Out of Scope:
- Actual payment processing and fund transfer
- Bank account verification
- Payment gateway external integration testing
- Email notifications
- Order tracking system
- Order management/cancellation
- Refund processing
- Multiple payment attempts
- Failed payment scenarios

---

## Test Environment

- **URL:** http://practice.automationtesting.in/
- **Browsers:** Chrome, Firefox, Safari
- **Test Framework:** Playwright with TypeScript
- **Prerequisites:** 
  - Stable internet connection
  - Website accessibility
  - Products available in "new arrivals"
  - Checkout and payment gateway functional
  - Order confirmation page accessible
  - Test billing data available

---

## Test Scenarios

### Scenario 1: Complete Order Placement with Direct Bank Transfer

**Test Case ID:** TC18.1  
**Priority:** Critical  
**Type:** End-to-End Functional Testing  

**Objective:**  
Verify that a user can successfully complete an entire order placement process from product selection to order confirmation, using Direct Bank Transfer as the payment method.

**Preconditions:**
- Browser is open
- Website is accessible
- Products available in arrivals
- Checkout system functional

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
11. Verify total and subtotal are displayed above "Proceed to Checkout"
12. Verify Total ≥ Subtotal (taxes included)
13. Click "Proceed to Checkout" button
14. Verify navigation to payment gateway/checkout page
15. Verify presence of:
    - Billing Details form
    - Order Details section
    - Additional Details section
    - Payment Gateway options
16. Fill in Billing Details:
    - First Name: "John"
    - Last Name: "Doe"
    - Company Name: "Test Company" (optional)
    - Email Address: "john.doe@example.com"
    - Phone: "+91 9876543210"
    - Country: "India"
    - Street Address: "123 Test Street"
    - Town/City: "Mumbai"
    - State: "Maharashtra"
    - Postcode: "400001"
17. Select payment method: "Direct Bank Transfer"
18. Verify payment method is selected (radio button checked)
19. Click "Place Order" button
20. Wait for page navigation
21. Verify navigation to Order Confirmation page
22. Verify Order Confirmation page contains:
    - Order number/reference
    - "Thank you" or success message
    - Order details (products ordered)
    - Bank details (for Direct Bank Transfer)
    - Customer details (name, email, phone)
    - Billing address details
    - Order total and subtotal
    - Payment method information

**Expected Results:**
- Successfully navigates through entire checkout flow
- All forms accept input correctly
- Payment method selection works
- "Place Order" button is clickable
- Order is submitted successfully
- Page navigates to Order Confirmation
- Order Confirmation page displays all required information:
  - Order number is generated
  - Success/thank you message visible
  - Product details match cart
  - Bank transfer details shown (account number, sort code, etc.)
  - Customer information displayed correctly
  - Billing address matches entered data
  - Total and subtotal are correct
  - Payment method is "Direct Bank Transfer"

**Pass Criteria:**
- ✅ Complete checkout flow executes without errors
- ✅ All billing fields accept and save data
- ✅ Payment method selects correctly
- ✅ "Place Order" button submits order
- ✅ Order Confirmation page loads
- ✅ Order number/reference is displayed
- ✅ All order details are accurate
- ✅ Bank details are provided
- ✅ Customer and billing details are correct

**Fail Criteria:**
- ❌ Cannot complete checkout flow
- ❌ Billing form doesn't accept input
- ❌ Payment method doesn't select
- ❌ "Place Order" button doesn't work
- ❌ No navigation to confirmation page
- ❌ Order confirmation page is blank/broken
- ❌ Missing order details
- ❌ Incorrect information displayed

---

### Scenario 2: Order Placement with Cash on Delivery

**Test Case ID:** TC18.2  
**Priority:** High  
**Type:** End-to-End Functional Testing  

**Objective:**  
Verify complete order placement using Cash on Delivery (COD) payment method and validate order confirmation page content.

**Preconditions:**
- Browser is open
- Website is accessible

**Test Steps:**

1. Navigate to `http://practice.automationtesting.in/`
2. Handle consent dialog (if present)
3. Navigate: Shop → Home
4. Verify 3 arrivals displayed
5. Click first arrival image
6. Add product to basket
7. Navigate to cart via cart menu
8. Click "Proceed to Checkout"
9. Fill complete billing details:
   - First Name: "Jane"
   - Last Name: "Smith"
   - Email: "jane.smith@test.com"
   - Phone: "+91 9876543211"
   - Country: "India"
   - Address: "456 Sample Road"
   - City: "Delhi"
   - State: "Delhi"
   - Postcode: "110001"
10. Select "Cash on Delivery" payment method
11. Verify COD payment method is selected
12. Click "Place Order"
13. Verify Order Confirmation page loads
14. Verify order confirmation contains:
    - Order number
    - Success message
    - Payment method: "Cash on Delivery"
    - No bank details (COD doesn't require bank info)
    - Customer name: "Jane Smith"
    - Billing address: "456 Sample Road, Delhi, 110001"
    - Product details
    - Total amount

**Expected Results:**
- Order placement succeeds with COD
- Order Confirmation page displays
- Payment method shows "Cash on Delivery"
- Bank details section is not displayed (or shows COD instructions)
- All other order details are accurate
- Customer can see clear confirmation of COD order

**Pass Criteria:**
- ✅ COD payment method works
- ✅ Order submits successfully
- ✅ Confirmation page shows COD as payment
- ✅ Appropriate COD instructions displayed
- ✅ All order details correct

**Fail Criteria:**
- ❌ COD payment doesn't work
- ❌ Order fails to submit
- ❌ Wrong payment method shown
- ❌ Bank details shown for COD
- ❌ Missing order information

---

### Scenario 3: Order Confirmation Page - Bank Details Validation

**Test Case ID:** TC18.3  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Specifically validate that when "Direct Bank Transfer" is selected, the Order Confirmation page displays complete bank account details for payment.

**Preconditions:**
- Able to complete checkout
- Direct Bank Transfer payment available

**Test Steps:**

1. Complete checkout flow (Steps 1-16 from TC18.1)
2. Select "Direct Bank Transfer" payment method
3. Click "Place Order"
4. On Order Confirmation page, locate Bank Details section
5. Verify Bank Details section contains:
   - Bank Name
   - Account Name
   - Account Number
   - Sort Code / IFSC Code / Routing Number
   - Payment instructions
   - Order reference number to use
6. Verify instructions mention using Order ID as payment reference
7. Verify bank details are complete and readable
8. Verify bank details are formatted correctly

**Expected Results:**
- Bank Details section is clearly visible
- All required bank information present:
  - Bank Name: [Specific bank name]
  - Account Name: [Store/Company name]
  - Account Number: [Full account number]
  - Sort/IFSC/Routing Code: [Bank code]
- Clear payment instructions provided
- Order ID/reference number specified for payment
- Information is well-formatted and easy to read
- User can easily copy/note bank details

**Pass Criteria:**
- ✅ Bank Details section exists
- ✅ Bank name displayed
- ✅ Account details complete
- ✅ Banking codes (IFSC/Sort) shown
- ✅ Payment instructions clear
- ✅ Order reference mentioned

**Fail Criteria:**
- ❌ No Bank Details section
- ❌ Incomplete bank information
- ❌ Missing account numbers
- ❌ No payment instructions
- ❌ No order reference
- ❌ Poorly formatted details

---

### Scenario 4: Order Confirmation - Customer and Billing Details Validation

**Test Case ID:** TC18.4  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that the Order Confirmation page accurately displays all customer and billing details that were entered during checkout.

**Preconditions:**
- Completed an order
- Order Confirmation page loaded

**Test Steps:**

1. Complete order placement with specific billing data:
   - First Name: "Robert"
   - Last Name: "Johnson"
   - Email: "robert.j@example.com"
   - Phone: "+91 9988776655"
   - Address: "789 Oak Avenue"
   - City: "Bangalore"
   - State: "Karnataka"
   - Postcode: "560001"
2. Click "Place Order"
3. On Order Confirmation page, locate Customer Details section
4. Verify Customer Details contains:
   - Full Name: "Robert Johnson"
   - Email: "robert.j@example.com"
   - Phone: "+91 9988776655"
5. Locate Billing Address section
6. Verify Billing Address displays:
   - Street: "789 Oak Avenue"
   - City: "Bangalore"
   - State: "Karnataka"
   - Postcode: "560001"
   - Country: "India"
7. Verify all information matches entered data exactly
8. Verify formatting is clear and readable

**Expected Results:**
- Customer Details section visible
- Customer name matches: "Robert Johnson"
- Email matches: "robert.j@example.com"
- Phone matches: "+91 9988776655"
- Billing Address section visible
- Address matches entered data exactly
- All fields properly formatted
- No data loss or corruption
- Information is easy to read

**Pass Criteria:**
- ✅ Customer Details section exists
- ✅ Name displayed correctly
- ✅ Email displayed correctly
- ✅ Phone displayed correctly
- ✅ Billing Address section exists
- ✅ Address matches entered data
- ✅ All fields accurate

**Fail Criteria:**
- ❌ Customer Details missing
- ❌ Name incorrect or missing
- ❌ Email wrong or missing
- ❌ Phone incorrect
- ❌ Billing Address missing
- ❌ Address data incorrect
- ❌ Data corruption or loss

---

### Scenario 5: Order Confirmation - Order Details and Product Information

**Test Case ID:** TC18.5  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Validate that the Order Confirmation page displays complete and accurate order details including products, quantities, prices, subtotal, and total.

**Preconditions:**
- Product added to cart
- Order placed successfully

**Test Steps:**

1. Note product details before checkout:
   - Product name
   - Product price
   - Quantity
2. Complete checkout and place order
3. On Order Confirmation page, locate Order Details section
4. Verify Order Details displays:
   - Product name (matches cart)
   - Quantity ordered (e.g., "× 1")
   - Unit price (matches product price)
   - Line total (Price × Quantity)
5. Verify pricing breakdown:
   - Subtotal row with value
   - Tax row (if applicable)
   - Shipping row (if applicable)
   - Total row with final amount
6. Verify calculations:
   - Subtotal = Sum of line items
   - Total = Subtotal + Tax + Shipping
   - Total ≥ Subtotal
7. Verify currency symbols (₹) displayed
8. Verify all prices formatted correctly (₹XXX.00)

**Expected Results:**
- Order Details section is visible
- Product name matches ordered item
- Quantity is correct
- Unit price matches product price
- Line total calculated correctly
- Subtotal matches cart subtotal
- Tax displayed (if applicable)
- Total matches cart total
- Total ≥ Subtotal
- All prices have ₹ symbol
- Proper decimal formatting (₹XXX.00)
- All calculations are accurate

**Pass Criteria:**
- ✅ Order Details section present
- ✅ Product information accurate
- ✅ Quantities correct
- ✅ Prices match cart
- ✅ Subtotal calculated correctly
- ✅ Total calculated correctly
- ✅ Currency and formatting proper

**Fail Criteria:**
- ❌ Order Details missing
- ❌ Product information wrong
- ❌ Quantities incorrect
- ❌ Price mismatches
- ❌ Calculation errors
- ❌ Missing subtotal/total
- ❌ Poor formatting

---

### Scenario 6: Order Number Generation and Display

**Test Case ID:** TC18.6  
**Priority:** High  
**Type:** Functional Testing  

**Objective:**  
Verify that each placed order generates a unique order number/reference and that this number is prominently displayed on the Order Confirmation page.

**Preconditions:**
- Able to place orders
- Order Confirmation page accessible

**Test Steps:**

1. Complete first order placement
2. On Order Confirmation page, locate order number
3. Record order number (e.g., "Order #12345")
4. Verify order number format (numeric or alphanumeric)
5. Return to home page
6. Complete second order placement (different session)
7. On second Order Confirmation, record new order number
8. Compare first and second order numbers
9. Verify order numbers are different (unique)
10. Verify order number is prominently displayed (large text, highlighted)
11. Verify order number appears in multiple places:
    - Page heading/title
    - Order summary section
    - Bank payment reference (if applicable)

**Expected Results:**
- Each order generates unique order number
- Order number displayed prominently
- Order number format is consistent (e.g., "Order #XXXXX")
- Order numbers are sequential or unique
- First order number ≠ Second order number
- Order number visible in multiple sections
- Easy to identify and copy
- Can be used as payment reference

**Pass Criteria:**
- ✅ Order number generated
- ✅ Order number displayed prominently
- ✅ Each order has unique number
- ✅ Format is consistent
- ✅ Visible in multiple places
- ✅ Easy to read and copy

**Fail Criteria:**
- ❌ No order number generated
- ❌ Order number not visible
- ❌ Duplicate order numbers
- ❌ Inconsistent format
- ❌ Hard to find or read
- ❌ Missing from key sections

---

### Scenario 7: Success Message and Confirmation Text Validation

**Test Case ID:** TC18.7  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that the Order Confirmation page displays clear success messaging to confirm the order has been received and provide next steps to the customer.

**Preconditions:**
- Order placement successful

**Test Steps:**

1. Complete order placement
2. On Order Confirmation page, locate success/thank you message
3. Verify presence of success messaging such as:
   - "Thank you for your order"
   - "Order received"
   - "Your order has been placed successfully"
4. Check for additional confirmation text:
   - Order confirmation email mention
   - Next steps instructions
   - Payment instructions (for bank transfer)
   - Delivery timeframe (if applicable)
5. Verify message tone is positive and reassuring
6. Verify message is prominently displayed (large, bold, or highlighted)
7. Check for any error messages (should be none)
8. Verify overall page layout communicates success

**Expected Results:**
- Clear "Thank you" or success message visible
- Message is prominently displayed
- Additional helpful information provided:
  - Email confirmation mentioned
  - Next steps explained
  - Payment instructions clear (if needed)
- Positive, reassuring tone
- No error messages present
- Page design/layout indicates success (green colors, checkmarks, etc.)
- Customer feels confident order is placed

**Pass Criteria:**
- ✅ Success message displayed
- ✅ Message is clear and prominent
- ✅ Additional helpful info provided
- ✅ Positive tone
- ✅ No errors visible
- ✅ Page conveys success

**Fail Criteria:**
- ❌ No success message
- ❌ Message unclear or hidden
- ❌ Missing helpful information
- ❌ Negative or confusing tone
- ❌ Error messages present
- ❌ Page doesn't convey success

---

### Scenario 8: Multiple Payment Methods - Order Confirmation Consistency

**Test Case ID:** TC18.8  
**Priority:** Medium  
**Type:** Functional Testing  

**Objective:**  
Verify that Order Confirmation page content adapts appropriately based on the selected payment method (Direct Bank Transfer, Cheque, COD, PayPal).

**Preconditions:**
- Multiple payment methods available

**Test Steps:**

**Test 8A - Direct Bank Transfer:**
1. Complete order with "Direct Bank Transfer"
2. Verify Order Confirmation shows:
   - Bank details section
   - Payment instructions
   - Order reference for payment

**Test 8B - Cheque Payment:**
3. Complete order with "Cheque Payment"
4. Verify Order Confirmation shows:
   - Cheque payment instructions
   - Mailing address for cheque
   - Payee name
   - No bank account details

**Test 8C - Cash on Delivery:**
5. Complete order with "Cash on Delivery"
6. Verify Order Confirmation shows:
   - COD confirmation
   - Cash payment instructions
   - Amount to pay on delivery
   - No bank/cheque details

**Test 8D - PayPal:**
7. Complete order with "PayPal" (if available)
8. Verify Order Confirmation shows:
   - PayPal payment confirmation
   - Transaction reference (if applicable)
   - Payment status
   - No bank/cheque details

**For All Payment Methods:**
9. Verify payment method name is displayed
10. Verify appropriate payment-specific instructions
11. Verify irrelevant payment details are not shown

**Expected Results:**
- Each payment method shows appropriate details
- **Bank Transfer**: Bank account details visible
- **Cheque**: Mailing address and payee shown
- **COD**: Cash payment instructions clear
- **PayPal**: Transaction info displayed
- Payment method name always shown
- Only relevant payment info displayed
- No conflicting payment instructions
- Instructions match selected payment method

**Pass Criteria:**
- ✅ Payment method displayed correctly
- ✅ Bank Transfer shows bank details
- ✅ Cheque shows mailing info
- ✅ COD shows cash instructions
- ✅ PayPal shows transaction info
- ✅ No irrelevant payment details

**Fail Criteria:**
- ❌ Wrong payment method shown
- ❌ Missing payment-specific details
- ❌ Conflicting payment instructions
- ❌ Bank details shown for COD
- ❌ Cheque info shown for PayPal
- ❌ Confusing or incorrect info

---

## Test Data

### Billing Information Set 1 (Default):
```
First Name: John
Last Name: Doe
Company: Test Company Ltd
Email: john.doe@example.com
Phone: +91 9876543210
Country: India
Address: 123 Test Street, Apartment 4B
City: Mumbai
State: Maharashtra
Postcode: 400001
```

### Billing Information Set 2 (Alternative):
```
First Name: Jane
Last Name: Smith
Company: Sample Corp
Email: jane.smith@test.com
Phone: +91 9876543211
Country: India
Address: 456 Sample Road
City: Delhi
State: Delhi
Postcode: 110001
```

### Billing Information Set 3 (Validation):
```
First Name: Robert
Last Name: Johnson
Company: Example Inc
Email: robert.j@example.com
Phone: +91 9988776655
Country: India
Address: 789 Oak Avenue
City: Bangalore
State: Karnataka
Postcode: 560001
```

### Payment Methods:
1. **Direct Bank Transfer** - Shows bank account details
2. **Cheque Payment** - Shows mailing address
3. **Cash on Delivery** - Shows COD instructions
4. **PayPal** - Shows PayPal transaction info

---

## Dependencies

### Prerequisites:
1. Test Plan 6: Arrivals Add to Basket
2. Test Plan 13: Checkout Final Price
3. Test Plan 14: Update Basket at Checkout
4. Test Plan 15: Total & Subtotal Display
5. Test Plan 16: Proceed to Checkout
6. Test Plan 17: Payment Gateway Validation

### Related Test Plans:
- **Test Plan 16:** Checkout functionality (prerequisite)
- **Test Plan 17:** Payment Gateway page (prerequisite)

---

## Important Notes

### On Total vs Subtotal:
The requirement states "total always < subtotal because taxes are added in the subtotal". This is incorrect. The correct relationship is:
- **Total = Subtotal + Taxes + Shipping**
- **Expected: Total ≥ Subtotal**

This test plan validates the correct behavior on the Order Confirmation page.

### On Order Placement:
- This test plan includes **actual order submission** via "Place Order" button
- Orders will be created in the system
- Test data should be clearly marked as test orders
- Consider cleanup/deletion of test orders if possible

### On Payment Processing:
- This test validates the **Order Confirmation page** display
- **NO actual payment is processed** (no money transfer)
- Bank details are displayed but no payment is made
- This is front-end validation only

### On Order Confirmation Page:
Expected sections on confirmation page:
1. **Order Number/Reference**
2. **Success Message** ("Thank you for your order")
3. **Order Details** (products, quantities, prices)
4. **Payment Method Information**
5. **Bank Details** (for Direct Bank Transfer)
6. **Customer Details** (name, email, phone)
7. **Billing Address**
8. **Next Steps/Instructions**

---

## Risk Assessment

### High Risk Areas:
1. **Order Submission Failure:** "Place Order" doesn't work
2. **No Order Confirmation:** Page doesn't load after submission
3. **Missing Order Number:** No order reference generated
4. **Incomplete Order Details:** Missing critical information
5. **Payment Instructions Missing:** Bank details not shown

### Medium Risk Areas:
1. **Data Mismatch:** Billing details don't match entered data
2. **Price Calculation Errors:** Wrong totals on confirmation
3. **Poor Success Messaging:** Unclear confirmation
4. **Payment Method Confusion:** Wrong payment info shown

### Low Risk Areas:
1. **Formatting Issues:** Minor display problems
2. **Layout Inconsistencies:** Cosmetic issues
3. **Missing Optional Fields:** Company name, etc.

### Mitigation Strategies:
- Test all payment methods individually
- Verify each section of confirmation page
- Compare entered data with displayed data
- Test multiple order placements
- Validate order number uniqueness
- Check payment-specific details for each method

---

## Pass/Fail Criteria

### Overall Test Plan PASS Criteria:
1. ✅ Complete checkout flow executes successfully
2. ✅ All billing fields accept input
3. ✅ All payment methods are selectable
4. ✅ "Place Order" button works
5. ✅ Order Confirmation page loads after submission
6. ✅ Order number/reference is generated and displayed
7. ✅ Success message is clear and visible
8. ✅ Order details are complete and accurate
9. ✅ Payment-specific information displays correctly:
   - Bank details for Direct Bank Transfer
   - Cheque instructions for Cheque Payment
   - COD instructions for Cash on Delivery
10. ✅ Customer details match entered data
11. ✅ Billing address matches entered data
12. ✅ Product information is accurate
13. ✅ Pricing (subtotal, total) is correct
14. ✅ Total ≥ Subtotal relationship maintained
15. ✅ All 8 test scenarios pass

### Overall Test Plan FAIL Criteria:
1. ❌ Cannot complete checkout flow
2. ❌ Billing form doesn't accept data
3. ❌ Payment methods don't work
4. ❌ "Place Order" button is broken
5. ❌ Order Confirmation page doesn't load
6. ❌ No order number generated
7. ❌ No success message displayed
8. ❌ Order details missing or incorrect
9. ❌ Payment information missing or wrong
10. ❌ Customer details incorrect
11. ❌ Billing address wrong
12. ❌ Product information inaccurate
13. ❌ Price calculations wrong
14. ❌ Total < Subtotal (without discount)
15. ❌ Any critical test scenario fails

---

## Defect Reporting

### Severity Levels:

**Critical:**
- Cannot place order
- "Place Order" button doesn't work
- Order Confirmation page doesn't load
- No order number generated
- Complete data loss after submission

**High:**
- Missing critical order information
- Payment details missing (bank/cheque info)
- Customer details incorrect
- Price calculations wrong
- Missing success message

**Medium:**
- Optional fields missing
- Minor data inconsistencies
- Formatting issues in confirmation
- Unclear instructions
- Poor layout

**Low:**
- Cosmetic issues
- Minor text errors
- Non-critical spacing
- Optional features missing

### Required Defect Information:
- Test Case ID
- Step where failure occurred
- Payment method being tested
- Screenshots of:
  - Checkout page before submission
  - Order Confirmation page (or error)
- Expected vs Actual results
- Browser and version
- Console errors
- Network requests (if submission fails)

---

## Test Execution Notes

### Special Considerations:
1. **Real Orders:** This test creates actual orders in the system
2. **Test Data:** Use clearly marked test data (e.g., "Test Order" in notes)
3. **Order Cleanup:** Consider if test orders need deletion
4. **Payment Methods:** Availability may vary by configuration
5. **Confirmation Page:** Content may vary by payment method

### Execution Tips:
- Clear browser cache between tests
- Use different billing data for each test
- Take screenshots of Order Confirmation page
- Record order numbers for reference
- Test each payment method separately
- Verify URL of confirmation page
- Check for email confirmation (if applicable)
- Note timestamp of order placement

### Pre-Test Checklist:
- [ ] Website is accessible
- [ ] Products available in arrivals
- [ ] Checkout system functional
- [ ] All payment methods enabled
- [ ] Test billing data prepared
- [ ] Screenshot capability ready

### Post-Test Actions:
- Document all generated order numbers
- Save screenshots of confirmations
- Note any orders needing cleanup
- Report any defects found
- Verify email confirmations (if sent)

---

## Appendix

### Expected Order Confirmation Page Structure:

```
┌─────────────────────────────────────────────────────────┐
│                ORDER CONFIRMATION PAGE                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✓ Thank you. Your order has been received.           │
│                                                         │
│  Order Number: #12345                                  │
│  Date: October 29, 2025                                │
│  Email: john.doe@example.com                           │
│  Total: ₹510.00                                        │
│  Payment Method: Direct Bank Transfer                  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  BANK DETAILS (for Direct Bank Transfer)          │ │
│  │                                                    │ │
│  │  Bank Name: State Bank of India                   │ │
│  │  Account Name: Automation Practice Store          │ │
│  │  Account Number: 1234567890                       │ │
│  │  IFSC Code: SBIN0001234                           │ │
│  │                                                    │ │
│  │  Please use Order #12345 as payment reference     │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  ORDER DETAILS                                     │ │
│  │                                                    │ │
│  │  Product                          Total            │ │
│  │  ───────────────────────────────────────           │ │
│  │  Selenium Ruby × 1               ₹500.00           │ │
│  │                                                    │ │
│  │  Subtotal:                       ₹500.00           │ │
│  │  Tax:                            ₹10.00            │ │
│  │  Total:                          ₹510.00           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  BILLING ADDRESS                                   │ │
│  │                                                    │ │
│  │  John Doe                                          │ │
│  │  Test Company Ltd                                 │ │
│  │  123 Test Street, Apartment 4B                    │ │
│  │  Mumbai, Maharashtra 400001                       │ │
│  │  India                                             │ │
│  │                                                    │ │
│  │  Email: john.doe@example.com                      │ │
│  │  Phone: +91 9876543210                            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Payment Method Specific Information:

**Direct Bank Transfer:**
```
Make your payment directly into our bank account.
Please use your Order ID as the payment reference.
Your order won't be shipped until funds clear.

Bank Details:
- Bank Name: [Bank Name]
- Account Name: [Store Name]
- Account Number: [Number]
- IFSC/Sort Code: [Code]
```

**Cheque Payment:**
```
Please send a cheque to:
[Store Name]
[Store Address]
[City, State, ZIP]

Make cheque payable to: [Payee Name]
Include Order #[Number] on the cheque memo.
```

**Cash on Delivery:**
```
Pay with cash upon delivery.
Amount to pay: ₹[Total]
Please keep exact change ready.
```

**PayPal:**
```
PayPal payment completed.
Transaction ID: [Transaction ID]
Receipt sent to: [Email]
```

### Sample Order Numbers:
- Format 1: `#12345` (numeric)
- Format 2: `ORD-12345` (alphanumeric with prefix)
- Format 3: `WC-2025-10-29-12345` (with date)

### Glossary:
- **Order Confirmation Page:** Page displayed after successful order placement
- **Order Number:** Unique reference ID for the order
- **Place Order Button:** Final submission button to complete purchase
- **Bank Details:** Account information for bank transfer payments
- **Customer Details:** Buyer's personal information
- **Billing Address:** Invoice address entered during checkout
- **Order Details:** Products, quantities, and pricing in the order

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
| 1.0 | 2025-10-29 | QA Team | Initial test plan for complete order placement and confirmation |

---

**End of Test Plan**
