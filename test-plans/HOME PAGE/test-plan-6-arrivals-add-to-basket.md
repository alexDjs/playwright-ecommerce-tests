# Test Plan 6: Home Page - Arrivals Images Add to Basket

## Test Overview
**Purpose**: Verify that arrival images on the home page navigate to product pages where users can successfully add books to their basket  
**URL**: http://practice.automationtesting.in/  
**Seed File**: tests/seed.spec.ts  
**Test File**: home-page-arrivals-images-add-to-basket.spec.ts

## Test Scenarios

### 6.1 Arrivals images should navigate to product pages and add to basket

**Objective**: Test complete flow from arrival image click to adding book to basket and viewing it in the menu

**Steps:**
1. Open the browser (automatic)
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
- ✅ Home page displays exactly 3 arrivals with images, titles, and prices
- ✅ Clicking arrival image navigates to product detail page
- ✅ Product page URL matches pattern `/.*\/product\/.*\//`
- ✅ Product page displays title, price, and summary
- ✅ "Add to Basket" button is visible and enabled
- ✅ Clicking "Add to Basket" successfully adds product to cart
- ✅ Cart/Menu item shows added book with correct price
- ✅ Cart counter updates to reflect added items
- ✅ Success message or confirmation appears after adding to basket

### 6.2 All arrival products can be added to basket

**Objective**: Ensure all three arrival products can be successfully added to basket

**Steps:**
1. Navigate to home page via Shop → Home flow
2. Verify 3 arrivals are present
3. For each arrival product (iterate through all 3):
   - Click the product image
   - Verify navigation to product page with correct URL
   - Verify product title and "Add to Basket" button functionality
   - Click "Add to Basket" button
   - Verify product is added to cart (check cart counter/menu)
   - Verify cart contains the correct product with price
   - Clear cart or continue with next product
4. Log verification for each product addition

**Expected Results:**
- ✅ All 3 products have working image navigation
- ✅ All products have functional "Add to Basket" buttons
- ✅ Each product can be successfully added to cart
- ✅ Cart properly reflects added products with correct pricing
- ✅ Cart functionality works consistently across all products

### 6.3 Basket menu item shows added products with prices

**Objective**: Verify that the basket/cart menu properly displays added products with accurate pricing

**Steps:**
1. Navigate to first arrival product
2. Add product to basket
3. Check cart/basket menu item
4. Verify product name appears in cart
5. Verify product price is displayed correctly
6. Verify cart total calculations
7. Test cart accessibility and interaction

**Expected Results:**
- ✅ Cart menu item becomes visible/active after adding product
- ✅ Product name matches the added item
- ✅ Product price is displayed accurately
- ✅ Cart total calculation is correct
- ✅ Cart interface is accessible and functional

## Technical Implementation Details

### Key Selectors Used:
```typescript
// Arrivals products
'.products .product'

// Product images
'img' (within product locator)

// Product titles
'h3' (within product locator)

// Prices (handles sale prices)
'.price, .woocommerce-Price-amount'

// Add to basket button
'button[name="add-to-cart"], .single_add_to_cart_button'

// Cart/Basket menu
'.cart-contents, .basket-contents, .cart-count'

// Cart items
'.cart-item, .basket-item'

// Cart total
'.cart-total, .basket-total, .total'

// Success messages
'.woocommerce-message, .added-to-cart, .success'

// Product page elements
'.product_title, h1'
'.summary .price'
'.summary'
```

### Error Handling & Validation:
- ✅ **Consent Dialog**: Graceful handling with try-catch block
- ✅ **URL Validation**: Regex patterns for shop and product pages
- ✅ **Cart State Management**: Proper verification of cart updates
- ✅ **Price Validation**: Accurate price matching between product and cart
- ✅ **Navigation State**: Proper back navigation and state management
- ✅ **Loading States**: Handle dynamic content loading for cart updates

### Cart Interaction Patterns:
- **Add to Cart Flow**: Product page → Click button → Verify addition → Check cart
- **Cart Validation**: Item name, price, quantity, and total verification
- **State Persistence**: Cart state maintenance across page navigation
- **Error Handling**: Handle out-of-stock or unavailable products

## Test Execution Flow

### Navigation Pattern:
```
Home → Shop → Home → Product(1) → Add to Basket → Verify Cart → 
Clear/Continue → Product(2) → Add to Basket → Verify Cart → 
Clear/Continue → Product(3) → Add to Basket → Verify Cart
```

### Validation Points:
1. **Homepage Validation**: 3 arrivals with complete product information
2. **Image Navigation**: Clickable images that navigate correctly
3. **Product Page Validation**: Title, price, basket button functionality
4. **Cart Addition**: Successful product addition with confirmation
5. **Cart Verification**: Accurate product and price display in cart
6. **Cross-Product Consistency**: All 3 arrivals work identically

### Performance Considerations:
- Tests handle cart state changes and updates
- Proper waiting for cart updates and success messages
- Efficient cart clearing between test iterations
- Graceful handling of cart loading states

## Success Criteria

### All tests must pass with:
- ✅ **3/3 test scenarios** executing successfully
- ✅ **3/3 arrival products** successfully added to basket
- ✅ **Accurate cart functionality** with correct pricing
- ✅ **Consistent basket behavior** across all test iterations
- ✅ **Proper cart menu display** with added products

### Test Coverage:
- **Basic Navigation**: ✅ Image clicks and page transitions
- **Cart Functionality**: ✅ Add to basket button interaction
- **Cart Verification**: ✅ Product and price validation in cart
- **Menu Integration**: ✅ Cart menu item functionality
- **Error Resilience**: ✅ Handles cart loading and update states
- **Multi-Product Testing**: ✅ Validates all 3 arrival products
- **State Management**: ✅ Proper cart state and navigation handling

## Related Test Plans:
- Test Plan 1: Home Page - Three Sliders
- Test Plan 2: Home Page - Three Arrivals  
- Test Plan 3: Home Page - Arrivals Images Navigation
- Test Plan 4: Home Page - Arrivals Images Description
- Test Plan 5: Home Page - Arrivals Images Reviews

## Implementation Notes

### Key Features:
- **Complete E-commerce Flow**: From product discovery to cart addition
- **Cart State Validation**: Ensures accurate cart representation
- **Cross-Product Testing**: Validates consistency across all arrivals
- **Menu Integration**: Tests cart menu functionality and display

### Cart Management:
- **Addition Verification**: Confirms successful product addition
- **Price Accuracy**: Validates correct pricing in cart
- **State Persistence**: Ensures cart maintains state during navigation
- **User Feedback**: Verifies success messages and cart updates

### Test Maintenance:
- Selectors designed for e-commerce stability
- Clear logging for cart state debugging
- Modular test structure for easy cart flow modification
- Comprehensive error handling for cart operation resilience

### Special Considerations:
- **Session Management**: Handle cart persistence across browser sessions
- **Stock Availability**: Account for potential out-of-stock scenarios
- **Price Calculations**: Verify tax, shipping, and total calculations
- **Cart Limits**: Handle maximum quantity or cart size restrictions
