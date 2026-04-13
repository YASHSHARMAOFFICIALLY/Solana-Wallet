"use client"
import { useState } from "react";
import Navbar from "@/components/navbar";

import WalletGenerator from "@/components/wallet";

import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";


export default function Home(){
    const [selectedchain,setselectedchain] = useState<string|null>(null)
    return (
     <div className="min-h-screen w-full relative">
  {/* Mystic Purple Orb Gradient */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: `radial-gradient(circle at 50% 30%, #E9D5FF 0%, #C4B5FD 25%, #A78BFA 50%, #7C3AED 75%, #5B21B6 100%)`,
    }}
  />
<div className="relative z-50">
    <Navbar/>
    <WalletGenerator/>
    <Footer/>
</div>
</div>

  
    )
}

