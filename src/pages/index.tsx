import { ApexChart } from "@/components/ApexChart";
import { InputCurrency } from "@/components/inputCurrency";
import { flagsData } from "@/utils/dataFlags";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

import ArrowsExchangeSVG from "../assets/arrows-exchange.svg";

const inter = Inter({ subsets: ["latin"] });

interface flagProps {
  id: string;
  name: string;
  isSelected: boolean;
}

export default function Home() {
  const [flagsConverter, setFlagsConverter] = useState<flagProps[]>([]);
  const [flagsCambio, setFlagsCambio] = useState<flagProps[]>([]);

  function handleInvertFlag() {
    const findFlagConverter = flagsConverter.find((flag) => flag.isSelected);
    const findFlagCambio = flagsCambio.find((flag) => flag.isSelected);

    setFlagsConverter((flags) =>
      flags.map((flag) => ({
        ...flag,
        isSelected: flag.id === findFlagCambio?.id ? true : false,
      }))
    );
    setFlagsCambio((flags) =>
      flags.map((flag) => ({
        ...flag,
        isSelected: flag.id === findFlagConverter?.id ? true : false,
      }))
    );
  }

  function handleChangeFlag(flagObj: flagProps, name: string) {
    if (name === "convert") {
      setFlagsConverter((flags) =>
        flags.map((flag) => ({
          ...flag,
          isSelected: flag.id === flagObj.id ? true : false,
        }))
      );
      return;
    }
    setFlagsCambio((flags) =>
      flags.map((flag) => ({
        ...flag,
        isSelected: flag.id === flagObj.id ? true : false,
      }))
    );
  }

  useEffect(() => {
    setFlagsConverter(flagsData);
    setFlagsCambio(flagsData);
  }, []);

  return (
    <div
      style={inter.style}
      className="h-screen flex items-center justify-center px-4"
    >
      <main className="px-10 py-8 sm:px-20 sm:py-16 shadow-lg border max-w-3xl space-y-14">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl text-[#0F172A]">
            Conversor de moedas
          </h3>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <InputCurrency
              handleSelectedFlag={handleChangeFlag}
              name="convert"
              flagsCambio={flagsConverter}
            />
            <button type="button" onClick={handleInvertFlag}>
              <Image src={ArrowsExchangeSVG} alt="Arrows" />
            </button>
            <InputCurrency
              readOnly
              name="result"
              flagsCambio={flagsCambio}
              handleSelectedFlag={handleChangeFlag}
              disabled
            />
          </div>
        </div>

        <ApexChart />
      </main>
    </div>
  );
}
