# API Documentation

## NEAR FastAuth Integration API

This document describes the API for integrating NEAR FastAuth wallet functionality into React applications.

## Table of Contents

- [Configuration](#configuration)
- [Wallet Selector](#wallet-selector)
- [Authentication Methods](#authentication-methods)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Configuration

### Environment Variables

```javascript
const NEAR_CONFIG = {
  networkId: 'testnet', // or 'mainnet'
  relayerUrl: process.env.VITE_RELAYER_URL,
  walletUrl: process.env.VITE_WALLET_URL,
  contractId: process.env.VITE_CONTRACT_ID
};
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_RELAYER_URL` | FastAuth relayer endpoint | `https://relayer.near.org` |
| `VITE_WALLET_URL` | NEAR wallet URL | `https://wallet.near.org` |
| `VITE_CONTRACT_ID` | Your contract ID | `your-contract.near` |

## Wallet Selector

### setupWalletSelector()

Initializes the NEAR wallet selector with FastAuth integration.

```javascript
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';

const selector = await setupWalletSelector({
  network: 'testnet',
  modules: [
    setupFastAuthWallet({
      relayerUrl: 'https://relayer.near.org',
      walletUrl: 'https://wallet.near.org',
    }),
  ],
});
```

**Parameters:**
- `network` (string): Network identifier ('testnet' or 'mainnet')
- `modules` (array): Array of wallet modules

**Returns:** Promise<WalletSelector>

## Authentication Methods

### signIn()

Authenticates a user with their email address.

```javascript
const wallet = await selector.wallet('fast-auth-wallet');
await wallet.signIn({
  contractId: 'your-contract.near',
  email: 'user@example.com',
  isRecovery: false
});
```

**Parameters:**
- `contractId` (string): The contract ID for authentication
- `email` (string): User's email address
- `isRecovery` (boolean): Whether this is a recovery sign-in

**Returns:** Promise<void>

### signOut()

Signs out the current user.

```javascript
await wallet.signOut();
```

**Returns:** Promise<void>

### getAccountId()

Gets the current user's account ID.

```javascript
const accountId = await wallet.getAccountId();
```

**Returns:** Promise<string | null>

## Error Handling

### Common Error Types

```javascript
try {
  await wallet.signIn({...});
} catch (error) {
  if (error.message.includes('User rejected')) {
    // User cancelled the sign-in process
  } else if (error.message.includes('Network error')) {
    // Network connectivity issue
  } else if (error.message.includes('Invalid email')) {
    // Email validation failed
  }
}
```

### Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `USER_REJECTED` | User cancelled authentication | Handle gracefully |
| `NETWORK_ERROR` | Network connectivity issue | Retry or show offline message |
| `INVALID_EMAIL` | Email format is invalid | Validate email format |
| `CONTRACT_ERROR` | Contract interaction failed | Check contract ID |

## Examples

### Basic Authentication Flow

```javascript
import React, { useState, useEffect } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';

function AuthComponent() {
  const [selector, setSelector] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const initWallet = async () => {
      try {
        const walletSelector = await setupWalletSelector({
          network: 'testnet',
          modules: [
            setupFastAuthWallet({
              relayerUrl: process.env.VITE_RELAYER_URL,
              walletUrl: process.env.VITE_WALLET_URL,
            }),
          ],
        });
        setSelector(walletSelector);
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    };

    initWallet();
  }, []);

  const handleSignIn = async () => {
    if (!selector || !userEmail) return;

    try {
      const wallet = await selector.wallet('fast-auth-wallet');
      await wallet.signIn({
        contractId: process.env.VITE_CONTRACT_ID,
        email: userEmail,
        isRecovery: false
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = async () => {
    if (!selector) return;

    try {
      const wallet = await selector.wallet('fast-auth-wallet');
      await wallet.signOut();
      setIsConnected(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div>
      {!isConnected ? (
        <div>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      ) : (
        <div>
          <p>Connected as: {userEmail}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}
```

### Advanced Error Handling

```javascript
const handleAuthentication = async (email) => {
  try {
    setIsLoading(true);
    setError(null);

    const wallet = await selector.wallet('fast-auth-wallet');
    await wallet.signIn({
      contractId: process.env.VITE_CONTRACT_ID,
      email: email,
      isRecovery: false
    });

    setIsConnected(true);
    setUserEmail(email);
  } catch (error) {
    let errorMessage = 'Authentication failed';
    
    if (error.message.includes('User rejected')) {
      errorMessage = 'Authentication cancelled by user';
    } else if (error.message.includes('Network error')) {
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.message.includes('Invalid email')) {
      errorMessage = 'Please enter a valid email address';
    }
    
    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
```

## Best Practices

### 1. Environment Configuration

Always use environment variables for sensitive configuration:

```javascript
const config = {
  networkId: import.meta.env.VITE_NEAR_NETWORK || 'testnet',
  relayerUrl: import.meta.env.VITE_RELAYER_URL,
  walletUrl: import.meta.env.VITE_WALLET_URL,
  contractId: import.meta.env.VITE_CONTRACT_ID
};
```

### 2. Error Boundaries

Implement error boundaries to handle authentication failures gracefully:

```javascript
class AuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Auth error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Authentication error occurred.</h1>;
    }

    return this.props.children;
  }
}
```

### 3. Loading States

Always provide feedback during authentication:

```javascript
const [authState, setAuthState] = useState({
  isLoading: false,
  isConnected: false,
  error: null
});
```

### 4. Validation

Validate user input before authentication:

```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSignIn = async () => {
  if (!validateEmail(userEmail)) {
    setError('Please enter a valid email address');
    return;
  }
  
  // Proceed with authentication
};
```

## Troubleshooting

### Common Issues

1. **Wallet not initializing**
   - Check network connectivity
   - Verify environment variables
   - Ensure proper module imports

2. **Authentication failing**
   - Verify contract ID is correct
   - Check relayer URL accessibility
   - Validate email format

3. **Build errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Debug Mode

Enable debug logging for development:

```javascript
const selector = await setupWalletSelector({
  network: 'testnet',
  modules: [
    setupFastAuthWallet({
      relayerUrl: process.env.VITE_RELAYER_URL,
      walletUrl: process.env.VITE_WALLET_URL,
      debug: process.env.NODE_ENV === 'development'
    }),
  ],
});
```
