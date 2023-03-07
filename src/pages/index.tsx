import { InputCurrency } from "@/components/inputCurrency";
import { Inter } from "next/font/google";
import Image from "next/image";

import ArrowsExchangeSVG from "../assets/arrows-exchange.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      style={inter.style}
      className="h-screen flex items-center justify-center px-4"
    >
      <main className="px-20 py-16 shadow-lg border max-w-3xl space-y-14">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl text-[#0F172A]">
            Conversor de moedas
          </h3>
          <div className="flex items-center gap-2">
            <InputCurrency name="convert" />
            <Image src={ArrowsExchangeSVG} alt="Arrows" />
            <InputCurrency name="result" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-[#0F172A]">
            Taxa de câmbio
          </h3>
        </div>
      </main>
    </div>
  );
}
