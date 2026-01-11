import Footer from "@/components/footer";
import Mnemonicard from "@/components/mnemonicCard";
import WalletGenerator from "@/components/wallet";
import WalletCard from "@/components/Walletcard";


export default function Home(){
    return (
        <div>
            <WalletGenerator/>
            <Footer/>
        </div>
    )
}