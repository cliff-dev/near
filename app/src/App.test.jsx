import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the NEAR wallet modules
jest.mock('@near-wallet-selector/core', () => ({
  setupWalletSelector: jest.fn(() => Promise.resolve({
    wallet: jest.fn(() => Promise.resolve({
      signIn: jest.fn(() => Promise.resolve())
    }))
  }))
}));

jest.mock('near-fastauth-wallet', () => ({
  setupFastAuthWallet: jest.fn(() => ({}))
}));

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('NEAR FastAuth Demo')).toBeInTheDocument();
  });

  test('renders the app description', () => {
    render(<App />);
    expect(screen.getByText('Experience seamless blockchain authentication with NEAR Protocol')).toBeInTheDocument();
  });

  test('shows initial status as disconnected', () => {
    render(<App />);
    expect(screen.getByText('Status: disconnected')).toBeInTheDocument();
  });

  test('toggles Vite logo visibility', () => {
    render(<App />);
    
    const toggleButton = screen.getByText('Show Vite Logo');
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    expect(screen.getByText('Hide Vite Logo')).toBeInTheDocument();
    expect(screen.getByText('Powered by Vite - Lightning fast build tool')).toBeInTheDocument();
  });

  test('handles email input correctly', () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    expect(emailInput).toBeInTheDocument();
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('sign in button is disabled when email is empty', () => {
    render(<App />);
    
    const signInButton = screen.getByText('Sign In with NEAR');
    expect(signInButton).toBeDisabled();
  });

  test('sign in button is enabled when email is provided', () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const signInButton = screen.getByText('Sign In with NEAR');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(signInButton).not.toBeDisabled();
  });

  test('shows connecting state during authentication', async () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const signInButton = screen.getByText('Sign In with NEAR');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(signInButton);
    
    expect(screen.getByText('Connecting...')).toBeInTheDocument();
    expect(screen.getByText('Status: connecting')).toBeInTheDocument();
  });

  test('displays error message for invalid email', () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const signInButton = screen.getByText('Sign In with NEAR');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(signInButton);
    
    // The component should show an alert for invalid email
    expect(screen.getByText('Please enter your email address')).toBeInTheDocument();
  });

  test('renders footer with NEAR link', () => {
    render(<App />);
    
    expect(screen.getByText('Built with ❤️ for the NEAR ecosystem')).toBeInTheDocument();
    expect(screen.getByText('Learn more about NEAR')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<App />);
    
    const emailInput = screen.getByLabelText('Email Address:');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');
  });

  test('handles wallet initialization error gracefully', async () => {
    // Mock setupWalletSelector to reject
    const { setupWalletSelector } = require('@near-wallet-selector/core');
    setupWalletSelector.mockRejectedValueOnce(new Error('Wallet initialization failed'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Status: error')).toBeInTheDocument();
    });
  });
});
