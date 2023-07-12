import { Container, Grid, Typography } from "@mui/material";
import "./App.css";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";

function App() {
  const boxStyles = {
    background: "#fdfdfd",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Конвертер валют
      </Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry />
        <SwitchCurrency />
        <SelectCountry />
      </Grid>
    </Container>
  );
}

export default App;
