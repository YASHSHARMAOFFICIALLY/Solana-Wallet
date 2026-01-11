import Footer from "@/components/footer";
import Mnemonicard from "@/components/mnemonicCard";
import WalletCard from "@/components/Walletcard";


export default function Home(){
    return (
        <div>
            <Mnemonicard/>
            <WalletCard/>
            <Footer/>
        </div>
    )
}