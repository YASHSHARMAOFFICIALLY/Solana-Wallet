"use client"
import nacl from "tweetnacl";
import {
  generateMnemonic as generateMnemonicPhrase,
  mnemonicToSeedSync,
} from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState, useEffect } from "react";


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
             publickey: Buffer.from(keypair.publicKey).toString("hex"),
            privatekey: Buffer.from(keypair.secretKey).toString("hex"),
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
        setwallet([]),
    }

    function deletewallet(id:number){
        const updatedWallets = wallet.filter((w)=>w.id !== id)
        setwallet(updatedWallets)
        localStorage.setItem("wallet",JSON.stringify(updatedWallets))
    }
    return(
        <div>

        </div>
    )
}
export default WalletGenerator