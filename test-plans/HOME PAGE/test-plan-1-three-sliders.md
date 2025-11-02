# Test Plan 1: Home Page - Three Sliders

## Test Overview
**Purpose**: Verify that the home page displays exactly three sliders after navigation from Shop to Home  
**URL**: http://practice.automationtesting.in/  
**Seed File**: tests/seed.spec.ts  
**Test File**: home-page-three-sliders.spec.ts

## Test Scenarios

### 1.1 Home page should display three sliders

**Objective**: Test that the home page contains exactly 3 functional sliders

**Steps:**
1. Open the browser (automatic)
2. Enter the URL "http://practice.automationtesting.in/"
3. Click on Shop Menu
4. Now click on Home menu button
5. Test whether the Home page has Three Sliders only
6. The Home page must contains only three sliders

**Expected Results:**
- ✅ Shop menu is clickable and navigates to shop page
- ✅ Home menu button is visible and functional
- ✅ Navigation returns to home page with correct URL
- ✅ Home page displays exactly 3 sliders
- ✅ All sliders are visible and functional
- ✅ Slider content loads properly

## Technical Implementation Details

### Key Selectors Used:
```typescript
// Navigation elements
'link[name="Shop"]'
'link[name="Home"]'

// Sliders
'.n2-ss-slide'

// URL validation
/.*\/shop\//
/practice\.automationtesting\.in\/$/
```

### Validation Points:
1. **Navigation Flow**: Home → Shop → Home
2. **URL Verification**: Correct page transitions
3. **Slider Count**: Exactly 3 sliders present
4. **Element Visibility**: All sliders are visible
5. **Functionality**: Sliders are interactive

## Success Criteria
- ✅ **Navigation works correctly** between Shop and Home
- ✅ **Exactly 3 sliders** are displayed on home page
- ✅ **All sliders are visible** and functional
- ✅ **URL validation** passes for both pages
