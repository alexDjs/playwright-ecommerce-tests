# Test Plan 7: Home Page - Arrivals Add to Basket with Stock Limits

## Application Overview

This test plan focuses on testing the add-to-basket functionality with stock quantity validation. The application should prevent users from adding more items to the basket than are available in stock and display appropriate error messages.

## Test Objectives

- Verify that users can successfully add books to basket
- Test stock quantity validation
- Confirm error handling for quantities exceeding stock limits
- Validate user experience with quantity input controls

## Test Scenarios

### Scenario 7.1: Basic Add to Basket Functionality
**Priority:** High
**Type:** Functional Testing

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
12. User can add a book by clicking on Add To Basket button which adds that book into his Basket

**Expected Results:**
- Home page displays exactly 3 arrivals
- Clicking arrival images navigates to product detail pages
- Product detail pages have functional "Add to Basket" buttons
- Successfully added items appear in cart menu with correct price
- Cart counter updates accurately

### Scenario 7.2: Stock Quantity Validation - Exceeding Available Stock
**Priority:** High
**Type:** Negative Testing / Boundary Testing

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
10. Identify the stock quantity available (e.g., if stock shows 20 books available)
11. In the quantity field, enter a number greater than available stock (e.g., 21 if stock is 20)
12. Select more books than the books in stock. Ex: if the stock has 20 books, try to add 21
13. Click the "Add to Basket" button
14. Now it throws an error prompt like "you must enter a value between 1 and 20"

**Expected Results:**
- Product page displays current stock quantity
- Quantity input field accepts user input
- When quantity exceeds stock, system displays validation error
- Error message clearly states valid quantity range (e.g., "you must enter a value between 1 and [max_stock]")
- Product is NOT added to basket when quantity is invalid
- User can correct the quantity and successfully add to basket

### Scenario 7.3: Stock Quantity Edge Cases
**Priority:** Medium
**Type:** Boundary Testing

**Steps:**
1. Navigate to product detail page (follow steps 1-9 from Scenario 7.2)
2. Test minimum boundary: Enter quantity = 0
3. Attempt to add to basket
4. Verify error handling
5. Test maximum boundary: Enter quantity = exact stock amount
6. Attempt to add to basket
7. Verify successful addition
8. Test just over maximum: Enter quantity = stock + 1
9. Verify error handling

**Expected Results:**
- Quantity = 0: Error message displayed, no addition to basket
- Quantity = exact stock: Successful addition to basket
- Quantity = stock + 1: Error message displayed, no addition to basket
- All error messages are clear and actionable

### Scenario 7.4: Multiple Products Stock Validation
**Priority:** Medium
**Type:** Functional Testing

**Steps:**
1. Navigate to home page and verify 3 arrivals
2. For each arrival product:
   a. Click product image
   b. Note the stock quantity
   c. Test adding maximum allowed quantity
   d. Test adding quantity exceeding stock
   e. Verify appropriate behavior
3. Return to home page and test next product

**Expected Results:**
- Each product maintains independent stock tracking
- Stock validation works consistently across all products
- Error messages are product-specific and accurate
- Cart correctly accumulates valid additions from multiple products

## Test Data Requirements

- Products with known stock quantities
- Test quantities: 0, 1, maximum stock, maximum stock + 1
- Valid test environment with functioning e-commerce cart

## Success Criteria

✅ **Must Pass:**
- All 3 arrival products are clickable and navigate to detail pages
- Add to basket works for valid quantities
- Stock validation prevents over-ordering
- Clear, informative error messages for invalid quantities
- Cart accurately reflects added items and quantities

✅ **Should Pass:**
- Error messages follow consistent format
- User can recover from errors by entering valid quantities
- Stock information is clearly displayed to users

## Risk Considerations

- **High Risk:** Stock validation bypass could lead to overselling
- **Medium Risk:** Unclear error messages cause user confusion
- **Low Risk:** Inconsistent behavior across different products

## Test Environment

- **Browser:** Chrome, Firefox, Safari
- **URL:** http://practice.automationtesting.in/
- **Prerequisites:** Site accessible, products in stock
- **Test Data:** Various quantity inputs (0, 1, valid max, invalid max+1)

## Notes

- This test plan specifically focuses on stock quantity validation
- Pay attention to error message clarity and user experience
- Document any inconsistencies in stock validation across products
- Verify that cart state remains correct after validation errors
