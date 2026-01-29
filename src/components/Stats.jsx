import React from 'react';
import { FaListAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const Stats = ({ stats, onClearCompleted }) => {
  return (
    <div className="stats-container">
      <style jsx>{`
        .stats-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding: 1.5rem;
          background: var(--bg-light);
          border-radius: var(--radius-md);
          margin-top: 2rem;
        }
        
        .stats-grid {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .stat-icon {
          font-size: 1.5rem;
          color: var(--primary);
        }
        
        .stat-text {
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--text-dark);
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .clear-btn {
          background: white;
          color: var(--danger);
          border: 2px solid var(--danger);
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .clear-btn:hover {
          background: var(--danger);
          color: white;
        }
        
        .clear-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .stats-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .stats-grid {
            justify-content: center;
          }
        }
      `}</style>

      <div className="stats-grid">
        <div className="stat-item">
          <FaListAlt className="stat-icon" />
          <div className="stat-text">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Всего задач</span>
          </div>
        </div>
        
        <div className="stat-item">
          <FaClock className="stat-icon" />
          <div className="stat-text">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Активных</span>
          </div>
        </div>
        
        <div className="stat-item">
          <FaCheckCircle className="stat-icon" />
          <div className="stat-text">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Выполнено</span>
          </div>
        </div>
      </div>

      <button
        className="clear-btn"
        onClick={onClearCompleted}
        disabled={stats.completed === 0}
      >
        🗑️ Очистить выполненные
      </button>
    </div>
  );
};

export default Stats;