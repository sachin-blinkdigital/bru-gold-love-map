import React, { useState, useEffect } from 'react';
import { CATEGORY_EMOJIS } from '../config/mapConfig';

function Popup({ spot, isOpen, onClose, onShowDirections }) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!spot) return null;

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleGetDirections = () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setIsGettingLocation(false);
          onShowDirections(spot, location);
        },
        (error) => {
          setIsGettingLocation(false);
          alert('Unable to get your location. Please enable location access.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setIsGettingLocation(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <>
      <div
        className={`popup-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`popup ${isOpen ? 'active' : ''}`}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        <div className="popup-handle" />

        <div className="popup-gallery">
          {spot.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={spot.name}
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800';
              }}
            />
          ))}
        </div>

        <div className="popup-content">
          <div className="popup-tags">
            {(spot.type === 'gold' || spot.type === 'special') && (
              <span className="popup-tag gold">☕ Bru GOLD Spot</span>
            )}
            {spot.categories.map((cat) => (
              <span key={cat} className="popup-tag">
                {CATEGORY_EMOJIS[cat] || '📍'} {capitalizeFirst(cat)}
              </span>
            ))}
          </div>

          <h2 className="popup-name">{spot.name}</h2>
          <p className="popup-subtitle">{spot.subtitle}</p>

          <div className="popup-details">
            <div className="popup-detail">
              <span className="popup-detail-icon">📍</span>
              <span>{spot.distance} away</span>
            </div>
            <div className="popup-detail">
              <span className="popup-detail-icon">🕐</span>
              <span>Open until {spot.openUntil}</span>
            </div>
            <div className="popup-detail">
              <span className="popup-detail-icon">🔥</span>
              <span>{spot.popularity} today</span>
            </div>
          </div>

          <div className="popup-address">
            <strong>Address</strong>
            {spot.address}
          </div>

          <p className="popup-tagline">
            "Looks like a great place for a Coffee Date."
          </p>

          <div className="popup-buttons">
            <a
              href={spot.zomatoLink}
              className="popup-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              ☕ Book a Table on Zomato
            </a>

            <button
              className={`popup-directions-btn ${isGettingLocation ? 'loading' : ''}`}
              onClick={handleGetDirections}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 11l19-9-9 19-2-8-8-2z" />
              </svg>
              <span className="directions-text">
                {isGettingLocation ? 'Getting location' : 'Get Directions'}
              </span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
