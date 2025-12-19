import React from 'react';
import { FILTER_CATEGORIES } from '../config/mapConfig';

function Header({ currentFilter, onFilterChange }) {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">☕</div>
        <div className="logo-text-container">
          <div className="logo-text">Bru GOLD</div>
          <div className="logo-subtitle">The Love Map</div>
        </div>
      </div>

      <div className="filter-container">
        <select
          className="filter-dropdown"
          value={currentFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          {FILTER_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.emoji} {category.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
