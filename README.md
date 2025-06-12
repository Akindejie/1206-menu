# 1206 Empire Barcode Scanner App

A modern, mobile-first React application for 1206 Empire lounge featuring barcode scanning functionality and smooth animations.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive layout
- 📸 **Barcode Scanner** - Real-time barcode scanning using device camera
- 🍷 **Price Lists** - Complete alcohol, wine, drinks, and beer catalog
- 🎨 **Heavy Animations** - Smooth page transitions and interactive elements
- 🔍 **Search Functionality** - Quick search across all products
- 🌙 **Dark Theme** - Modern dark UI with gold accents
- ⚡ **Performance Optimized** - Fast loading with skeleton loaders

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **@zxing/library** - Barcode scanning functionality
- **CSS3** - Custom animations and responsive design
- **Web APIs** - Camera access and audio feedback

## Project Structure

```
src/
├── components/
│   ├── BarcodeScanner.jsx    # Full-screen barcode scanner
│   ├── Navigation.jsx        # Bottom navigation with floating scanner button
│   ├── PriceItem.jsx        # Individual price list item with animations
│   └── LoadingSpinner.jsx   # Loading states and skeleton loaders
├── pages/
│   ├── AlcoholPage.jsx      # Alcohol and wine price list
│   └── DrinksBeersPage.jsx  # Drinks and beers price list
├── data/
│   └── priceList.js         # Complete product catalog with prices
├── styles/
│   ├── App.css              # Global styles and theme
│   ├── animations.css       # Animation keyframes and utility classes
│   └── components.css       # Component-specific styles
└── App.js                   # Main app with routing
```

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Features Overview

### Barcode Scanner

- Uses device's back camera when available
- Supports multiple barcode formats (EAN, UPC, Code128)
- Real-time scanning with visual feedback
- Audio beep on successful scan
- Automatic product lookup in catalog

### Price Lists

- **Alcohol & Wine Page**: Premium spirits, cocktails, and wine
- **Drinks & Beers Page**: Soft drinks, energy drinks, and beers
- Organized sections with clear pricing
- Search functionality across all products
- Staggered loading animations

### Navigation

- Bottom navigation for easy thumb access
- Floating action button for quick scanner access
- Smooth page transitions
- Active state indicators

### Animations

- Page slide transitions
- Staggered item loading
- Pulsing scanner elements
- Bounce effects for scan results
- Smooth hover and touch interactions

## Browser Compatibility

- Modern browsers with camera API support
- iOS Safari 11+
- Android Chrome 67+
- Desktop browsers for development

## Performance Features

- React.memo for optimized re-renders
- Lazy loading for camera component
- Debounced search functionality
- 60fps smooth animations
- Optimized asset loading

## Responsive Design

- **Mobile First**: Designed for 320px+ screens
- **Tablet**: Enhanced layout for 768px+ screens
- **Desktop**: Optimized viewing for 1024px+ screens
- Touch-friendly interactive elements (44px minimum)
- Accessible color contrast and focus states

## Development Notes

- Camera permissions required for scanner functionality
- HTTPS required for camera access in production
- Fallback UI for devices without camera support
- Comprehensive error handling for all features
