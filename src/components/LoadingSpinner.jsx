import React from 'react';
import '../styles/components.css';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'spinner-small';
      case 'large':
        return 'spinner-large';
      default:
        return 'spinner-medium';
    }
  };

  return (
    <div className="loading-spinner">
      <div className={`spinner ${getSizeClass()}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
