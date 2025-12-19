import React, { useState, useCallback, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Header from './components/Header';
import MapContainer from './components/MapContainer';
import FilterPills from './components/FilterPills';
import Legend from './components/Legend';
import Popup from './components/Popup';
import DirectionsPanel from './components/DirectionsPanel';
import Loading from './components/Loading';
import { GOOGLE_MAPS_API_KEY } from './config/mapConfig';
import coffeeSpots from './data/coffeeSpots';

const libraries = ['places', 'directions'];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [directionsInfo, setDirectionsInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [map, setMap] = useState(null);

  // Hiding loading screen after 1.5s 
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setCurrentFilter(filter);
  }, []);

  const handleMarkerClick = useCallback((spot) => {
    setSelectedSpot(spot);
    setShowPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handleShowDirections = useCallback((spot, location, renderer) => {
    setUserLocation(location);
    setDirectionsRenderer(renderer);
    setShowPopup(false);
  }, []);

  const handleDirectionsUpdate = useCallback((info) => {
    setDirectionsInfo(info);
  }, []);

  const handleClearDirections = useCallback(() => {
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }
    setDirectionsInfo(null);
    if (map) {
      map.setCenter({ lat: 19.0596, lng: 72.8295 });
      map.setZoom(14);
    }
  }, [directionsRenderer, map]);

  const filteredSpots = coffeeSpots.filter((spot) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'bru-gold') {
      return spot.type === 'gold' || spot.type === 'special';
    }
    return spot.categories.includes(currentFilter);
  });

  return (
    <div className="app">
      <Loading isVisible={isLoading} />

      <Header currentFilter={currentFilter} onFilterChange={handleFilterChange} />

      <div className="map-instruction">
        <span className="instruction-icon">☕</span>
        Tap a pin to see the vibe, photos, and book a table instantly
      </div>

      <DirectionsPanel
        directionsInfo={directionsInfo}
        selectedSpot={selectedSpot}
        onClearDirections={handleClearDirections}
        onTravelModeChange={(mode) => {}}
      />

      <FilterPills currentFilter={currentFilter} onFilterChange={handleFilterChange} />

      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onLoad={() => console.log('Google Maps loaded')}
        onError={() => console.log('Google Maps failed to load')}
      >
        <MapContainer
          spots={filteredSpots}
          onMarkerClick={handleMarkerClick}
          onMapLoad={handleMapLoad}
          selectedSpot={selectedSpot}
          userLocation={userLocation}
          onDirectionsUpdate={handleDirectionsUpdate}
        />
      </LoadScript>

      <Legend />

      <Popup
        spot={selectedSpot}
        isOpen={showPopup}
        onClose={handleClosePopup}
        onShowDirections={handleShowDirections}
        userLocation={userLocation}
      />
    </div>
  );
}

export default App;
