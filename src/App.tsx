import { useState } from "react";
import { Container, Grid, Typography, CssBaseline, Box } from "@mui/material";
import "./App.css";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider } from "@emotion/react";
import NightModeToggle from "./components/NightModeToggle";
import { useContext, useEffect } from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import axios from "axios";

function App() {
  const { theme } = useThemeContext();

  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext)!;

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[0];
  const codeToCurrency = toCurrency.split(" ")[0];

  useEffect(() => {
    if (firstAmount) {
      axios
        .get("https://api.freecurrencyapi.com/v1/latest", {
          params: {
            apikey: "fca_live_R1bjwclp0miUejau7WN75x420xahH198rn9tN5Kr",
            base_currency: codeFromCurrency,
            currencies: codeToCurrency,
          },
        })
        .then((response) => {
          setResultCurrency(response.data.data[codeToCurrency]);
        })
        .catch((error) => console.log(error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles = {
    textAlign: "center",
    minHeight: "20rem",
    borderRadius: 2,
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
    padding: "2rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NightModeToggle />
      <Container maxWidth="md" sx={boxStyles}>
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
          Конвертер валют
        </Typography>
        <Grid container spacing={2}>
          <InputAmount />
          <SelectCountry
            value={fromCurrency}
            setValue={setFromCurrency}
            label="Из"
          />
          <SwitchCurrency />
          <SelectCountry
            value={toCurrency}
            setValue={setToCurrency}
            label="В"
          />
        </Grid>
        {firstAmount ? (
          <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
            <Typography variant="h5">
              {firstAmount} {fromCurrency} =
            </Typography>
            <Typography variant="h5" sx={{ marginTop: "5px" }}>
              {resultCurrency * Number(firstAmount)} {toCurrency}
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
