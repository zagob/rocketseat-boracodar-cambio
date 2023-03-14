import { formatCurrency } from "@/utils/formatCurrency";
import { FormEvent, InputHTMLAttributes, useMemo, useState } from "react";

interface InputCurrencyProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  flagsCambio: flagSelectedProps[];
  handleSelectedFlag: (flagObj: flagSelectedProps, name: string) => void;
}

interface flagSelectedProps {
  id: string;
  name: string;
  isSelected: boolean;
}

export function InputCurrency({
  name,
  flagsCambio,
  handleSelectedFlag,
  ...rest
}: InputCurrencyProps) {
  const [dropdowActive, setDropdownActive] = useState(false);
  const [valor, setValor] = useState("");

  const selected = flagsCambio.find((item) => item.isSelected);

  const { currencyFormat } = useMemo(() => {
    const curr = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: selected?.name ?? "USD",
    }).format(0);
    const currencyFormat = curr.replace(/[ ,0]/g, "");
    return { currencyFormat };
  }, [selected]);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    setValor(value);
  }

  return (
    <div className="border border-gray-500 w-full h-14 rounded-md relative">
      <div className="border h-full rounded-md pl-2">
        <span>{currencyFormat}</span>
        <input
          type="text"
          className="rounded-md h-full w-[200px] pr-4 pl-1 outline-none "
          placeholder="1.000"
          onKeyUp={(e) => formatCurrency(e)}
          onChange={handleChange}
          {...rest}
        />
      </div>
      <div
        tabIndex={1}
        onBlur={() => setDropdownActive(() => false)}
        className="absolute right-0 top-0"
      >
        <div
          onClick={() => setDropdownActive((state) => !state)}
          className="px-6 rounded-md flex items-center justify-center gap-1 h-[54px] hover:bg-zinc-100 hover:cursor-pointer"
        >
          <span
            className={`fi fi-${selected?.id} fis text-3xl rounded-full`}
          ></span>
          {selected?.name}
        </div>

        <ul
          className={`bg-white shadow-lg rounded-md h-32 mt-2 pt-4 ${
            dropdowActive ? "block" : "hidden"
          } overflow-auto relative z-10 space-y-2`}
        >
          {flagsCambio
            .filter((flag) => !flag.isSelected)
            .map((flag) => (
              <li
                onClick={() => {
                  handleSelectedFlag(flag, name);
                  setDropdownActive(false);
                }}
                className="flex items-center gap-1 px-6 py-2 hover:bg-zinc-200 hover:cursor-pointer"
              >
                <span
                  className={`fi fi-${flag.id} fis text-3xl rounded-full`}
                ></span>
                {flag.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
