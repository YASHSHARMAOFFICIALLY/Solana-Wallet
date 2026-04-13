"use client"
import { Wallet,Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Moon,Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState,useEffect } from "react";

const Navbar = () =>{
    const {theme,setTheme}=useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const isDark = theme === "dark"
    return (
        <div className="sticky z-50 top-0   backdrop-blur p-6 border-b rounded-xl  shadow-sm text-foreground border-border">
            <div className="px-8  flex  justify-between">
                
                <div className="flex  items-center gap-4  text-foreground">
                    <Wallet size={40} className="cursor-pointer "></Wallet>
                    <div className="font-bold text-2xl">HD wallet</div>
                </div>
               
                <div className="flex justify-between items-center gap-7">
                     <Link href="https://github.com/YASHSHARMAOFFICIALLY">
                     <Button className="cursor-pointer bg-red-500">
                    <Github/>
                    <span className="font-bold text-md ">Github</span>
                        </Button>
                    </Link>
                    <div onClick={()=>setTheme(isDark?"light":"dark")}
                        className={`flex items-center cursor-pointer transition-transform duration-500
                        ${isDark? "rotate-180" :"rotate-0"}
                        `}
                        >
                        {isDark? (<Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>):
                        (
                            <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all"/>
                        )}
                    </div>
                </div>
                
                
            </div>

        </div>
    )
}
export default Navbar

