import React, { useState, useRef, useEffect } from 'react';
import coffeeSpots from '../data/coffeeSpots';

function SearchBar({ searchQuery, onSearchChange, resultCount }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Extract unique locations from addresses
  const getLocations = () => {
    const locations = new Set();
    coffeeSpots.forEach(spot => {
      // Extract area from address (e.g., "Bandra West" from full address)
      const addressParts = spot.address.split(',');
      if (addressParts.length > 1) {
        const area = addressParts[1].trim();
        locations.add(area);
      }
    });
    return Array.from(locations);
  };

  // Generate suggestions based on search query
  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const cafeSuggestions = [];
    const locationSuggestions = [];

    // Search cafe names
    coffeeSpots.forEach(spot => {
      if (spot.name.toLowerCase().includes(lowerQuery)) {
        cafeSuggestions.push({
          type: 'cafe',
          text: spot.name,
          subtitle: spot.address.split(',')[1]?.trim() || ''
        });
      }
    });

    // Search locations
    const locations = getLocations();
    locations.forEach(location => {
      if (location.toLowerCase().includes(lowerQuery)) {
        const cafeCount = coffeeSpots.filter(spot =>
          spot.address.toLowerCase().includes(location.toLowerCase())
        ).length;
        locationSuggestions.push({
          type: 'location',
          text: location,
          subtitle: `${cafeCount} ${cafeCount === 1 ? 'cafe' : 'cafes'}`
        });
      }
    });

    setSuggestions([...cafeSuggestions.slice(0, 5), ...locationSuggestions.slice(0, 3)]);
    setShowSuggestions(cafeSuggestions.length > 0 || locationSuggestions.length > 0);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    generateSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion.text);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    onSearchChange('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-bar">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="search-input"
          placeholder="Search by cafe name or location (e.g., Bandra)..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery && generateSuggestions(searchQuery)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${index}`}
              className={`search-suggestion-item ${suggestion.type}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-icon">
                {suggestion.type === 'cafe' ? '☕' : '📍'}
              </div>
              <div className="suggestion-content">
                <div className="suggestion-text">{suggestion.text}</div>
                {suggestion.subtitle && (
                  <div className="suggestion-subtitle">{suggestion.subtitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery && !showSuggestions && (
        <div className="search-results-count">
          {resultCount} {resultCount === 1 ? 'spot' : 'spots'} found
        </div>
      )}
    </div>
  );
}

export default SearchBar;
