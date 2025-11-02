# Test Plan 8: Home Page - Arrivals Add to Basket - Checkout Items

## Application Overview

This test plan focuses on testing the complete e-commerce flow from adding items to basket through to the checkout process. The application should allow users to add books to their basket and then proceed to checkout via the items link in the menu.

## Test Objectives

- Verify complete add-to-basket workflow
- Test navigation from basket menu to checkout page
- Confirm checkout page functionality and accessibility
- Validate end-to-end user purchase journey

## Test Scenarios

### Scenario 8.1: Complete Add to Basket and Checkout Flow
**Priority:** High
**Type:** End-to-End Functional Testing

**Steps:**
1. Open the browser
2. Enter the URL "http://practice.automationtesting.in/"
3. Click on Shop Menu
4. Now click on Home menu button
5. Test whether the Home page has Three Arrivals only
6. The Home page must contains only three Arrivals
7. Now click the image in the Arrivals
8. Test whether it is navigating to next page where the user can add that book into his basket
9. Image should be clickable and should navigate to next page where user can add that book to his basket
10. Click on the Add To Basket button which adds that book to your basket
11. User can view that Book in the Menu item with price
12. Now click on Item link which navigates to proceed to check out page
13. User can click on the Item link in menu item after adding the book into the basket which leads to the check out page

**Expected Results:**
- Home page displays exactly 3 arrivals
- Clicking arrival images navigates to product detail pages
- Product detail pages have functional "Add to Basket" buttons
- Successfully added items appear in cart menu with correct price
- Items link in menu is clickable and functional
- Items link navigates to checkout/cart page
- Checkout page displays added products correctly

### Scenario 8.2: Multiple Items Checkout Navigation
**Priority:** Medium
**Type:** Functional Testing

**Steps:**
1. Navigate to home page (steps 1-6 from Scenario 8.1)
2. Add first arrival product to basket
3. Return to home page
4. Add second arrival product to basket
5. Verify cart menu shows multiple items
6. Click on Items link in menu
7. Verify checkout page shows all added items with correct quantities and prices

**Expected Results:**
- Cart menu accurately reflects multiple items
- Items link remains functional with multiple products
- Checkout page displays all products correctly
- Total price calculation is accurate

### Scenario 8.3: Cart Menu Items Link Validation
**Priority:** High
**Type:** User Interface Testing

**Steps:**
1. Navigate through add-to-basket flow (steps 1-11 from Scenario 8.1)
2. Locate the Items link in the cart menu
3. Verify link is properly styled and accessible
4. Hover over the Items link to check interactive states
5. Click the Items link
6. Verify smooth navigation to checkout page
7. Verify browser back button functionality from checkout page

**Expected Results:**
- Items link is clearly visible and properly styled
- Link has appropriate hover/focus states
- Navigation to checkout is immediate and smooth
- Back button returns to previous page correctly
- No broken links or navigation errors

### Scenario 8.4: Checkout Page Content Validation
**Priority:** Medium
**Type:** Content and Layout Testing

**Steps:**
1. Complete add-to-basket flow (steps 1-12 from Scenario 8.1)
2. Verify checkout page loads completely
3. Check that added product information is displayed:
   - Product name
   - Product price
   - Product quantity
   - Product image/thumbnail
4. Verify page layout and responsiveness
5. Check for presence of checkout controls (quantity update, remove item, etc.)

**Expected Results:**
- Checkout page loads without errors
- All product information is accurately displayed
- Page layout is professional and user-friendly
- Interactive controls are functional
- Product data matches what was added to basket

## Test Data Requirements

- Products from arrivals section with known names and prices
- Test scenarios with single and multiple items
- Various browser types for cross-browser testing

## Success Criteria

✅ **Must Pass:**
- All 3 arrival products can be added to basket successfully
- Items link in cart menu is functional and accessible
- Items link correctly navigates to checkout page
- Checkout page displays accurate product information
- Navigation flow works consistently across all products

✅ **Should Pass:**
- Multiple items can be added and checkout flow works
- Cart menu updates in real-time as items are added
- Checkout page provides good user experience
- Browser navigation (back/forward) works properly

## Risk Considerations

- **High Risk:** Broken checkout flow prevents purchase completion
- **Medium Risk:** Incorrect product information on checkout page
- **Low Risk:** Minor UI/UX issues on checkout page

## Test Environment

- **Browser:** Chrome, Firefox, Safari
- **URL:** http://practice.automationtesting.in/
- **Prerequisites:** Site accessible, products available, checkout functionality enabled
- **Test Data:** Valid product selections from arrivals section

## Dependencies

- Functional add-to-basket mechanism (Test Plan 6)
- Working cart menu display
- Accessible checkout/cart page
- Proper product data persistence

## Notes

- This test plan focuses on the complete user journey from product selection to checkout initiation
- Pay special attention to data consistency between basket and checkout page
- Document any differences in product information display between cart menu and checkout page
- Verify that the checkout process can handle both single and multiple items
- Test plan assumes checkout page exists and is accessible via items link
