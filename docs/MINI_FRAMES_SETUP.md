# Mini Frames Category Setup

## Overview
Mini Frames is the 4th category in the photo frame ordering system, offering compact frame sizes at affordable prices.

## Database Structure

### Category Information
- **ID**: 4
- **Name**: Mini Frames
- **Code**: MINI
- **Price Increment**: Rs. 0

### Frame Types (3 types)

| ID | Name | Material | Color Options |
|----|------|----------|---------------|
| 19 | Plymount Non-Margine | Plymount | No |
| 20 | Plymount Embossed | Plymount | No |
| 21 | Rotate Frame with LED Light | Plastic | No |

### Available Sizes

Mini frames use smaller, compact sizes (IDs 8-17):

| Size ID | Display | Width | Height | Unit |
|---------|---------|-------|--------|------|
| 8 | 3 x 3 | 3 | 3 | inch |
| 9 | 4 x 4 | 4 | 4 | inch |
| 10 | 4 x 8 | 4 | 8 | inch |
| 11 | 4 x 12 | 4 | 12 | inch |
| 12 | 8 x 8 | 8 | 8 | inch |
| 13 | 8 x 10 | 8 | 10 | inch |
| 14 | 8 x 16 | 8 | 16 | inch |
| 15 | 4 x 6 | 4 | 6 | inch |
| 16 | 5 x 7 | 5 | 7 | inch |
| 17 | 6 x 8 (LED) | 6 | 8 | inch |

### Pricing Structure

#### Frame 19: Plymount Non-Margine
- 3 x 3: Rs. 850
- 4 x 4: Rs. 950
- 4 x 8: Rs. 1,500
- 4 x 12: Rs. 1,950
- 8 x 8: Rs. 1,650
- 8 x 10: Rs. 2,250
- 8 x 16: Rs. 2,500

#### Frame 20: Plymount Embossed
- 4 x 6: Rs. 1,850
- 5 x 7: Rs. 1,500

#### Frame 21: Rotate Frame with LED Light
- 6 x 8 (LED): Rs. 2,150

## Pricing Rules

Mini Frames follow simpler pricing:
- **Base price**: As listed above
- **No category increment**: Mini frames have 0 price increment
- **No person charges**: Mini frames don't require person count
- **Package charges**: Premium package adds Rs. 450

**Total Price Formula:**
```
Total = Base Price + Package Charge
```

## Frontend Integration

### OrderPage.jsx Behavior

When Mini Frames category is selected:
1. Load 3 frame types (IDs 19-21)
2. Show frame selection (no color options needed)
3. Load sizes based on selected frame
4. No person count field (unlike Oil/Cute)
5. No background color selection
6. No design gallery
7. Package type selection (Standard/Premium)

### API Endpoints Used

```javascript
// Get frame types for Mini Frames
GET /api/frame-types/4

// Get sizes for a specific frame
GET /api/sizes/:frameTypeId

// Get price for frame + size combination
GET /api/prices/:frameTypeId/:sizeId
```

### Example API Response

```json
// GET /api/prices/19/8
{
  "success": true,
  "data": {
    "base_price": 850,
    "price_increment": 0,
    "final_price": 850,
    "size_display": "3 x 3",
    "frame_name": "Plymount Non-Margine",
    "category_name": "Mini Frames"
  }
}
```

## Migration Files

The following migrations were applied:

1. **`add_mini_frames_prices.sql`**: Added prices for Mini Frames
2. **`cleanup_cute_frames.sql`**: Removed incorrectly created Cute Collection frames (IDs 13-18)

## Testing

Verify Mini Frames setup:

```powershell
# Check frame types
$response = Invoke-RestMethod -Uri "http://localhost:3001/api/frame-types/4"
$response.data

# Check sizes for frame 19
$response = Invoke-RestMethod -Uri "http://localhost:3001/api/sizes/19"
$response.data

# Check price
$response = Invoke-RestMethod -Uri "http://localhost:3001/api/prices/19/8"
$response.data
```

## Frontend TODO (If needed)

If Mini Frames doesn't show properly in the frontend, check:

1. **Category selection**: Mini Frames should appear in category dropdown
2. **Frame loading**: Should load 3 frame types when MINI selected
3. **Size loading**: Should load appropriate sizes per frame
4. **Price display**: Should show correct prices without person charges
5. **No person count field**: Should hide person count for MINI category
6. **WhatsApp order**: Should format Mini Frames orders correctly

## Summary

✅ **Mini Frames category exists** (ID: 4)  
✅ **3 frame types added** (IDs 19-21)  
✅ **10 sizes available** (IDs 8-17)  
✅ **Prices configured** (Rs. 850 - Rs. 2,500)  
✅ **Old Cute Collection frames removed** (IDs 13-18)  
✅ **API endpoints working**  

**Status**: Ready for use in the ordering system! 🎉
