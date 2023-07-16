import { CssBaseline } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import NightModeToggle from "./components/NightModeToggle";
import Home from "./pages/Home/Home";
import { useThemeContext } from "./theme/ThemeContextProvider";

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NightModeToggle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
