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
    id:number,
    publicKey:string,
    privateKey:string,
}


const WalletGenerator = ()=>{
    const[mnemonic,setmnmonic]=useState<string>("")
    const[wallet,setwallet]=useState<Wallet[]>([])
    const[nextId,setnextId]=useState<number>(0)

    function createWallet(){
        if(!mnemonic){
            const mnemonicphrase = generateMnemonicPhrase()
            setmnmonic(mnemonicphrase)
            localStorage.setItem("mnemonic",mnemonicphrase)
        }

        const seed = mnemonicToSeedSync(mnemonic!)
        const derived = derivePath(
            `m/44'/501'/0'/${nextId}'`,
            seed.toString("hex")
        );
        const keypair = nacl.sign.keyPair.fromSeed(derived.key);
        const walletData = {
             id: nextId,
             publicKey: Buffer.from(keypair.publicKey).toString("hex"),
            privateKey: Buffer.from(keypair.secretKey).toString("hex"),
         };
        const updatedWallets = [...wallet, walletData];
        setwallet(updatedWallets);
        setnextId(nextId + 1); 
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    }
    function handleclearwallet(){
        localStorage.removeItem("mnemonic")
        localStorage.removeItem("wallet")
        setmnmonic(""),
        setwallet([])
    }

    function deletewallet(id:number){
        const updatedWallets = wallet.filter((w)=>w.id !== id)
        setwallet(updatedWallets)
        localStorage.setItem("wallet",JSON.stringify(updatedWallets))
    }
    return(
        <div>
            <div>
                {mnemonic && wallet.length>0 && <Mnemonicard mnemonic= {mnemonic}></Mnemonicard>}
            </div>
            <div className="p-6">
                <div className="flex px-2 h-14 rounded-xl shadow-md bg-slate-50 border border-slate-400 justify-between items-center">
                <h1 className="sm:font-bold sm:text-4xl font-bold">Solana Wallet</h1>
                <div className="flex gap-3">
                    <Button className="cursor-pointer" onClick={createWallet}>Add Wallet</Button>
                    <Button onClick={handleclearwallet} className="bg-red-500 cursor-pointer">Clear wallet</Button>
                    </div>
                </div>
            <div className="">
          {wallet.length > 0 ? (
            wallet.map((wallet) => (
              <WalletCard
                key={wallet.id} // Use wallet.id as key for better performance
                mnemonic={mnemonic!}
                wallet={wallet}
                deletewallet={deletewallet} // Pass deleteWallet function to WalletCard
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
          
export default WalletGenerator