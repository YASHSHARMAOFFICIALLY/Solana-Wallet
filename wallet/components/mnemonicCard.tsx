"use client"
import { Copy, Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner"

const Mnemonicard = ({ mnemonic }: { mnemonic: string }) => {
    const [isrevaled, setisreavled] = useState(false)
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        if (mnemonic) {
            setWords(mnemonic.split(" "));
        }
    }, [mnemonic]);

    const handleCopy = () => {
        navigator.clipboard.writeText(words.join(" "))
            .then(() => {
                toast.success("Copied to clipboard");
            })
    }

    return (
        
    <div className="w-full p-10 flex flex-col justify-center">
        <div>
            <h1 className="sm:text-4xl text-xl font-bold -mt-10">Secret Recovery Phrase</h1>
            <h2 className="text-destructive pb-5">Make sure no one is watching you 👀</h2>
        </div>

        <div
            className="relative group cursor-pointer overflow-hidden rounded-xl border border-transparent hover:border-border transition-all"
            onClick={() => setisreavled(!isrevaled)}
        >
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 transition-all duration-500 ${!isrevaled ? "blur-xl select-none scale-[0.98]" : "blur-0 scale-100"}`}>
                {words.map((word, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-start gap-2 px-3 py-2 rounded-md 
                         bg-muted text-foreground text-sm font-medium shadow-sm 
                         h-12 w-full transition-all duration-300"
                    >
                        <span className="text-[13px] font-bold opacity-50 text-muted-foreground font-mono">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        {word}
                    </div>
                ))}
            </div>

            {!isrevaled && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center bg-background p-4 rounded-xl border border-border shadow-2xl">
                        <Eye className="w-6 h-6 mb-2 text-primary" />
                        <p className="font-semibold text-sm">Click to reveal Phrase</p>
                    </div>
                </div>
            )}
        </div>

        {mnemonic !== "" && (
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                    className="flex gap-2 items-center cursor-pointer hover:text-primary transition-colors text-muted-foreground"
                >
                    <Copy size={18} />
                    <span className="text-sm font-medium">Copy to clipboard</span>
                </button>

                <button
                    onClick={() => setisreavled(!isrevaled)}
                    className="text-sm flex items-center gap-2 opacity-70 hover:opacity-100"
                >
                    {isrevaled ? <EyeOff size={16} /> : <Eye size={16} />}
                    {isrevaled ? "Hide" : "Show"} Phrase
                </button>
            </div>
        )}
    </div>
)
    
}

export default Mnemonicard;