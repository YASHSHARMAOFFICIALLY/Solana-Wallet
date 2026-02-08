"use client"
import { useState } from "react";
import Footer from "@/components/footer";
import Mnemonicard from "@/components/mnemonicCard";
import WalletGenerator from "@/components/wallet";
import WalletCard from "@/components/Walletcard";
import {ThemeProvider} from "@/components/theme-provider";
import { Button } from "@/components/ui/button";


export default function Home(){
    const [selectedchain,setselectedchain] = useState<string|null>(null)
    return (
        <div className="flex flex-col grow container mx-auto px-4">
            {!selectedchain && (
                <>
                <div className="mt-20 ml-13">
                    <h1 className="text-5xl font-bold">Kosh Supports Multiple Blockchain</h1>
                    <p className="text-2xl text-gray-500 mt-1">Choose a Blockchain to Get Started</p>
                </div>
                <div className="flex ml-13 mt-3 gap-4">
                    <Button onClick={()=>setselectedchain("Solana")}
                    className="text-3xl  bg-black text-white cursor-pointer">Solana</Button>
                    <Button onClick={()=>setselectedchain("Etherum")}
                    className="text-3xl  bg-black text-white cursor-pointer">Etherum</Button>
                </div>
                </>
            )}
               {selectedchain === "Solana" && (
                    <div className="mt-1 p-10">
                        <Button variant="ghost" onClick={() => setselectedchain(null)}>← Go Back</Button>
                        <WalletGenerator />
                    </div>
                )}
           
            
        </div>
    )
}