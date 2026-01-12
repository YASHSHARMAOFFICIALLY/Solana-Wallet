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
                   
                     className="flex items-center justify-start gap-2 px-3 py-2 rounded-md 
                     bg-background text-foreground  bg-destructive 
                   bg-zinc-200 dark:bg-zinc-700 text-sm font-medium shadow-sm 
                 h-12 w-full sm:w-auto min-w-[100px] 
                 transition-all duration-300 ease-in-out 
                 hover:bg-zinc-300 dark:hover:bg-zinc-600 cursor-pointer"
                    >
                        <span className="   text-[13px] font-bold tracking-tighter uppercase opacity-50 text-muted-foreground font-mono">
                       
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