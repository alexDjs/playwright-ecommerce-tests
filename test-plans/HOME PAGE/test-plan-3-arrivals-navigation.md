# Test Plan 3: Home Page - Arrivals Images Navigation

## Test Overview
**Purpose**: Verify that arrival images are clickable and navigate to product pages with basket functionality  
**URL**: http://practice.automationtesting.in/  
**Seed File**: tests/seed.spec.ts  
**Test File**: home-page-arrivals-images-navigation.spec.ts

## Test Scenarios

### 3.1 Arrivals images should navigate to product pages

**Objective**: Test that clicking on arrival images leads to product pages where users can add books to basket

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

**Expected Results:**
- ✅ Home page displays exactly 3 arrivals
- ✅ All arrival images are visible and clickable
- ✅ Clicking image navigates to product detail page
- ✅ Product page URL matches expected pattern
- ✅ Product page displays title, price, and summary
- ✅ "Add to Basket" button is visible and enabled
- ✅ Product name matches between home and product pages

### 3.2 All arrival products should have working navigation

**Objective**: Ensure all three arrival products have functional image navigation

**Steps:**
1. Test each arrival product individually
2. Verify image click navigation for all 3 products
3. Confirm basket functionality on each product page
4. Validate product information consistency

**Expected Results:**
- ✅ All 3 products have clickable images
- ✅ All products navigate to correct detail pages
- ✅ All product pages have functional basket buttons
- ✅ Navigation works consistently across products

## Technical Implementation Details

### Key Selectors Used:
```typescript
// Arrivals products
'.products .product'

// Product images and details
'img' (clickable images)
'h3' (product titles)
'.price, .woocommerce-Price-amount' (prices)

// Product page elements
'.product_title, h1' (product page title)
'.summary .price' (product page price)
'button[name="add-to-cart"], .single_add_to_cart_button'

// URL patterns
/.*\/product\/.*\// (product page URL)
```

### Navigation Flow:
```
Home → Shop → Home → Product(1) → Back → 
Product(2) → Back → Product(3)
```

### Validation Points:
1. **Image Clickability**: All arrival images are interactive
2. **Navigation Accuracy**: Correct product page loading
3. **URL Validation**: Product page URL pattern matching
4. **Basket Functionality**: Add to basket button presence and state
5. **Product Consistency**: Name matching between pages
6. **Cross-Product Testing**: All 3 arrivals work identically

## Success Criteria
- ✅ **2/2 test scenarios** execute successfully
- ✅ **3/3 arrival images** are clickable and functional
- ✅ **Consistent navigation** across all products
- ✅ **Basket functionality** available on all product pages
