import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="fixed bottom-0 w-full  max-w  mx-auto px-4  py-6 border-t">
      <div className="flex  justify-center ">
        <p className="text-primary tracking-tight">
          Designed and Developed by{" "}
          <Link href={"https://github.com/YASHSHARMAOFFICIALLY"} className="font-bold">
            @Yash
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Footer;