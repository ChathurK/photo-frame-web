# Plymount Frame Color Selection

## Date: October 18, 2025

## Overview
Added Black/White color selection support for all Plymount frames, matching the functionality already available for Fiber frames (which have 4 colors).

---

## Changes Made

### 1. Database Updates

**Migration File**: `database/migrations/add_plymount_colors.sql`

#### Frame Types Updated:
- Set `allows_color = TRUE` for all 12 Plymount frame types

#### Colors Added:
- **Black** and **White** colors added for all Plymount frames
- Total: 24 color entries (12 frames × 2 colors)

#### Affected Frame Types:
| ID | Name | Colors Added |
|----|------|--------------|
| 1 | Plymount Box Frame with Plastic Beading | Black, White |
| 2 | Plymount Embossed Frame | Black, White |
| 3 | Plymount Margine Frame | Black, White |
| 4 | Plymount Non-Margine Frame | Black, White |
| 6 | Plymount Box Frame Non-Margine | Black, White |
| 7 | Plymount Box Frame with Plastic Beading | Black, White |
| 8 | Plymount Embossed Frame | Black, White |
| 9 | Plymount Margine Frame | Black, White |
| 10 | Plymount Non-Margine Frame | Black, White |
| 12 | Plymount Box Frame Non-Margine | Black, White |
| 19 | Plymount Non-Margine (Mini) | Black, White |
| 20 | Plymount Embossed (Mini) | Black, White |

---

### 2. Frontend Updates

**File**: `frontend/src/components/OrderPage.jsx`

#### Updated: `getFrameImage()` Function

**What Changed:**
- Now properly handles `frameColorName` parameter for Plymount frames
- Uses selected color from dropdown (like Fiber frames)
- Maintains backward compatibility (fallback to extracting color from frame name)

**Before:**
```javascript
// Plymount frames extracted color from frame name only
if (frameName.includes('black')) {
  fileName = `Plymount Nonmargine Normal -Black - ${suffix}.jpg`;
}
```

**After:**
```javascript
// Plymount frames use color parameter first, fallback to name
if (colorName) {
  // Color selected via dropdown (NEW)
  if (colorName.includes('black')) {
    fileName = `Plymount Nonmargine Normal -Black - ${suffix}.jpg`;
  }
} else {
  // Fallback: extract from name (backward compatibility)
  if (frameName.includes('black')) {
    fileName = `Plymount Nonmargine Normal -Black - ${suffix}.jpg`;
  }
}
```

#### Frame Types Affected:
1. **Plymount Nonmargine** - Black/White selection
2. **Plymount Margine** - Black/White selection
3. **Plymount Box Frame** - Black/White selection
4. **Plymount Embossed** - Black/White selection

---

## How It Works

### User Flow:

1. **Select Category** → e.g., Oil Painting
2. **See Frame Cards** → Visual preview with default Black color
3. **Click Frame** → Selects the frame
4. **Color Dropdown Appears** → Shows "Black" and "White" options
5. **Select Color** → Preview updates to show selected color
6. **Detailed Preview** → Shows larger preview with zoom
7. **Click to Zoom** → Opens full-size modal

### Automatic Behavior:

The frontend **automatically detects** `allows_color = TRUE` and shows color selection:

```javascript
{orderData.frameTypeId && (() => {
  const selectedFrameType = frameTypes.find(
    (ft) => ft.id === parseInt(orderData.frameTypeId)
  );
  return selectedFrameType?.allows_color ? (
    <div className="form-group">
      <label>Frame Color</label>
      <select>{/* Black, White options */}</select>
    </div>
  ) : null;
})()}
```

**No additional code needed!** The existing color selection logic works for both Fiber and Plymount frames.

---

## Frame Material Comparison

| Material | Frames | Colors | Selection Method |
|----------|--------|--------|------------------|
| **Fiber** | 2 | 4 (Black, White, Brown, Pinewood) | Dropdown ✅ |
| **Plymount** | 12 | 2 (Black, White) | Dropdown ✅ |
| **Plastic** | 1 | 0 (No color options) | N/A |

---

## Preview Images

### Frame Card (Before Color Selection):
- Shows **default Black** preview
- Badge: "Multiple colors available"
- Click to select frame

### Detailed Preview (After Color Selection):
- Shows **selected color** preview
- Larger size with zoom icon
- Click to zoom to full size

### Zoom Modal:
- Full-size frame image
- Both Black and White images available
- Language-specific images (English/Sinhala)

---

## API Endpoints

### Get Frame Types (with color info):
```javascript
GET /api/frame-types/:categoryId

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Plymount Box Frame with Plastic Beading",
      "material": "Plymount",
      "allows_color": 1  // ✅ TRUE
    }
  ]
}
```

### Get Colors for Frame:
```javascript
GET /api/frame-colors/:frameTypeId

Response:
{
  "success": true,
  "data": [
    { "id": 9, "name": "Black" },
    { "id": 21, "name": "White" }
  ]
}
```

---

## Testing Results

✅ **Database**: All Plymount frames have `allows_color = 1`  
✅ **Colors**: Black and White available for all Plymount frames  
✅ **API**: Returns correct `allows_color` flag  
✅ **API**: Returns Black/White colors for Plymount frames  
✅ **Frontend**: Color dropdown appears for Plymount frames  
✅ **Frontend**: Preview updates when color selected  
✅ **Images**: Correct Black/White images load  
✅ **Zoom**: Full-size images work correctly  
✅ **Responsive**: Works on mobile/tablet/desktop  

---

## Image File Structure

All Plymount frame images already exist in the project:

```
frontend/src/assets/frames/
├── Plymount Nonmargine Normal/
│   ├── Plymount Nonmargine Normal -Black - eng.jpg
│   ├── Plymount Nonmargine Normal -Black - sin.jpg
│   ├── Plymount Nonmargine Normal -White - eng.jpg
│   └── Plymount Nonmargine Normal -White - sin.jpg
├── Plymount Margine Normal/
│   ├── Plymount Margine Normal- Black - eng.jpg
│   ├── Plymount Margine Normal- Black - sin.jpg
│   ├── Plymount Margine Normal- White - eng.jpg
│   └── Plymount Margine Normal- White - sin.jpg
├── Plymount Box Frame Nonmargine/
│   ├── Plymount Box Frame Nonmargine -Black english.jpg
│   ├── Plymount Box Frame Nonmargine -Black sinhala.jpg
│   ├── Plymount Box Frame Nonmargine -white english.jpg
│   └── Plymount Box Frame Nonmargine -white sinhala.jpg
└── Embossed Frames/
    ├── Plymount Embossed Plain Black - eng.jpg
    ├── Plymount Embossed Plain Black - sin.jpg
    ├── Plymount Embossed Plain white - eng.jpg
    └── Plymount Embossed Plain white - sin.jpg
```

**Note**: Images already exist! No new images needed. ✅

---

## Backward Compatibility

The update maintains backward compatibility:

1. **Old frames with color in name**: Still work (fallback logic)
2. **New frames with color selection**: Use dropdown
3. **Frames without color**: No dropdown shown (Plastic frames)

---

## Summary

### Frame Materials with Color Selection:

| Material | Colors | How User Selects |
|----------|--------|------------------|
| Fiber | 4 colors | Dropdown menu ✅ |
| Plymount | 2 colors | Dropdown menu ✅ |
| Plastic | No colors | N/A |

### User Experience:
- **Consistent**: Same UX for Fiber and Plymount frames
- **Visual**: See preview before and after color selection
- **Intuitive**: Dropdown appears only when colors available
- **Professional**: Matches modern e-commerce standards

---

## Status: ✅ Complete

Plymount frames now have full Black/White color selection functionality, matching the existing Fiber frame behavior. All frame previews and zoom functionality work correctly with selected colors.
