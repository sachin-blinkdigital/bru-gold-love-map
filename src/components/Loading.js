import React from 'react';

function Loading({ isVisible }) {
  return (
    <div className={`loading ${!isVisible ? 'hidden' : ''}`}>
      <div className="loading-logo">Bru GOLD</div>
      <div className="loading-subtitle">The Love Map</div>
      <div className="loading-spinner" />
    </div>
  );
}

export default Loading;
