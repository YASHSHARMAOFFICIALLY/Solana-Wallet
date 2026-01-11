"use client"
import { Copy } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner"

const Mnemonicard = ({ mnemonic }: { mnemonic: string })=>{
   
     const [words, setWords] = useState<string[]>([]);
      useEffect(() => {
        if (mnemonic) {
            const mnemonicWords = mnemonic.split(" ");
            setWords(mnemonicWords);
        }
    }, [mnemonic]);

    const handleCopy = () =>{
        const memonicstring = words.join(" ")
        navigator.clipboard
            .writeText(memonicstring)
            .then(()=>{
                toast("Copied to clipboard",{
                    description: "Mnemonic words copied to clipboard",
                })
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    }
    return(
        <div className="w-full p-10  flex flex-col justify-center">
            <div>
                <h1 className="sm:text-4xl text-xl font-bold"> Secret Recovery Phrase</h1>
                <h2 className="text-red-700 pb-5">Make sure no one is watching you 👀</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-xl">
                {words.map((word,index)=>{
                    return(
                    <h1
                    key = {index}
                   
                     className="relative flex items-center justify-center bg-foreground/5 hover:bg-slate-300 p-8 h-24 text-center rounded-xl"
                    >
                        <span className="absolute top-10  left-30 text-[13px] font-bold tracking-tighter uppercase opacity-50 text-muted-foreground font-mono">
                       
                        {String(index + 1).padStart(2, '0')}
                            </span>
                        {word}
                    </h1>
                    )
                })}

            </div>
            {mnemonic !== "" ? (
                <div onClick={handleCopy} className="flex gap-5 p-5 cursor-pointer">
                    <Copy className="hover:transition-all" />
                    <span>Click to Copy</span>
                </div>
            ) : null}
        </div>
    )
}
export default Mnemonicard