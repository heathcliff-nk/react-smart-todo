import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' ? '✅' : 
           type === 'error' ? '❌' : 
           type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span className="notification-message">{message}</span>
        <button onClick={onClose} className="notification-close">×</button>
      </div>
    </div>
  );
};

export default Notification;