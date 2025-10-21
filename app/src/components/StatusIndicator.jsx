import React from 'react';
import './StatusIndicator.css';

/**
 * Status indicator component for wallet connection status
 * Shows visual feedback for different connection states
 */
const StatusIndicator = ({ status, size = 'medium' }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return '🟢';
      case 'connecting':
        return '🟡';
      case 'error':
        return '🔴';
      case 'ready':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Error';
      case 'ready':
        return 'Ready';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className={`status-indicator ${size}`}>
      <span className="status-icon">{getStatusIcon()}</span>
      <span className="status-text">{getStatusText()}</span>
    </div>
  );
};

export default StatusIndicator;
