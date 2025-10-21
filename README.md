# NEAR FastAuth Integration

A React application demonstrating seamless blockchain authentication using NEAR Protocol's FastAuth wallet integration. This project showcases how to bridge traditional web authentication with blockchain technology, making decentralized applications more accessible to everyday users.

## 🚀 Features

- **FastAuth Integration**: Seamless authentication using NEAR's FastAuth wallet
- **React Frontend**: Modern React application with Vite build system
- **Blockchain Authentication**: Connect to NEAR testnet with email-based authentication
- **Wallet Selector**: Flexible wallet selection for different user preferences
- **Responsive Design**: Clean, modern UI with React and Vite logos

## 🛠️ Technologies Used

- **Frontend**: React 18, Vite
- **Blockchain**: NEAR Protocol, FastAuth
- **Authentication**: Firebase (configured)
- **Build Tool**: Vite with SWC for fast compilation
- **Linting**: ESLint with React plugins

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- NEAR testnet account
- Firebase project (for authentication)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/near-fastauth-demo.git
cd near-fastauth-demo
```

### 2. Install Dependencies

```bash
cd app
npm install
```

### 3. Environment Setup

Create a `.env` file in the `app` directory:

```env
VITE_NEAR_NETWORK=testnet
VITE_RELAYER_URL=your_relayer_url
VITE_WALLET_URL=your_wallet_url
VITE_CONTRACT_ID=your_contract_id
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
near-fastauth-demo/
├── app/                          # React application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── auth/                # Authentication logic
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx              # Main application component
│   ├── public/                  # Static assets
│   ├── package.json            # Dependencies and scripts
│   └── vite.config.js          # Vite configuration
├── docs/                        # Documentation
├── tests/                       # Test files
└── README.md                    # This file
```

## 🔧 Configuration

### NEAR Protocol Setup

1. Create a NEAR testnet account at [NEAR Wallet](https://wallet.testnet.near.org)
2. Get your contract ID and configure the relayer URL
3. Update the environment variables in `.env`

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and configure email/password providers
3. Add your Firebase configuration to the environment variables

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## 📚 API Documentation

### FastAuth Integration

```javascript
// Initialize wallet selector
const selector = await setupWalletSelector({
  network: 'testnet',
  modules: [setupFastAuthWallet({
    relayerUrl: process.env.VITE_RELAYER_URL,
    walletUrl: process.env.VITE_WALLET_URL,
  })]
});

// Sign in with email
const wallet = await selector.wallet('fast-auth-wallet');
await wallet.signIn({
  contractId: process.env.VITE_CONTRACT_ID,
  email: userEmail,
  isRecovery: false
});
```

## 🔒 Security Considerations

- Never commit sensitive keys to version control
- Use environment variables for all configuration
- Implement proper error handling for authentication failures
- Validate user inputs before processing

## 📈 Performance

- Vite for fast development and building
- SWC for ultra-fast compilation
- Code splitting for optimal bundle size
- Lazy loading for better initial load times

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Check your network configuration
   - Verify relayer URL is correct
   - Ensure contract ID is valid

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

3. **Authentication Issues**
   - Verify Firebase configuration
   - Check email provider settings
   - Ensure proper CORS configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NEAR Protocol](https://near.org) for the blockchain infrastructure
- [FastAuth](https://fastauth.org) for seamless authentication
- [React](https://reactjs.org) and [Vite](https://vitejs.dev) for the development framework

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**Made with ❤️ for the NEAR ecosystem**