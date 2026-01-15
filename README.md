
# Solana HD Wallet Generator

A lightweight, React-based Hierarchical Deterministic (HD) Wallet generator for the Solana blockchain. This tool allows users to generate a single 12-word recovery phrase (Mnemonic) and derive an unlimited number of unique Solana wallets (Public/Private keypairs) from it.




## 🚀 Overview

This project demonstrates the implementation of the BIP-39 and BIP-44 standards on Solana. Instead of managing multiple private keys, users can manage one "Master Seed" and increment the derivation path to create multiple accounts.

### Key Features

•Mnemonic Generation: Securely generate a 12-word seed phrase.

•HD Path Derivation: Uses the standard Solana derivation path m/44'/501'/x'/0'.

•Multiple Account Creation: Add multiple wallets dynamically from a single seed.

•Privacy Focused: No balances are tracked, and no data is stored on a server. Everything happens locally in the browser.
## 🛠️ Technical Stack

•Framework: Next.js / React

•Blockchain: @solana/web3.js

•Cryptography: * bip39: For mnemonic seed phrase generation.

•ed25519-hd-key: For deriving keys from the seed phrase.

•tweetnacl: For cryptographic keypair generation.
## 📖 How It Works

1.The application follows the standard HD Wallet hierarchy:

2Seed Phrase: A 12-word mnemonic is converted into a 512-bit seed.

3.Derivation Path: The app uses the Solana coin type (501').

4.Indexing: To create "Wallet 1," "Wallet 2," etc., the app increments the account index in the path:

    Wallet 1: m/44'/501'/0'/0'

    Wallet 2: m/44'/501'/1'/0'

    Wallet 3: m/44'/501'/2'/0'
## ⚙️ Installation & Setup

1. Clone the repository:

    git clone https://github.com/YASHSHARMAOFFICIALLY/Solana-Wallet.git

    cd Solana-Wallet

2. Install dependencies:

    npm install

     or

     yarn install 

3. Run the development server:

    npm run dev

4.Open the app: Navigate to http://localhost:3000 in your browser.
## ⚠️ Security Note

•This is a developer tool and educational project.

•Never share your 12-word seed phrase with anyone.

•For production use or managing real assets, always prefer hardware wallets or audited wallet software.

•This application does not store your keys; once the page is refreshed, you must re-enter your mnemonic to access the same wallets.
## 🤝 Contributing

Contributions are welcome! If you'd like to improve the UI or add features like mnemonic validation, feel free to fork the repo and submit a pull request.
