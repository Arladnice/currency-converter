import { Box, Button, CssBaseline } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import NightModeToggle from "./components/NightModeToggle";
import { useThemeContext } from "./theme/ThemeContextProvider";
import CurrencyChanger from "./pages/CurrencyChanger/CurrencyChanger";
import { Link, Route, Routes } from "react-router-dom";
import CurrencyTable from "./pages/CurrencyTable/CurrencyTable";

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <NightModeToggle />
      <CssBaseline />
      <Box sx={{ paddingBottom: "1rem" }}>
        <Link
          style={{
            textDecoration: "none",
            color: theme.palette.primary.main,
          }}
          to={"/"}
        >
          <Button sx={{ margin: "0 1rem" }} variant="outlined">
            Конвертер
          </Button>
        </Link>

        <Link
          style={{
            textDecoration: "none",
            color: theme.palette.primary.main,
          }}
          to={"/table"}
        >
          <Button variant="outlined">Таблица</Button>
        </Link>
      </Box>
      <Routes>
        <Route path="/" element={<CurrencyChanger />} />
        <Route path="/table" element={<CurrencyTable />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
