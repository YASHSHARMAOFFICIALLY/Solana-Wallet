import React from "react";
import Navbar from "@/components/navbar";
import Mnemonicard from "@/components/mnemonicCard";
import WalletCard from "@/components/Walletcard";
export default function Home(){
  return(
    <div className="min-h-screen">
      <Mnemonicard/>
      <WalletCard/>
      
    </div>
  )
}