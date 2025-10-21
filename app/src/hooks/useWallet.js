import { useState, useEffect, useCallback } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import { logWalletOperation } from '../utils/walletUtils';

/**
 * Custom hook for wallet management
 * Provides wallet state and operations with proper error handling
 */
export const useWallet = () => {
  const [walletSelector, setWalletSelector] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountId, setAccountId] = useState(null);

  // Initialize wallet selector
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const selector = await setupWalletSelector({
          network: 'testnet',
          modules: [
            setupFastAuthWallet({
              relayerUrl: import.meta.env.VITE_RELAYER_URL || "YOUR_RELAYER_URL",
              walletUrl: import.meta.env.VITE_WALLET_URL || "YOUR_WALLET_URL",
            }),
          ],
        });

        setWalletSelector(selector);
        logWalletOperation('walletInitialized', { success: true });
      } catch (err) {
        console.error('Failed to initialize wallet:', err);
        setError('Failed to initialize wallet');
        logWalletOperation('walletInitialized', { success: false, error: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    initializeWallet();
  }, []);

  // Sign in function
  const signIn = useCallback(async (email, contractId) => {
    if (!walletSelector) {
      throw new Error('Wallet not initialized');
    }

    try {
      setIsLoading(true);
      setError(null);
      logWalletOperation('signInAttempt', { email });

      const wallet = await walletSelector.wallet('fast-auth-wallet');
      await wallet.signIn({
        contractId,
        email,
        isRecovery: false,
      });

      setIsConnected(true);
      setAccountId(email); // In a real app, you'd get the actual account ID
      logWalletOperation('signInSuccess', { email });
    } catch (err) {
      console.error('Sign in failed:', err);
      setError(err.message);
      logWalletOperation('signInFailed', { email, error: err.message });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [walletSelector]);

  // Sign out function
  const signOut = useCallback(async () => {
    if (!walletSelector) return;

    try {
      setIsLoading(true);
      setError(null);
      logWalletOperation('signOutAttempt');

      const wallet = await walletSelector.wallet('fast-auth-wallet');
      await wallet.signOut();

      setIsConnected(false);
      setAccountId(null);
      logWalletOperation('signOutSuccess');
    } catch (err) {
      console.error('Sign out failed:', err);
      setError(err.message);
      logWalletOperation('signOutFailed', { error: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [walletSelector]);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    walletSelector,
    isConnected,
    isLoading,
    error,
    accountId,
    signIn,
    signOut,
    clearError,
  };
};
