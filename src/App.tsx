import { Container, Grid, Typography, CssBaseline } from "@mui/material";
import "./App.css";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider } from "@emotion/react";
import NightModeToggle from "./components/NightModeToggle";
import { useContext } from "react";
import { CurrencyContext } from "./context/CurrencyContext";

function App() {
  const { theme } = useThemeContext();

  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useContext(CurrencyContext)!;

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
      </Container>
    </ThemeProvider>
  );
}

export default App;
