import { FC, PropsWithChildren, createContext, useState } from "react";

interface ICurrencyContext {
  fromCurrency: string;
  toCurrency: string;
  setFromCurrency: React.Dispatch<React.SetStateAction<string>>;
  setToCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrencyContext = createContext<ICurrencyContext | null>(null);

const CurrencyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState("AMD - Armenia");
  const [toCurrency, setToCurrency] = useState("CAD - Canada");

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
