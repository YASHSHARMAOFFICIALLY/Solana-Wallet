import Footer from "@/components/footer";
import Mnemonicard from "@/components/mnemonicCard";
import WalletGenerator from "@/components/wallet";
import WalletCard from "@/components/Walletcard";
import {ThemeProvider} from "@/components/theme-provider";


export default function Home(){
    return (
        <div>
            <ThemeProvider attribute="class" defaultTheme="light">
            <WalletGenerator/>
             
            <Footer/>
            </ThemeProvider>
        </div>
    )
}