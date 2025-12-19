import React, { useState } from 'react';
import { TRAVEL_MODES } from '../config/mapConfig';

function DirectionsPanel({
  directionsInfo,
  selectedSpot,
  onClearDirections,
  onTravelModeChange
}) {
  const [activeTravelMode, setActiveTravelMode] = useState('DRIVING');

  const handleTravelModeChange = (mode) => {
    setActiveTravelMode(mode);
    onTravelModeChange(mode);
  };

  if (!directionsInfo) return null;

  return (
    <div className={`directions-panel ${directionsInfo ? 'active' : ''}`}>
      <div className="travel-modes">
        {TRAVEL_MODES.map((tm) => (
          <button
            key={tm.mode}
            className={`travel-mode-btn ${activeTravelMode === tm.mode ? 'active' : ''}`}
            onClick={() => handleTravelModeChange(tm.mode)}
            title={tm.label}
          >
            {tm.emoji}
          </button>
        ))}
      </div>

      <div className="directions-info">
        <div className="directions-stat">
          <div className="directions-stat-value">
            {directionsInfo.duration || '--'}
          </div>
          <div className="directions-stat-label">Duration</div>
        </div>
        <div className="directions-stat">
          <div className="directions-stat-value">
            {directionsInfo.distance || '--'}
          </div>
          <div className="directions-stat-label">Distance</div>
        </div>
      </div>

      <div className="directions-destination">
        {directionsInfo.destination || '--'}
      </div>

      <button
        className="directions-close"
        onClick={onClearDirections}
        title="Close directions"
      >
        ×
      </button>
    </div>
  );
}

export default DirectionsPanel;
