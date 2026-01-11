import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className=" bottom-0 w-full  max-w  mx-auto px-4  py-6 border-t">
      <div className="flex  justify-center ">
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

export default Footer;