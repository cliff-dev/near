/**
 * Utility functions for NEAR wallet operations
 * Provides helper functions for wallet management and error handling
 */

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formats error messages for user display
 * @param {Error} error - Error object
 * @returns {string} - User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (error.message.includes('User rejected')) {
    return 'Authentication cancelled by user';
  }
  if (error.message.includes('Network error')) {
    return 'Network error. Please check your connection.';
  }
  if (error.message.includes('Invalid email')) {
    return 'Please enter a valid email address';
  }
  if (error.message.includes('Contract error')) {
    return 'Contract interaction failed. Please try again.';
  }
  return 'Authentication failed. Please try again.';
};

/**
 * Gets connection status color
 * @param {string} status - Connection status
 * @returns {string} - Color code for status badge
 */
export const getStatusColor = (status) => {
  const statusColors = {
    connected: '#4CAF50',
    connecting: '#FF9800',
    error: '#F44336',
    ready: '#2196F3',
    disconnected: '#9E9E9E'
  };
  return statusColors[status] || '#9E9E9E';
};

/**
 * Sanitizes user input
 * @param {string} input - User input string
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  return input.trim().toLowerCase();
};

/**
 * Checks if wallet is available
 * @param {Object} walletSelector - Wallet selector instance
 * @returns {boolean} - True if wallet is available
 */
export const isWalletAvailable = (walletSelector) => {
  return walletSelector && typeof walletSelector.wallet === 'function';
};

/**
 * Logs wallet operations for debugging
 * @param {string} operation - Operation name
 * @param {Object} data - Operation data
 */
export const logWalletOperation = (operation, data = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Wallet ${operation}]:`, data);
  }
};
