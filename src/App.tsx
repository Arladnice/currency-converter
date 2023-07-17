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
        <Button sx={{ margin: "0 1rem" }} variant="outlined">
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
            }}
            to={"/"}
          >
            Конвертер
          </Link>
        </Button>
        <Button variant="outlined">
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
            }}
            to={"/table"}
          >
            Таблица
          </Link>
        </Button>
      </Box>
      <Routes>
        <Route path="/" element={<CurrencyChanger />} />
        <Route path="/table" element={<CurrencyTable />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
