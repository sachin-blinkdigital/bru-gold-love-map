import React from 'react';
import { FILTER_CATEGORIES } from '../config/mapConfig';

function FilterPills({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-pills">
      {FILTER_CATEGORIES.map((category) => (
        <div
          key={category.value}
          className={`filter-pill ${currentFilter === category.value ? 'active' : ''}`}
          onClick={() => onFilterChange(category.value)}
        >
          {category.emoji} {category.value === 'all' ? 'All' : category.label}
        </div>
      ))}
    </div>
  );
}

export default FilterPills;
