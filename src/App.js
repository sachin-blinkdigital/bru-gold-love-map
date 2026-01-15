import React, { useState, useCallback, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Header from './components/Header';
import MapContainer from './components/MapContainer';
import FilterPills from './components/FilterPills';
import Legend from './components/Legend';
import Popup from './components/Popup';
import DirectionsPanel from './components/DirectionsPanel';
import Loading from './components/Loading';
import HeatMapToggle from './components/HeatMapToggle';
import SearchBar from './components/SearchBar';
import { GOOGLE_MAPS_API_KEY } from './config/mapConfig';
import coffeeSpots from './data/coffeeSpots';

const libraries = ['places', 'directions', 'visualization'];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [directionsInfo, setDirectionsInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [map, setMap] = useState(null);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleToggleHeatMap = useCallback(() => {
    setShowHeatMap(prev => !prev);
  }, []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const filteredSpots = coffeeSpots.filter((spot) => {
    // Filter by category
    let matchesFilter = true;
    if (currentFilter === 'all') {
      matchesFilter = true;
    } else if (currentFilter === 'bru-gold') {
      matchesFilter = spot.type === 'gold' || spot.type === 'special';
    } else {
      matchesFilter = spot.categories.includes(currentFilter);
    }

    // Filter by search query
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        spot.name.toLowerCase().includes(query) ||
        spot.address.toLowerCase().includes(query) ||
        spot.subtitle.toLowerCase().includes(query);
    }

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <Loading isVisible={isLoading} />

      <Header currentFilter={currentFilter} onFilterChange={handleFilterChange} />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        resultCount={filteredSpots.length}
      />

      {/* <div className="map-instruction">
        <span className="instruction-icon">☕</span>
        Tap a pin to see the vibe, photos, and book a table instantly
      </div> */}

      <DirectionsPanel
        directionsInfo={directionsInfo}
        selectedSpot={selectedSpot}
        onClearDirections={handleClearDirections}
        onTravelModeChange={(mode) => { }}
      />

      {/* <FilterPills currentFilter={currentFilter} onFilterChange={handleFilterChange} /> */}

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
          showHeatMap={showHeatMap}
        />
      </LoadScript>

      <Legend />

      <HeatMapToggle isActive={showHeatMap} onToggle={handleToggleHeatMap} />

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
