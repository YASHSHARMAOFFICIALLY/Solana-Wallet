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
                <h2 className="text-slate-600 pb-5">Save these words in a safe place do not share</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-xl">
                {words.map((word,index)=>{
                    return(
                    <h1
                    key = {index}
                     className="bg-foreground/5 hover:bg-slate-300 p-3 w-40 text-center rounded-xl"
                    >
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