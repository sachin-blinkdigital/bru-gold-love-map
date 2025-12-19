import { useCallback, useRef, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_OPTIONS,
  PIN_ICONS,
  PIN_SIZES
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
  onDirectionsUpdate
}) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  const isInitializedRef = useRef(false);

  // Keep onMarkerClick ref updated
  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  // Create markers with custom SVG icons
  const createMarkers = useCallback((map, spotsList) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

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

    onMapLoad(map);
  }, [createMarkers, spots, onMapLoad]);

  // Update markers only when spots array changes (for filtering)
  useEffect(() => {
    if (mapRef.current && isInitializedRef.current) {
      createMarkers(mapRef.current, spots);
    }
  }, [spots, createMarkers]);

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
        center={MAP_DEFAULT_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
        options={MAP_OPTIONS}
        onLoad={handleMapLoad}
      />
    </div>
  );
}

export default MapContainer;
