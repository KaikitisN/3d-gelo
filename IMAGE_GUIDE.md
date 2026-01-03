# Adding Your Own Product Photos to GELO's Designs

## 📸 Why You Need Real Photos

The current site uses placeholder images from Unsplash. For a professional shop, you need:
- **Actual photos** of your 3D printed products
- **Multiple angles** per product
- **Consistent lighting** and backgrounds
- **High quality** images (at least 1200x1200px)

---

## 🚫 Copyright Warning

**DO NOT** copy images from other websites like:
- ❌ Printables.com
- ❌ Thingiverse
- ❌ MyMiniFactory
- ❌ Cults3D
- ❌ Google Images (unless explicitly free)

These images are **copyrighted** by their creators. Using them without permission is **illegal**.

---

## ✅ Legal Options for Product Images

### Option 1: Take Your Own Photos (BEST)
**Requirements:**
- Smartphone or camera
- Good lighting (natural light or softbox)
- Plain background (white, gray, or colored backdrop)
- Tripod or stable surface

**Quick Setup:**
```
1. Find a well-lit area near a window (natural light)
2. Use a white poster board as background
3. Place product on background
4. Take photos from multiple angles:
   - Front view
   - Side view
   - Top view
   - Detail shots (texture, features)
5. Keep camera steady
6. Take at least 3-5 photos per product
```

**Phone Photography Tips:**
- Clean your camera lens
- Use portrait mode for depth
- Tap to focus on the product
- Avoid zoom (move closer instead)
- Take photos in daylight
- Edit brightness/contrast after

---

### Option 2: Use Free Stock Photos (TEMPORARY)
Only use these as **placeholders** until you have real photos:

**Free Image Sources:**
- **Pexels.com** - Free for commercial use
- **Unsplash.com** - Free for commercial use (already using)
- **Pixabay.com** - Free for commercial use

**Search Terms for 3D Printing:**
- "3d printed objects"
- "desk organizer"
- "home decor"
- "miniature figures"
- "desk accessories"

---

### Option 3: Hire a Product Photographer
**Cost:** $50-200 per session
**Benefits:** Professional quality, consistent style
**Find:** Fiverr, Upwork, local photographers

---

## 🖼️ Image Specifications

### Recommended Sizes:
- **Product Card:** 600x600px (minimum)
- **Product Detail:** 1200x1200px (minimum)
- **Category Banner:** 800x400px
- **Homepage Featured:** 1000x600px

### File Format:
- **Best:** `.jpg` or `.webp` (smaller file size)
- **Avoid:** `.png` (too large unless you need transparency)

### Compression:
Use **TinyPNG.com** or **Squoosh.app** to compress images without losing quality.

---

## 📁 How to Add Your Images

### Method 1: Host Images Online (Recommended)

**A. Use Cloudinary (Free Tier):**
1. Sign up at cloudinary.com
2. Upload your product photos
3. Copy the image URLs
4. Replace URLs in `src/data/products.json`

**B. Use Imgur:**
1. Go to imgur.com
2. Upload images
3. Right-click → "Copy image address"
4. Use in products.json

**Example:**
```json
{
  "id": "prod-001",
  "name": "Executive Pen Holder",
  "images": [
    "https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1/pen-holder-front.jpg",
    "https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1/pen-holder-side.jpg",
    "https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1/pen-holder-top.jpg"
  ]
}
```

---

### Method 2: Store Images Locally

**1. Create images folder:**
```bash
mkdir public/images/products
```

**2. Add your photos:**
```
public/
  └── images/
      └── products/
          ├── pen-holder-front.jpg
          ├── pen-holder-side.jpg
          └── pen-holder-top.jpg
```

**3. Update products.json:**
```json
{
  "id": "prod-001",
  "name": "Executive Pen Holder",
  "images": [
    "/images/products/pen-holder-front.jpg",
    "/images/products/pen-holder-side.jpg",
    "/images/products/pen-holder-top.jpg"
  ]
}
```

**4. Optimize images:**
```bash
# Install image optimization tool
npm install -D vite-plugin-imagemin

# Or use online tools:
# - tinypng.com
# - squoosh.app
```

---

## 🎨 Photography Best Practices

### Lighting Setup:
```
     Window
        ↓
    [  Light  ]
         ↓
   White Background
         ↓
    [ Product ]
         ↓
      Camera
```

### Background Options:
1. **White poster board** - Clean, professional
2. **Gray backdrop** - Shows shadows nicely
3. **Colored paper** - Brand colors
4. **Lifestyle setting** - Product in use

### Composition Tips:
- **Fill the frame** - Product should take up 70-80%
- **Rule of thirds** - Place product off-center
- **Show scale** - Include a common object for size reference
- **Consistent style** - Use same background for all products

---

## 🔄 Updating the Website

### Step 1: Prepare Images
```bash
# Recommended naming convention:
product-slug-view.jpg

# Examples:
pen-holder-front.jpg
pen-holder-side.jpg
pen-holder-detail.jpg
desk-organizer-front.jpg
```

### Step 2: Upload Images
- **Online:** Upload to Cloudinary/Imgur
- **Local:** Copy to `public/images/products/`

### Step 3: Update products.json
Open `src/data/products.json` and replace image URLs:

```json
{
  "id": "prod-001",
  "name": "Executive Pen Holder",
  "images": [
    "YOUR_IMAGE_URL_HERE",
    "YOUR_IMAGE_URL_HERE",
    "YOUR_IMAGE_URL_HERE"
  ]
}
```

### Step 4: Test
```bash
npm run dev
```
Visit http://localhost:5173 and check:
- ✅ All images load
- ✅ Images look good on mobile
- ✅ No broken image icons
- ✅ Image quality is acceptable

---

## 📱 Example Photo Shoot Workflow

### For One Product (15 minutes):

1. **Setup (3 min):**
   - Place white poster board near window
   - Position product on board
   - Check lighting

2. **Shoot (5 min):**
   - Front view (3 shots)
   - Side view (2 shots)
   - Top/angle view (2 shots)
   - Detail shots (2 shots)

3. **Review (2 min):**
   - Check focus and lighting
   - Delete blurry shots
   - Select best 3-4 images

4. **Edit (5 min):**
   - Crop to square
   - Adjust brightness
   - Increase contrast slightly
   - Save as JPEG

---

## 🛠️ Free Editing Tools

- **Mobile:**
  - Snapseed (iOS/Android)
  - VSCO (iOS/Android)
  - Lightroom Mobile (iOS/Android)

- **Desktop:**
  - GIMP (free Photoshop alternative)
  - Photopea.com (online Photoshop)
  - Canva.com (easy cropping/adjusting)

---

## ⚡ Quick Start Checklist

- [ ] Take photos of all products
- [ ] Edit and crop to consistent size
- [ ] Compress images (TinyPNG)
- [ ] Upload to Cloudinary or local folder
- [ ] Update products.json with new URLs
- [ ] Test website locally
- [ ] Verify on mobile device

---

## 💡 Pro Tips

1. **Batch processing:** Photograph all products in one session for consistent lighting
2. **Watermark:** Add subtle logo to protect your images
3. **File names:** Use descriptive names (desk-organizer-blue.jpg, not IMG_1234.jpg)
4. **Backups:** Keep original high-res images in a separate folder
5. **Update regularly:** Add new photos as your products improve

---

## 🆘 Common Issues

**Images too large?**
→ Compress with TinyPNG.com

**Images look different colors?**
→ Use consistent white balance in camera settings

**Images load slowly?**
→ Reduce file size to under 200KB each

**Images look pixelated?**
→ Use higher resolution source images (1200x1200+)

---

## 📞 Need Help?

If you're stuck:
1. Check the image URL in browser - does it load?
2. Verify file path is correct
3. Clear browser cache (Ctrl+Shift+R)
4. Check browser console for errors (F12)

Remember: **Real photos of YOUR products will always look better than any stock images!**
