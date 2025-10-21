import '@testing-library/jest-dom'

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_RELAYER_URL: 'https://test-relayer.near.org',
    VITE_WALLET_URL: 'https://test-wallet.near.org',
    VITE_CONTRACT_ID: 'test-contract.near'
  }
})

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}
