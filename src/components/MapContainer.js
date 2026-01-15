import { useCallback, useRef, useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_OPTIONS,
  PIN_ICONS,
  PIN_SIZES,
  POPULARITY_WEIGHTS,
  HEATMAP_GRADIENT,
  HEATMAP_OPTIONS
} from '../config/mapConfig';

const containerStyle = {
  width: '100%',
  height: '100%'
};

function MapContainer({
  spots,
  onMarkerClick,
  onMapLoad,
  selectedSpot,
  userLocation,
  onDirectionsUpdate,
  showHeatMap
}) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const labelsRef = useRef([]);
  const heatmapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  const isInitializedRef = useRef(false);
  const userMarkerRef = useRef(null);
  const hasRequestedLocationRef = useRef(false);
  const [mapCenter, setMapCenter] = useState(MAP_DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(MAP_DEFAULT_ZOOM);

  // Keep onMarkerClick ref updated
  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  // Request user location and center map
  const requestUserLocation = useCallback((map, spotsList) => {
    if (hasRequestedLocationRef.current) return;
    hasRequestedLocationRef.current = true;

    console.log('Requesting user location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          console.log('User location obtained:', userPos);

          // Add user location marker first
          if (userMarkerRef.current) {
            userMarkerRef.current.setMap(null);
          }

          userMarkerRef.current = new window.google.maps.Marker({
            position: userPos,
            map: map,
            title: 'Your Location',
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 3
            },
            zIndex: 1000
          });

          console.log('User marker added to map');

          // Update state to trigger re-render with user location at zoom 10 (more zoomed out)
          setMapCenter(userPos);
          setMapZoom(10);

          // Also set directly on map instance
          setTimeout(() => {
            map.setCenter(userPos);
            map.setZoom(10);
            console.log('Map centered on user location at zoom 10');
          }, 100);
        },
        (error) => {
          console.error('Geolocation error:', error);
          console.error('Error code:', error.code);
          console.error('Error message:', error.message);

          // If permission denied or error, prompt user
          if (error.code === error.PERMISSION_DENIED) {
            const requestPermission = window.confirm(
              'This app works best with your location. Would you like to enable location access? You can also enable it manually in your browser settings.'
            );
            if (requestPermission) {
              alert('Please enable location access in your browser settings and refresh the page.');
            }
          } else if (error.code === error.TIMEOUT) {
            console.error('Location request timed out');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            console.error('Position unavailable');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }, []);

  // Create heat map layer
  const createHeatMap = useCallback((map, spotsList) => {
    // Clear existing heat map
    if (heatmapRef.current) {
      heatmapRef.current.setMap(null);
    }

    // Create weighted locations for heat map
    const heatmapData = spotsList.map(spot => {
      const weight = POPULARITY_WEIGHTS[spot.popularity] || 0.5;
      return {
        location: new window.google.maps.LatLng(spot.lat, spot.lng),
        weight: weight
      };
    });

    // Create heat map layer
    heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
      radius: HEATMAP_OPTIONS.radius,
      opacity: HEATMAP_OPTIONS.opacity,
      maxIntensity: HEATMAP_OPTIONS.maxIntensity,
      gradient: HEATMAP_GRADIENT,
      dissipating: HEATMAP_OPTIONS.dissipating
    });
  }, []);

  // Create markers with custom SVG icons
  const createMarkers = useCallback((map, spotsList) => {
    // Clear existing markers and labels
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    labelsRef.current.forEach(label => label.setMap(null));
    labelsRef.current = [];

    spotsList.forEach(spot => {
      // Get SVG icon based on spot type
      let iconSvg;
      switch (spot.type) {
        case 'gold':
          iconSvg = PIN_ICONS.gold;
          break;
        case 'special':
          iconSvg = PIN_ICONS.special;
          break;
        default:
          iconSvg = PIN_ICONS.white;
      }

      const size = PIN_SIZES[spot.type] || PIN_SIZES.white;

      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: map,
        title: spot.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(iconSvg),
          scaledSize: new window.google.maps.Size(size.width, size.height)
        },
        animation: isInitializedRef.current ? null : window.google.maps.Animation.DROP
      });

      marker.addListener('click', () => onMarkerClickRef.current(spot));
      markersRef.current.push(marker);

      // Create custom label overlay
      class LabelOverlay extends window.google.maps.OverlayView {
        constructor(position, text) {
          super();
          this.position = position;
          this.text = text;
          this.div = null;
        }

        onAdd() {
          const div = document.createElement('div');
          div.style.position = 'absolute';
          div.style.fontSize = '11px';
          div.style.fontWeight = '600';
          div.style.fontFamily = 'DM Sans, sans-serif';
          div.style.color = '#2C1810';
          div.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          div.style.padding = '4px 8px';
          div.style.borderRadius = '8px';
          div.style.whiteSpace = 'nowrap';
          div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
          div.style.pointerEvents = 'none';
          div.style.userSelect = 'none';
          div.textContent = this.text;
          this.div = div;
          const panes = this.getPanes();
          panes.overlayLayer.appendChild(div);
        }

        draw() {
          if (this.div) {
            const overlayProjection = this.getProjection();
            const position = overlayProjection.fromLatLngToDivPixel(this.position);
            this.div.style.left = position.x + 'px';
            this.div.style.top = (position.y + 30) + 'px';
            this.div.style.transform = 'translateX(-50%)';
          }
        }

        onRemove() {
          if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
          }
        }
      }

      const label = new LabelOverlay(
        new window.google.maps.LatLng(spot.lat, spot.lng),
        spot.name
      );
      label.setMap(map);
      labelsRef.current.push(label);
    });

    isInitializedRef.current = true;
  }, []);

  // Initialize map like index.html initMap()
  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;

    // Create markers
    createMarkers(map, spots);

    // Initialize Directions Service and Renderer
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeOpacity: 1,
        strokeWeight: 6
      }
    });

    // Request user location to center map
    requestUserLocation(map, spots);

    onMapLoad(map);
  }, [createMarkers, spots, onMapLoad, requestUserLocation]);

  // Update markers only when spots array changes (for filtering)
  useEffect(() => {
    if (mapRef.current && isInitializedRef.current) {
      createMarkers(mapRef.current, spots);
    }
  }, [spots, createMarkers]);

  // Toggle heat map overlay 
  useEffect(() => {
    if (!mapRef.current || !isInitializedRef.current) return;

    if (showHeatMap) {
      // Show heat map overlay 
      createHeatMap(mapRef.current, spots);
    } else {
      // Hide heat map
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
      }
    }
  }, [showHeatMap, spots, createHeatMap]);

  // Calculate directions when user location and selected spot are available
  useEffect(() => {
    if (userLocation && selectedSpot && directionsServiceRef.current && directionsRendererRef.current) {
      const request = {
        origin: userLocation,
        destination: { lat: selectedSpot.lat, lng: selectedSpot.lng },
        travelMode: window.google.maps.TravelMode.DRIVING
      };

      directionsServiceRef.current.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(result);

          const route = result.routes[0].legs[0];
          onDirectionsUpdate({
            duration: route.duration.text,
            distance: route.distance.text,
            destination: selectedSpot.name
          });

          // Fit map to route
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(userLocation);
          bounds.extend({ lat: selectedSpot.lat, lng: selectedSpot.lng });
          mapRef.current.fitBounds(bounds, { padding: 100 });
        }
      });
    }
  }, [userLocation, selectedSpot, onDirectionsUpdate]);

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          ...MAP_OPTIONS,
          gestureHandling: 'greedy'
        }}
        onLoad={handleMapLoad}
      />
    </div>
  );
}

export default MapContainer;
