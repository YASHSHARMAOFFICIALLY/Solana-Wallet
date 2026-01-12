// "use client"
// import nacl from "tweetnacl";
// import {
//   generateMnemonic as generateMnemonicPhrase,
//   mnemonicToSeedSync,
// } from "bip39";
// import { derivePath } from "ed25519-hd-key";
// import { useState, useEffect } from "react";
// import Mnemonicard from "./mnemonicCard";
// import { Button } from "./ui/button";
// import WalletCard from "./Walletcard";


// type Wallet = {
//     id:number,
//     publicKey:string,
//     privateKey:string,
// }


// const WalletGenerator = ()=>{
//     const[mnemonic,setmnmonic]=useState<string>("")
//     const[wallet,setwallet]=useState<Wallet[]>([])
//     const[nextId,setnextId]=useState<number>(0)

//     function createWallet(){
//         if(!mnemonic){
//             const mnemonicphrase = generateMnemonicPhrase()
//             setmnmonic(mnemonicphrase)
//             localStorage.setItem("mnemonic",mnemonicphrase)
//         }

//         const seed = mnemonicToSeedSync(mnemonic!)
//         const derived = derivePath(
//             `m/44'/501'/0'/${nextId}'`,
//             seed.toString("hex")
//         );
//         const keypair = nacl.sign.keyPair.fromSeed(derived.key);
//         const walletData = {
//              id: nextId,
//              publicKey: Buffer.from(keypair.publicKey).toString("hex"),
//             privateKey: Buffer.from(keypair.secretKey).toString("hex"),
//          };
//         const updatedWallets = [...wallet, walletData];
//         setwallet(updatedWallets);
//         setnextId(nextId + 1); 
//         localStorage.setItem("wallets", JSON.stringify(updatedWallets));
//         // Inside your WalletGenerator component
//         }


//     function handleclearwallet(){
//         localStorage.removeItem("mnemonic")
//         localStorage.removeItem("wallet")
//         setmnmonic(""),
//         setwallet([])
//     }

//     function deletewallet(id:number){
//         const updatedWallets = wallet.filter((w)=>w.id !== id)
//         setwallet(updatedWallets)
//         localStorage.setItem("wallet",JSON.stringify(updatedWallets))
//     }
//     return(
//         <div >
//             <div>
//                 {mnemonic && wallet.length>0 && <Mnemonicard mnemonic= {mnemonic} ></Mnemonicard>}
//             </div>
//             <div className="p-6">
//                 <div className="flex px-2 h-14 rounded-xl shadow-md bg-background border border-slate-400 justify-between items-center">
//                 <h1 className="sm:font-bold sm:text-4xl font-bold">Solana Wallet</h1>
//                 <div className="flex gap-3">
//                     <Button className="cursor-pointer bg-blue-500" onClick={createWallet}>Add Wallet</Button>
//                     <Button onClick={handleclearwallet} className="bg-red-500 cursor-pointer">Clear wallet</Button>
//                     </div>
//                 </div>
//             <div className="">
//           {wallet.length > 0 ? (
//             wallet.map((wallet) => (
//               <WalletCard
//                 key={wallet.id} // Use wallet.id as key for better performance
//                 mnemonic={mnemonic!}
//                 wallet={wallet}
//                 deletewallet={deletewallet} // Pass deleteWallet function to WalletCard
//               />
//             ))
//           ) : (
//             <div className="font-bold p-10">No wallets created</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
          
// export default WalletGenerator

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
  const [mnemonic, setMnemonic] = useState<string>(""); // Fixed typo: setmnmonic -> setMnemonic
  const [wallets, setWallets] = useState<Wallet[]>([]); // Fixed variable name: wallet -> wallets for consistency
  const [nextId, setNextId] = useState<number>(0);
  const [mounted, setMounted] = useState(false); // Added for hydration safety

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
      // Set nextId to max id + 1 to avoid duplicates
      const maxId = parsedWallets.reduce((max, w) => Math.max(max, w.id), -1);
      setNextId(maxId + 1);
    }
  }, [mounted]);

  if (!mounted) return null; // Prevent hydration flicker/mismatch

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
    localStorage.setItem("wallets", JSON.stringify(updatedWallets)); // Consistent key
  }

  function handleClearWallet() { // Renamed for clarity: handleclearwallet -> handleClearWallet
    localStorage.removeItem("mnemonic");
    localStorage.removeItem("wallets"); // Fixed key: "wallet" -> "wallets"
    setMnemonic("");
    setWallets([]);
    setNextId(0); // Reset nextId
  }

  function deleteWallet(id: number) { // Renamed for clarity: deletewallet -> deleteWallet
    const updatedWallets = wallets.filter((w) => w.id !== id);
    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets)); // Fixed key: "wallet" -> "wallets"
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
            wallets.map((walletItem) => ( // Renamed variable: wallet -> walletItem to avoid shadowing
              <WalletCard
                key={walletItem.id}
                mnemonic={mnemonic}
                wallet={walletItem}
                deletewallet={deleteWallet} // Pass deleteWallet (note: prop name is deletewallet, but function is deleteWallet—consider renaming prop for consistency)
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