import { FC, PropsWithChildren, createContext, useState } from "react";

interface ICurrencyContext {
  fromCurrency: string;
  toCurrency: string;
  firstAmount: string;
  setFromCurrency: React.Dispatch<React.SetStateAction<string>>;
  setToCurrency: React.Dispatch<React.SetStateAction<string>>;
  setFirstAmount: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrencyContext = createContext<ICurrencyContext | null>(null);

const CurrencyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [firstAmount, setFirstAmount] = useState("1");

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
