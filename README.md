# Light 3D - 3D Printed Goods E-Shop

A production-quality React website for a 3D printed goods shop featuring catalog browsing, product customization, and order request checkout (no payment processing).

## 🎯 Project Overview

**Business Model:** Made-to-order catalog + inquiry checkout  
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS  
**Routing:** React Router v6  
**State Management:** React Context API  
**Data:** Local JSON (designed for easy API migration)

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── ErrorBoundary.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── MobileMenu.tsx
│   ├── Modal.tsx
│   ├── PageLoader.tsx
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   ├── Skeleton.tsx
│   └── Toast.tsx
├── context/             # React Context providers
│   └── CartContext.tsx
├── data/                # Static data files
│   └── products.json    # 18+ products, 6 categories
├── hooks/               # Custom React hooks
│   ├── useFocusTrap.ts
│   ├── useLocalStorage.ts
│   └── usePageMetadata.ts
├── pages/               # Route-based page components
│   ├── About.tsx
│   ├── Cart.tsx
│   ├── Category.tsx
│   ├── Checkout.tsx
│   ├── Contact.tsx
│   ├── FAQ.tsx
│   ├── Home.tsx
│   ├── NotFound.tsx
│   ├── Policy.tsx
│   ├── ProductDetail.tsx
│   └── Shop.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Helper functions
│   ├── analytics.ts
│   └── helpers.ts
├── App.tsx              # Main app component with routes
├── index.css            # Global styles + Tailwind
└── main.tsx             # App entry point

```

### Design Decisions

1. **Made-to-Order Focus:** Every product shows lead time; checkout ends with order request (no payment gateway)
2. **Context API over Redux:** Lightweight state management suitable for this scale
3. **Component Co-location:** Components organized by function, not feature
4. **Type Safety:** Strict TypeScript for reliability
5. **Accessibility First:** Focus traps, ARIA labels, keyboard navigation
6. **SEO Ready:** Page metadata hooks, Open Graph tags
7. **Code Splitting:** Lazy-loaded routes for performance

## 📋 Features Implemented

### Core Features
- ✅ **18+ Products** across 6 categories (Desk, Home Decor, Gaming, Tools, Miniatures, Custom)
- ✅ **Product Variants:** Material (PLA/PETG/Resin), Color, Size with price modifiers
- ✅ **Made-to-Order:** Lead time display, customization notes per cart item
- ✅ **Cart Management:** Add/remove, quantity, variants, localStorage persistence
- ✅ **Multi-Step Checkout:** Customer info → Shipping → Delivery → Review
- ✅ **Order Request:** Generates reference number, email/copy order summary

### UI/UX
- ✅ **Responsive Design:** Mobile-first with hamburger menu
- ✅ **Search:** Autocomplete with product suggestions
- ✅ **Filtering & Sorting:** Price, material, rating; multiple sort options
- ✅ **Pagination:** 12 products per page with navigation
- ✅ **Quick View Modal:** Preview products without leaving the page
- ✅ **Toast Notifications:** User feedback for actions
- ✅ **Skeleton Loaders:** Loading states for all async content
- ✅ **Empty States:** Graceful handling of no results/empty cart

### Accessibility
- ✅ **Focus Management:** Visible focus states, logical tab order
- ✅ **Focus Trapping:** Modals trap focus and restore on close
- ✅ **Keyboard Navigation:** All interactive elements keyboard-accessible
- ✅ **ARIA Attributes:** Proper labeling for screen readers
- ✅ **Semantic HTML:** Proper heading hierarchy, landmarks

### SEO
- ✅ **Dynamic Metadata:** Title, description per route
- ✅ **Open Graph Tags:** Social media preview optimization
- ✅ **Semantic URLs:** Clean routing structure

### Performance
- ✅ **Code Splitting:** Route-based lazy loading
- ✅ **Image Optimization:** Responsive images, lazy loading
- ✅ **Memoization:** useMemo for expensive calculations
- ✅ **Debouncing:** Search input optimization

### Analytics
- ✅ **Event Tracking:** view_item, add_to_cart, begin_checkout, submit_order_request
- ✅ **Console Logging:** Ready for analytics service integration

## 🗺️ Route Map

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, featured products, categories |
| `/shop` | All products with filters, sorting, pagination |
| `/category/:slug` | Category-specific product listing |
| `/product/:id` | Product detail with variants, customization |
| `/cart` | Shopping cart review and management |
| `/checkout` | Multi-step order request form |
| `/about` | Company information and values |
| `/contact` | Contact form and information |
| `/faq` | Frequently asked questions |
| `/policies/shipping-returns` | Shipping and returns policy |
| `/policies/privacy` | Privacy policy |
| `/policies/terms` | Terms of service |
| `*` | 404 page not found |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 📸 Adding Your Product Images

**⚠️ IMPORTANT:** The site currently uses placeholder images from Unsplash. 

For a professional shop, you need to replace these with **your own product photos**. See [IMAGE_GUIDE.md](IMAGE_GUIDE.md) for:
- ✅ How to take professional product photos with just a phone
- ✅ Legal free image sources (DO NOT copy from other 3D printing sites!)
- ✅ Image specifications and best practices
- ✅ Step-by-step guide to adding your images
- ✅ Recommended hosting (Cloudinary free tier)

**Quick Start:**
1. Take photos of your products (smartphone is fine!)
2. Upload to [Cloudinary.com](https://cloudinary.com) (free)
3. Update URLs in `src/data/products.json`
4. Done!

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

The site will hot-reload as you make changes.

### Production Build

```bash
# Create optimized production build
npm run build

# The output will be in the /dist directory
# Deploy the /dist folder to your hosting service
```

## 📦 Data Structure

### Product Schema
```typescript
{
  id: string;
  name: string;
  description: string;
  categorySlug: string;
  price: number;
  currency: string;
  images: string[];
  featured: boolean;
  tags: string[];
  materialOptions: MaterialOption[];
  colorOptions: ColorOption[];
  sizeOptions: SizeOption[];
  leadTimeDaysMin: number;
  leadTimeDaysMax: number;
  rating: number;
  reviewCount: number;
  sku: string;
}
```

### Categories
- Desk & Organization
- Home Decor
- Gaming & Accessories
- Tools & Gadgets
- Miniatures & Figures
- Custom Orders

## 🎨 Theming

The site uses Tailwind CSS with a custom primary color palette (blue). To change the theme:

1. Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your color scale
      }
    }
  }
}
```

## 🔄 Future Enhancements

### Easy Migrations
- **API Integration:** Replace `import data from './data/products.json'` with API calls
- **Authentication:** Add user accounts, order history
- **Payment Processing:** Integrate Stripe/PayPal
- **Admin Panel:** Product management, order processing
- **Reviews System:** Customer reviews and ratings
- **Wishlist:** Save products for later
- **Real-time Inventory:** Track stock levels

### Suggested Next Steps
1. Set up a backend API (Node.js/Express or similar)
2. Connect to a database (PostgreSQL, MongoDB)
3. Implement user authentication (JWT, OAuth)
4. Add payment processing (Stripe, Square)
5. Set up email notifications (SendGrid, AWS SES)
6. Deploy to production (Vercel, Netlify, AWS)

## 📊 Analytics Events

The following events are logged (ready for GA4/Mixpanel integration):

- `view_item` - Product detail page views
- `add_to_cart` - Items added to cart
- `begin_checkout` - Checkout process started
- `submit_order_request` - Order request submitted

Replace `console.log` in `src/utils/analytics.ts` with your analytics service.

## 🛠️ Tech Stack Details

### Core
- **React 18.2** - UI library
- **TypeScript 5.2** - Type safety
- **Vite 5.0** - Build tool and dev server

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### Routing & State
- **React Router 6.21** - Client-side routing
- **React Context API** - Global state management

### Development
- **ESLint** - Code linting
- **TypeScript ESLint** - TS-specific linting

## 🙏 Assumptions

1. **Image Hosting:** Uses Unsplash placeholders; replace with your own CDN URLs
2. **Email System:** Uses `mailto:` links; implement proper email service for production
3. **Payment:** Order request system; integrate payment gateway when ready
4. **Inventory:** Shows "Available" for all items; add inventory tracking as needed
5. **User Accounts:** Guest checkout only; add auth system for user accounts
6. **API:** Static JSON data; design supports easy API migration

## 📄 License

This project is provided as-is for Light 3D.

## 🤝 Support

For questions or issues:
- Open an issue in the repository
- Contact: hello@gelosdesigns.com

---

**Built with ❤️ for Light 3D**
