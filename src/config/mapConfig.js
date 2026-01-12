/**
 * Google Maps Configuration
 *
 * Easy to customize settings for the map
 * Update GOOGLE_MAPS_API_KEY with your own API key
 */

// ============================================
// GOOGLE MAPS API KEY - UPDATE THIS!
// ============================================
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

// ============================================
// MAP DEFAULT SETTINGS
// ============================================
export const MAP_DEFAULT_CENTER = {
  lat: 19.0596,
  lng: 72.8295
};

export const MAP_DEFAULT_ZOOM = 14;

// ============================================
// MAP STYLING - Customize the map appearance
// ============================================

export const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#FDF8F0" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#FDF8F0" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4A2C2A" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#F5E6D3" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#E8D5A3" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#C9A227", lightness: 50 }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#E8D5A3" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] }
];

// ============================================
// MAP OPTIONS
// ============================================
export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: 9 // RIGHT_BOTTOM
  },
  styles: MAP_STYLES
};

// ============================================
// DIRECTIONS RENDERER OPTIONS
// ============================================
export const DIRECTIONS_RENDERER_OPTIONS = {
  suppressMarkers: false,
  polylineOptions: {
    strokeColor: '#4285F4',
    strokeOpacity: 1,
    strokeWeight: 6
  }
};

// ============================================
// PIN SVG ICONS - Customize marker appearance
// ============================================
export const PIN_ICONS = {
  gold: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
      <defs>
        <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E8D5A3"/>
          <stop offset="100%" style="stop-color:#C9A227"/>
        </linearGradient>
        <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30c0-11-9-20-20-20z" fill="url(#goldGrad1)" filter="url(#shadow1)"/>
      <circle cx="20" cy="18" r="8" fill="#FDF8F0"/>
      <text x="20" y="22" text-anchor="middle" fill="#C9A227" font-size="12" font-weight="bold">☕</text>
    </svg>
  `,
  white: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
      <defs>
        <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" flood-opacity="0.2"/>
        </filter>
      </defs>
      <path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 24 16 24s16-12 16-24c0-8.8-7.2-16-16-16z" fill="#FFFFFF" stroke="#4A2C2A" stroke-width="2" filter="url(#shadow2)"/>
      <circle cx="16" cy="14" r="5" fill="#4A2C2A"/>
    </svg>
  `,
  special: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 58" width="48" height="58">
      <defs>
        <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFE566"/>
          <stop offset="50%" style="stop-color:#C9A227"/>
          <stop offset="100%" style="stop-color:#8B6914"/>
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M24 0C10.8 0 0 10.8 0 24c0 18 24 34 24 34s24-16 24-34c0-13.2-10.8-24-24-24z" fill="url(#goldGrad2)" filter="url(#glow)"/>
      <circle cx="24" cy="22" r="10" fill="#FDF8F0"/>
      <text x="24" y="27" text-anchor="middle" fill="#C9A227" font-size="14" font-weight="bold">★</text>
    </svg>
  `
};

// Pin sizes for different types
export const PIN_SIZES = {
  gold: { width: 40, height: 50 },
  white: { width: 32, height: 40 },
  special: { width: 48, height: 58 }
};

// ============================================
// FILTER CATEGORIES - Customize filter options
// ============================================
export const FILTER_CATEGORIES = [
  { value: 'all', label: 'All Coffee Spots', emoji: '' },
  { value: 'cute', label: 'Cute', emoji: '☕' },
  { value: 'cozy', label: 'Cozy', emoji: '🛋️' },
  { value: 'scenic', label: 'Scenic', emoji: '🌅' },
  { value: 'budget', label: 'Budget-Friendly', emoji: '💰' },
  { value: 'rooftop', label: 'Rooftop', emoji: '🌆' },
  { value: 'late', label: 'Open Late', emoji: '🌙' },
  { value: 'new', label: 'New Cafés', emoji: '✨' },
  { value: 'bru-gold', label: 'Bru GOLD Spots', emoji: '⭐' }
];

// Category emoji mapping
export const CATEGORY_EMOJIS = {
  cute: '☕',
  cozy: '🛋️',
  scenic: '🌅',
  budget: '💰',
  rooftop: '🌆',
  late: '🌙',
  new: '✨',
  'bru-gold': '⭐'
};

// ============================================
// TRAVEL MODES
// ============================================
export const TRAVEL_MODES = [
  { mode: 'DRIVING', emoji: '🚗', label: 'Driving' },
  { mode: 'WALKING', emoji: '🚶', label: 'Walking' },
  { mode: 'TRANSIT', emoji: '🚇', label: 'Transit' }
];

// ============================================
// THEME COLORS - Easy color customization
// ============================================
export const THEME_COLORS = {
  goldPrimary: '#C9A227',
  goldLight: '#E8D5A3',
  goldDark: '#8B6914',
  coffeeDark: '#2C1810',
  coffeeMedium: '#4A2C2A',
  cream: '#FDF8F0',
  creamDark: '#F5E6D3',
  white: '#FFFFFF',
  googleBlue: '#4285F4'
};

// ============================================
// HEAT MAP CONFIGURATION
// ============================================

// Popularity weights for heat map intensity
export const POPULARITY_WEIGHTS = {
  'Very High': 1.0,
  'High': 0.8,
  'Featured': 0.9,
  'Medium': 0.5,
  'Rising': 0.6,
  'Low': 0.3
};

// Heat map gradient (Zomato-style vibrant colors)
export const HEATMAP_GRADIENT = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 255, 255, 0.4)',     // cyan (low density)
  'rgba(0, 191, 255, 0.6)',     // deep sky blue
  'rgba(0, 127, 255, 0.7)',     // azure
  'rgba(0, 255, 0, 0.7)',       // green
  'rgba(127, 255, 0, 0.8)',     // chartreuse
  'rgba(255, 255, 0, 0.9)',     // yellow
  'rgba(255, 191, 0, 0.95)',    // golden
  'rgba(255, 127, 0, 1)',       // orange
  'rgba(255, 0, 0, 1)'          // red (high density)
];

// Heat map options
export const HEATMAP_OPTIONS = {
  radius: 40,
  opacity: 0.8,
  maxIntensity: 1,
  dissipating: true
};
