import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import './App.css';

// Configuration constants
const NEAR_CONFIG = {
  networkId: 'testnet',
  relayerUrl: import.meta.env.VITE_RELAYER_URL || "YOUR_RELAYER_URL",
  walletUrl: import.meta.env.VITE_WALLET_URL || "YOUR_WALLET_URL",
  contractId: import.meta.env.VITE_CONTRACT_ID || "YOUR_CONTRACT_ID"
};

/**
 * Main application component for NEAR FastAuth integration
 * Demonstrates blockchain authentication using NEAR Protocol
 */
function App() {
  // State management
  const [showViteLogo, setShowViteLogo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [userEmail, setUserEmail] = useState('');
  const [walletSelector, setWalletSelector] = useState(null);

  /**
   * Initialize wallet selector on component mount
   */
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const selector = await setupWalletSelector({
          network: NEAR_CONFIG.networkId,
          modules: [
            setupFastAuthWallet({
              relayerUrl: NEAR_CONFIG.relayerUrl,
              walletUrl: NEAR_CONFIG.walletUrl,
            }),
          ],
        });
        setWalletSelector(selector);
        setConnectionStatus('ready');
      } catch (error) {
        console.error('Failed to initialize wallet selector:', error);
        setConnectionStatus('error');
      }
    };

    initializeWallet();
  }, []);

  /**
   * Toggle Vite logo visibility
   */
  const handleToggleLogo = () => {
    setShowViteLogo(prevState => !prevState);
  };

  /**
   * Handle NEAR wallet authentication
   */
  const handleNearSignIn = async () => {
    if (!walletSelector) {
      console.error('Wallet selector not initialized');
      return;
    }

    if (!userEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    setIsConnecting(true);
    setConnectionStatus('connecting');

    try {
      const fastAuthWallet = await walletSelector.wallet('fast-auth-wallet');
      
      await fastAuthWallet.signIn({
        contractId: NEAR_CONFIG.contractId,
        email: userEmail.trim(),
        isRecovery: false,
      });

      setConnectionStatus('connected');
      console.log('Successfully signed in with NEAR FastAuth');
    } catch (error) {
      console.error('Authentication failed:', error);
      setConnectionStatus('error');
      alert('Authentication failed. Please check your credentials and try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  /**
   * Handle email input change
   */
  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  /**
   * Get status badge color based on connection status
   */
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4CAF50';
      case 'connecting': return '#FF9800';
      case 'error': return '#F44336';
      case 'ready': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <img 
            src={reactLogo} 
            className="react-logo" 
            alt="React logo" 
          />
          <h1>NEAR FastAuth Demo</h1>
          <p className="app-description">
            Experience seamless blockchain authentication with NEAR Protocol
          </p>
        </div>

        <div className="status-section">
          <div 
            className="status-badge"
            style={{ backgroundColor: getStatusColor() }}
          >
            Status: {connectionStatus}
          </div>
        </div>

        <div className="controls-section">
          <button 
            onClick={handleToggleLogo}
            className="control-button secondary"
            disabled={isConnecting}
          >
            {showViteLogo ? 'Hide' : 'Show'} Vite Logo
          </button>
        </div>

        <div className="auth-section">
          <div className="email-input-group">
            <label htmlFor="userEmail" className="email-label">
              Email Address:
            </label>
            <input
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="email-input"
              disabled={isConnecting}
            />
          </div>
          
          <button 
            onClick={handleNearSignIn}
            className="control-button primary"
            disabled={isConnecting || !userEmail.trim() || connectionStatus === 'connected'}
          >
            {isConnecting ? 'Connecting...' : 'Sign In with NEAR'}
          </button>
        </div>
      </header>

      {showViteLogo && (
        <div className="vite-logo-section">
          <img 
            src={viteLogo} 
            className="vite-logo" 
            alt="Vite logo" 
          />
          <p className="vite-description">
            Powered by Vite - Lightning fast build tool
          </p>
        </div>
      )}

      <footer className="app-footer">
        <p>
          Built with ❤️ for the NEAR ecosystem | 
          <a href="https://near.org" target="_blank" rel="noopener noreferrer">
            Learn more about NEAR
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
