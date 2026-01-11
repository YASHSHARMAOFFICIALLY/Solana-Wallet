import { Wallet,Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () =>{
    return (
        <div className="p-6 border-b rounded-xl border-slate-200 shadow-sm">
            <div className="px-8  flex  justify-between">
                <Wallet size={40}></Wallet>
                <Link href="https://github.com/YASHSHARMAOFFICIALLY">
                <Button>
                    <Github/>
                    <span className="font-bold text-md">Github</span>
                </Button>
                </Link>
                
            </div>

        </div>
    )
}
export default Navbar