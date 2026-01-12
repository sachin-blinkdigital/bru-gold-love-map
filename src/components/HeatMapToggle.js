import { useState, useEffect } from 'react';

function HeatMapToggle({ isActive, onToggle }) {
  const [showText, setShowText] = useState(true);

  // Hide text after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`map-view-toggle ${showText ? 'expanded' : 'collapsed'}`}>
      <button
        className={`map-view-btn ${!isActive ? 'active' : ''}`}
        onClick={() => isActive && onToggle()}
        title="Standard Map"
      >
        <span className="btn-icon">📍</span>
        {showText && <span className="btn-text">Standard</span>}
      </button>
      <button
        className={`map-view-btn ${isActive ? 'active' : ''}`}
        onClick={() => !isActive && onToggle()}
        title="Heat Map"
      >
        <span className="btn-icon">🔥</span>
        {showText && <span className="btn-text">Heat Map</span>}
      </button>
    </div>
  );
}

export default HeatMapToggle;
