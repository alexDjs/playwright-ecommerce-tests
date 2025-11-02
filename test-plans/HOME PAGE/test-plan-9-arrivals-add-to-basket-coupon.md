# Test Plan 9: Home Page - Arrivals Add to Basket - Items - Coupon

## Application Overview

This test plan validates the complete e-commerce flow from product discovery to checkout with coupon application functionality. The test focuses on verifying that users can successfully navigate the site, add products to their basket, proceed to checkout, and apply discount coupons to reduce the total price.

## Key Features Tested

- **Product Navigation**: Home page arrivals section and product detail navigation
- **Shopping Cart**: Add to basket functionality and cart menu interaction
- **Checkout Process**: Complete flow from basket to checkout page
- **Coupon System**: Application of discount coupons with validation of price reduction
- **Price Calculation**: Verification of original price vs discounted price after coupon application

## Test Scenarios

### 1. Complete Shopping Flow with Coupon Application

**Seed:** `tests/seed.spec.ts`

#### 1.1 Navigate to Product and Add to Basket
**Steps:**
1. Open browser and navigate to "http://practice.automationtesting.in/"
2. Handle any consent dialogs if present
3. Click on "Shop" menu
4. Click on "Home" menu button
5. Verify the Home page has exactly three arrivals
6. Verify each arrival contains image, title, and price
7. Click on the first product image in arrivals section
8. Verify navigation to product detail page
9. Verify "Add To Basket" button is visible and clickable
10. Click "Add To Basket" button
11. Verify product appears in cart menu with correct price
12. Click on cart menu items link to navigate to checkout

**Expected Results:**
- Home page displays exactly 3 arrivals
- Product image navigation works correctly
- Add to basket functionality updates cart menu
- Cart menu shows correct item count and price
- Checkout page loads successfully

#### 1.2 Apply Coupon Code for Discount
**Steps:**
13. Verify checkout/basket page is loaded (URL contains basket/cart/checkout)
14. Locate and verify coupon code input field is present
15. Enter coupon code "krishnasakinala" in the coupon textbox
16. Click "Apply Coupon" button
17. Verify coupon is applied successfully
18. Verify price reduction of 50 rupees from total
19. Verify updated total price reflects the discount
20. Verify coupon application message/confirmation is displayed

**Expected Results:**
- Coupon input field is accessible and functional
- Coupon code "krishnasakinala" is accepted
- Total price is reduced by exactly 50 rupees
- Updated pricing is clearly displayed
- Success message confirms coupon application

### 2. Invalid Coupon Code Handling

**Seed:** `tests/seed.spec.ts`

#### 2.1 Test Invalid Coupon Code
**Steps:**
1. Complete steps 1-12 from scenario 1.1 (navigate and add product to basket)
2. Navigate to checkout page
3. Enter invalid coupon code "INVALID123" in coupon textbox
4. Click "Apply Coupon" button
5. Verify appropriate error message is displayed
6. Verify total price remains unchanged
7. Clear invalid coupon and enter valid coupon "krishnasakinala"
8. Verify valid coupon applies correctly

**Expected Results:**
- Invalid coupon codes are rejected with clear error message
- Price remains unchanged for invalid coupons
- Valid coupon can be applied after invalid attempt
- User feedback is clear and informative

### 3. Multiple Products with Coupon Application

**Seed:** `tests/seed.spec.ts`

#### 3.1 Add Multiple Products and Apply Coupon
**Steps:**
1. Navigate to home page and add first product to basket
2. Navigate back to home page
3. Add second product to basket
4. Verify cart shows multiple items
5. Navigate to checkout page
6. Record original total price for multiple items
7. Apply coupon code "krishnasakinala"
8. Verify 50 rupees discount is applied to the total
9. Verify final total is correct (original total - 50)

**Expected Results:**
- Multiple products can be added to basket
- Coupon applies to entire cart total
- Discount calculation is accurate for multiple items
- Cart totals update correctly after coupon application

### 4. Coupon Code Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 4.1 Test Coupon Code Edge Cases
**Steps:**
1. Complete basic add to basket flow
2. Navigate to checkout page
3. Test coupon with different case variations: "KRISHNASAKINALA", "KrishnaSakinala"
4. Test coupon with leading/trailing spaces: " krishnasakinala "
5. Test empty coupon field submission
6. Test special characters in coupon field
7. Verify only exact valid coupon code works
8. Test multiple coupon applications (if applicable)

**Expected Results:**
- System handles case sensitivity appropriately
- Whitespace is handled correctly
- Empty submissions are handled gracefully
- Invalid characters are rejected
- Coupon validation is robust and secure

## Test Data

**Valid Coupon Code:** krishnasakinala
**Expected Discount:** 50 rupees
**Test URL:** http://practice.automationtesting.in/
**Product Source:** Home page arrivals section (first 3 products)

## Success Criteria

1. All navigation flows work correctly
2. Add to basket functionality operates properly
3. Cart menu displays accurate information
4. Checkout page loads and displays cart contents
5. Coupon input field is accessible and functional
6. Valid coupon "krishnasakinala" applies 50 rupee discount
7. Invalid coupons are rejected with appropriate feedback
8. Price calculations are accurate before and after discount
9. User interface provides clear feedback for all coupon operations
10. Multiple product scenarios work with coupon application

## Notes

- Test assumes the coupon "krishnasakinala" provides exactly 50 rupees discount
- Discount may be applied as flat amount rather than percentage
- Coupon may have usage limitations or expiration dates
- System may prevent multiple coupon applications per order
- Price verification should account for tax calculations if applicable
