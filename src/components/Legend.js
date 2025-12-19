import React from 'react';

function Legend() {
  return (
    <div className="legend">
      <div className="legend-title">Map Legend</div>

      <div className="legend-item">
        <svg className="legend-pin" viewBox="0 0 24 30">
          <path
            d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18c0-6.6-5.4-12-12-12z"
            fill="#C9A227"
          />
          <circle cx="12" cy="11" r="5" fill="#FDF8F0" />
        </svg>
        <span>Bru GOLD Coffee Date Spot</span>
      </div>

      <div className="legend-item">
        <svg className="legend-pin" viewBox="0 0 24 30">
          <path
            d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18c0-6.6-5.4-12-12-12z"
            fill="#FFFFFF"
            stroke="#4A2C2A"
            strokeWidth="2"
          />
          <circle cx="12" cy="11" r="4" fill="#4A2C2A" />
        </svg>
        <span>Other Coffee Spots</span>
      </div>

      <div className="legend-item">
        <svg className="legend-pin" viewBox="0 0 24 30">
          <defs>
            <linearGradient id="goldGradLegend" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#E8D5A3' }} />
              <stop offset="100%" style={{ stopColor: '#C9A227' }} />
            </linearGradient>
          </defs>
          <path
            d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18c0-6.6-5.4-12-12-12z"
            fill="url(#goldGradLegend)"
          />
          <text x="12" y="15" textAnchor="middle" fill="#2C1810" fontSize="10">
            ★
          </text>
        </svg>
        <span>Bru GOLD Kiosk / Pop-up</span>
      </div>
    </div>
  );
}

export default Legend;
