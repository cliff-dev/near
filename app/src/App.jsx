import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';


const networkId = 'testnet'; 
const relayerUrl = "YOUR_RELAYER_URL";
const walletUrl = "YOUR_WALLET_URL"; 
const contractId = "YOUR_CONTRACT_ID"; 

// Initialize wallet selector
const selectorPromise = setupWalletSelector({
  network: networkId,
  modules: [
    setupFastAuthWallet({
      relayerUrl: relayerUrl,
      walletUrl: walletUrl,
    }),
  ],
});

function App() {
  const [showViteLogo, setShowViteLogo] = useState(false);

  // Toggle logo visibility
  const toggleLogo = () => {
    setShowViteLogo(!showViteLogo);
  };


  const onClick = () => {
    selectorPromise.then((selector) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet) =>
        fastAuthWallet.signIn({
          contractId: contractId,
          email: "USER_EMAIL",
          isRecovery: false,
      
        }),
      );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <img src={reactLogo} className="React-logo" alt="React logo" style={{ height: '40vmin' }} />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <button onClick={toggleLogo} style={{ fontSize: '16px', padding: '10px', marginTop: '20px' }}>
          Toggle Vite Logo
        </button>
        <button onClick={onClick} style={{ fontSize: '16px', padding: '10px', marginTop: '20px' }}>
          Sign In with NEAR
        </button>
      </header>
      {showViteLogo && (
        <img src={viteLogo} className="Vite-logo" alt="Vite logo" style={{ height: '40vmin', marginTop: '20px' }} />
      )}
    </div>
  );
}

export default App;
