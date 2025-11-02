# Test Plan 2: Home Page - Three Arrivals

## Test Overview
**Purpose**: Verify that the home page displays exactly three arrivals with complete product information  
**URL**: http://practice.automationtesting.in/  
**Seed File**: tests/seed.spec.ts  
**Test File**: home-page-three-arrivals.spec.ts

## Test Scenarios

### 2.1 Home page should display three arrivals

**Objective**: Test that the home page contains exactly 3 arrival products with images, titles, and prices

**Steps:**
1. Open the browser (automatic)
2. Enter the URL "http://practice.automationtesting.in/"
3. Click on Shop Menu
4. Now click on Home menu button
5. Test whether the Home page has Three Arrivals only
6. The Home page must contains only three Arrivals

**Expected Results:**
- ✅ Shop menu navigation works correctly
- ✅ Home menu button returns to home page
- ✅ "New arrivals" section is visible
- ✅ Exactly 3 arrival products are displayed
- ✅ Each arrival has: image, title, price
- ✅ All product information is visible and properly formatted

## Technical Implementation Details

### Key Selectors Used:
```typescript
// Navigation elements
'link[name="Shop"]'
'link[name="Home"]'

// Arrivals section
'.products .product'
'text="new arrivals"'

// Product elements
'img' (product images)
'h3' (product titles)
'.price, .woocommerce-Price-amount' (product prices)
```

### Validation Points:
1. **Navigation Flow**: Home → Shop → Home
2. **Arrivals Section**: "New arrivals" text visibility
3. **Product Count**: Exactly 3 products
4. **Product Completeness**: Image, title, price for each
5. **Price Handling**: Support for sale prices with multiple elements

## Success Criteria
- ✅ **Navigation functions correctly**
- ✅ **Exactly 3 arrivals** are present
- ✅ **Complete product information** for all arrivals
- ✅ **Price display handles** both regular and sale prices
