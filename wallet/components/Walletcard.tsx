"use client";

import { Eye, EyeOff, Trash } from "lucide-react";
import { useState } from "react";

type Wallet ={
    id:number,
    publickey:string,
    privatekey:string
}
const WalletCard = ({
    wallet,
    deletewallet,
}:{
    wallet:Wallet,
    deletewallet:(id:number)=>void
})=>{
    const [showPrivateKey, setShowPrivateKey] = useState(false);

  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey((prev) => !prev);
  };
    return(
        <div className="flex">
            <div className="mt-2 p-5 shadow-2xl rounded-xl mx-2 w-full bg-slate-200 ">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                         <h1 className="font-bold text-lg md:text-xl">Wallet</h1>
                                   <div className="pr-2">
                        <Trash onClick={() => deletewallet(wallet.id)} color="red" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default WalletCard