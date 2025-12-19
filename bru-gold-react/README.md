# Bru GOLD - The Love Map (React)

A React-based interactive coffee shop map application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Google Maps API:**
   - Get your API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Enable these APIs:
     - Maps JavaScript API
     - Directions API
     - Places API
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your API key to `.env`:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

3. **Start the app:**
   ```bash
   npm start
   ```

## Customization Guide

### Adding/Editing Coffee Spots

Edit `src/data/coffeeSpots.js`:

```javascript
{
  id: 1,
  name: "Café Name",
  subtitle: "Coffee Date Spot #1",
  type: "gold", // 'gold', 'white', or 'special'
  categories: ["cozy", "scenic"],
  lat: 19.0596,
  lng: 72.8295,
  distance: "1.2 km",
  openUntil: "11:00 PM",
  popularity: "High",
  address: "Full address here",
  images: ["https://..."],
  zomatoLink: "https://...",
  mapsLink: "https://..."
}
```

### Customizing Colors

Edit `src/styles/_variables.scss`:

```scss
// Gold Theme
$gold-primary: #C9A227;
$gold-light: #E8D5A3;
$gold-dark: #8B6914;

// Coffee Theme
$coffee-dark: #2C1810;
$coffee-medium: #4A2C2A;
```

### Customizing Map Style

Edit `src/config/mapConfig.js`:

```javascript
export const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#FDF8F0" }] },
  // Add more style rules...
];
```

### Customizing Filter Categories

Edit `src/config/mapConfig.js`:

```javascript
export const FILTER_CATEGORIES = [
  { value: 'all', label: 'All Coffee Spots', emoji: '' },
  { value: 'cute', label: 'Cute', emoji: '☕' },
  // Add more categories...
];
```

### Customizing Pin Icons

Edit `src/config/mapConfig.js` - modify the `PIN_ICONS` object with your own SVG icons.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js
│   ├── MapContainer.js
│   ├── Popup.js
│   ├── FilterPills.js
│   ├── DirectionsPanel.js
│   ├── Legend.js
│   └── Loading.js
├── config/
│   └── mapConfig.js     # All map & theme configuration
├── data/
│   └── coffeeSpots.js   # Coffee spots data
├── styles/              # SCSS styles
│   ├── _variables.scss  # Theme variables
│   ├── index.scss
│   ├── App.scss
│   └── [Component].scss
├── App.js
└── index.js
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
