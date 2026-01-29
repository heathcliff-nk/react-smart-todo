import React from 'react';

const FilterButtons = ({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    { key: 'all', label: 'Все', count: stats.total },
    { key: 'active', label: 'Активные', count: stats.active },
    { key: 'completed', label: 'Выполненные', count: stats.completed },
  ];

  return (
    <div className="filter-buttons">
      <style jsx>{`
        .filter-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          padding: 10px 20px;
          border: 2px solid var(--bg-gray);
          background: var(--bg-white);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .filter-btn:hover {
          border-color: var(--primary);
        }
        
        .filter-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .count-badge {
          background: var(--bg-gray);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
        
        .filter-btn.active .count-badge {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
          <span className="count-badge">{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;