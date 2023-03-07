import { formatCurrency } from "@/utils/formatCurrency";
import { FormEvent, useMemo, useState } from "react";

interface InputCurrencyProps {
  name: string;
  //   currency: "R$" | "$";
}

export function InputCurrency({ name }: InputCurrencyProps) {
  const [typeCurrency, setTypeCurrency] = useState("USD");
  const [valor, setValor] = useState("");

  const { currencyFormat } = useMemo(() => {
    const curr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: typeCurrency,
    }).format(0);
    const currencyFormat = curr.replace(/[ ,0]/g, "");
    return { currencyFormat };
  }, [typeCurrency]);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    setValor(value);
  }
  return (
    <div className="border-2 w-[292px] border-[#94A3B8] flex items-center justify-between gap-3 rounded-lg focus-within:border-[#7C3AED]">
      <div className="flex items-center gap-1">
        <span className="pl-2 ">{currencyFormat}</span>
        <input
          type="text"
          id="input-numero"
          className="outline-none pr-2 h-14 rounded-lg w-full"
          onKeyUp={(e) => formatCurrency(e)}
          onChange={handleChange}
        />
      </div>

      <div className="w-[2px] h-6 bg-[#D9D9D9]" />

      <select
        name="teste"
        id="teste"
        className="bg-transparent text-base w-[130px] h-[50px] text-[#0F172A]"
        value={typeCurrency}
        onChange={(e) => setTypeCurrency(e.target.value)}
      >
        <option value="">Selecione</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BRL">BRL</option>
      </select>
    </div>
  );
}
