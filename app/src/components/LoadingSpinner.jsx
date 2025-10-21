import React from 'react';
import './LoadingSpinner.css';

/**
 * Loading spinner component for async operations
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.message - Loading message
 * @param {string} props.size - Spinner size (small, medium, large)
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ 
  isLoading = false, 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  if (!isLoading) return null;

  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
