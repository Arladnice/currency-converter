import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import CurrencyProvider from "./context/CurrencyContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
);
