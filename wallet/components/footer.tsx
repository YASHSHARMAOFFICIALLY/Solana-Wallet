import Link from "next/link";
import React from "react";

export default function Footer (){
  return (
    <section className="  w-full     py-6 border-t   ">
      <div className="flex  justify-center container mx-auto ">
        <p className="text-primary tracking-tight">
          Designed and Developed by{" "}
          <Link href={"https://github.com/YASHSHARMAOFFICIALLY"} className="font-bold">
            @Yash
          </Link>
           <span className="hidden md:inline">•</span>
                <Link
                    href="https://github.com/YASHSHARMAOFFICIALLY/Solana-Wallet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-600"
                >
                    ⭐ Star me on GitHub
                </Link>
        </p>
      </div>
    </section>
  );
};

