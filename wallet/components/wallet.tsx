
"use client"
import nacl from "tweetnacl";
import {
  generateMnemonic as generateMnemonicPhrase,
  mnemonicToSeedSync,
} from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState, useEffect } from "react";
import Mnemonicard from "./mnemonicCard";
import { Button } from "./ui/button";
import WalletCard from "./Walletcard";

type Wallet = {
  id: number;
  publicKey: string;
  privateKey: string;
};

const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState<string>(""); 
  const [wallets, setWallets] = useState<Wallet[]>([]); 
  const [nextId, setNextId] = useState<number>(0);
  const [mounted, setMounted] = useState(false); 

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true); // Mark as mounted
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const storedMnemonic = localStorage.getItem("mnemonic");
    const storedWallets = localStorage.getItem("wallets"); // Consistent key: "wallets"

    if (storedMnemonic) {
      setMnemonic(storedMnemonic);
    }

    if (storedWallets) {
      const parsedWallets: Wallet[] = JSON.parse(storedWallets);
      setWallets(parsedWallets);
     
      const maxId = parsedWallets.reduce((max, w) => Math.max(max, w.id), -1);
      setNextId(maxId + 1);
    }
  }, [mounted]);

  if (!mounted) return null; 

  function createWallet() {
    let currentMnemonic = mnemonic;

    if (!currentMnemonic) {
      currentMnemonic = generateMnemonicPhrase();
      setMnemonic(currentMnemonic);
      localStorage.setItem("mnemonic", currentMnemonic);
    }

    // Derive seed and keypair
    const seed = mnemonicToSeedSync(currentMnemonic);
    const derived = derivePath(
      `m/44'/501'/${wallets.length}'/0'`, // Use wallets.length for the derivation index (standard for multiple accounts)
      seed.toString("hex")
    );
    const keypair = nacl.sign.keyPair.fromSeed(derived.key);

    const walletData: Wallet = {
      id: nextId,
      publicKey: Buffer.from(keypair.publicKey).toString("hex"),
      privateKey: Buffer.from(keypair.secretKey).toString("hex"),
    };

    const updatedWallets = [...wallets, walletData];
    setWallets(updatedWallets);
    setNextId(nextId + 1);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets)); 
  }

  function handleClearWallet() {
    localStorage.removeItem("mnemonic");
    localStorage.removeItem("wallets"); 
    setMnemonic("");
    setWallets([]);
    setNextId(0); // Reset nextId
  }

  function deleteWallet(id: number) { 
    const updatedWallets = wallets.filter((w) => w.id !== id);
    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets)); 
  }

  return (
    <div>
      <div>
        {mnemonic && wallets.length > 0 && <Mnemonicard mnemonic={mnemonic} />}
      </div>
      <div className="p-6">
        <div className="flex px-2 h-14 rounded-xl shadow-md bg-background border border-slate-400 justify-between items-center">
          <h1 className="sm:font-bold sm:text-4xl font-bold">Solana Wallet</h1>
          <div className="flex gap-3">
            <Button className="cursor-pointer bg-blue-500" onClick={createWallet}>
              Add Wallet
            </Button>
            <Button onClick={handleClearWallet} className="bg-red-500 cursor-pointer">
              Clear wallet
            </Button>
          </div>
        </div>
        <div className="">
          {wallets.length > 0 ? (
            wallets.map((walletItem) => ( 
              <WalletCard
                key={walletItem.id}
                mnemonic={mnemonic}
                wallet={walletItem}
                deletewallet={deleteWallet}
              />
            ))
          ) : (
            <div className="font-bold p-10">No wallets created</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletGenerator;