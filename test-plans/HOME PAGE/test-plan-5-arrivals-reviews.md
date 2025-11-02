# Test Plan 5: Home Page - Arrivals Images Reviews

## Test Overview
**Purpose**: Verify that arrival images on the home page navigate to product pages with functional Reviews tab  
**URL**: http://practice.automationtesting.in/  
**Seed File**: tests/seed.spec.ts  
**Test File**: home-page-arrivals-images-reviews-fixed.spec.ts

## Test Scenarios

### 5.1 Arrivals images should navigate to product pages with reviews

**Objective**: Test that clicking on arrival images leads to product pages where users can view and interact with product reviews

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
10. Now click on Reviews tab for the book you clicked on
11. There should be a Reviews regarding that book the user clicked on

**Expected Results:**
- ✅ Home page displays exactly 3 arrivals with images, titles, and prices
- ✅ Clicking arrival image navigates to product detail page
- ✅ Product page URL matches pattern `/.*\/product\/.*\//`
- ✅ Product page displays title, price, and summary
- ✅ "Add to Basket" button is visible and enabled
- ✅ Reviews tab is clickable and functional
- ✅ Reviews content is visible (review form or existing reviews)
- ✅ Product name matches between home page and product page

### 5.2 All arrival products should have accessible reviews

**Objective**: Ensure all three arrival products have working reviews functionality

**Steps:**
1. Navigate to home page via Shop → Home flow
2. Verify 3 arrivals are present
3. For each arrival product (iterate through all 3):
   - Click the product image
   - Verify navigation to product page with correct URL
   - Verify product title and "Add to Basket" button functionality
   - Click Reviews tab
   - Verify reviews content is accessible
   - Go back to home page for next iteration
4. Log verification for each product

**Expected Results:**
- ✅ All 3 products have working image navigation
- ✅ All products have functional Reviews tabs
- ✅ Each product has accessible reviews section
- ✅ Navigation flow works consistently for all products
- ✅ Back navigation maintains proper state

### 5.3 Review form functionality should be accessible

**Objective**: Verify that review forms are accessible and functional when available

**Steps:**
1. Navigate to home page and first product
2. Click Reviews tab
3. Verify review form elements if present:
   - Rating stars
   - Review text area
   - Name field
   - Email field
   - Submit button

**Expected Results:**
- ✅ Review form is accessible (if available)
- ✅ Form elements are visible and enabled
- ✅ Proper fallback handling if reviews require login

## Technical Implementation Details

### Key Selectors Used:
```typescript
// Arrivals products
'.products .product'

// Product images
'img' (within product locator)

// Reviews tab
'a[href="#tab-reviews"], .reviews_tab a, li[role="tab"] a'

// Reviews content (fixed selector)
'#tab-reviews'

// Reviews section
'#reviews, .woocommerce-Reviews'

// Review form (fixed selector to avoid strict mode)
'#review_form'  // Specific ID instead of compound selector

// Form elements
'textarea[name="comment"], #comment'
'input[name="author"], #author'  
'input[name="email"], #email'
'.stars, .star-rating, input[name="rating"]'
```

### Error Handling & Validation:
- ✅ **Consent Dialog**: Graceful handling with try-catch block
- ✅ **URL Validation**: Regex patterns for shop and product pages
- ✅ **Form Accessibility**: Conditional checks for review form availability
- ✅ **Strict Mode Fix**: Replaced compound selectors with specific IDs
- ✅ **Navigation State**: Proper back navigation and state management

### Fixed Issues:
- **Strict Mode Violations**: Replaced `#review_form, .comment-form` with specific `#review_form`
- **Selector Optimization**: Used specific IDs to avoid element conflicts
- **Robust Navigation**: Added proper URL validation and back navigation handling

## Test Execution Flow

### Navigation Pattern:
```
Home → Shop → Home → Product(1) → Reviews → Back → 
Product(2) → Reviews → Back → Product(3) → Reviews
```

### Validation Points:
1. **Homepage Validation**: 3 arrivals with complete product information
2. **Image Navigation**: Clickable images that navigate correctly
3. **Product Page Validation**: Title, price, basket button functionality
4. **Tab Interaction**: Reviews tab clicking and content display
5. **Reviews Verification**: Reviews section or form accessibility
6. **Cross-Product Consistency**: All 3 arrivals work identically

### Performance Considerations:
- Tests handle multiple page navigations efficiently
- Back navigation used instead of full page reloads
- Conditional form checks to handle login requirements
- Graceful timeout handling for dynamic content

## Success Criteria

### All tests must pass with:
- ✅ **3/3 test scenarios** executing successfully
- ✅ **3/3 arrival products** having working reviews
- ✅ **Zero strict mode violations** or selector conflicts
- ✅ **Consistent navigation flow** across all test iterations
- ✅ **Accessible reviews functionality** for all products

### Test Coverage:
- **Basic Navigation**: ✅ Image clicks and page transitions
- **Tab Functionality**: ✅ Reviews tab interaction
- **Content Accessibility**: ✅ Reviews section validation
- **Form Handling**: ✅ Review form element checks (when available)
- **Error Resilience**: ✅ Handles missing or login-required features
- **Multi-Product Testing**: ✅ Validates all 3 arrival products
- **State Management**: ✅ Proper back navigation and page state

## Related Test Plans:
- Test Plan 1: Home Page - Three Sliders
- Test Plan 2: Home Page - Three Arrivals  
- Test Plan 3: Home Page - Arrivals Images Navigation
- Test Plan 4: Home Page - Arrivals Images Description

## Implementation Notes

### Key Features:
- **Fixed Selector Strategy**: Uses specific IDs to avoid strict mode violations
- **Conditional Validation**: Handles cases where reviews require authentication
- **Cross-Product Testing**: Validates consistency across all arrivals
- **Efficient Navigation**: Optimizes page transitions and state management

### Selector Improvements:
```typescript
// BEFORE (caused strict mode violation):
page.locator('#review_form, .comment-form')

// AFTER (fixed):
page.locator('#review_form')
```

### Test Maintenance:
- Selectors designed for stability across site updates
- Clear logging for debugging and verification
- Modular test structure for easy modification
- Comprehensive error handling for production resilience
