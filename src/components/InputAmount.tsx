import { Grid, TextField, InputAdornment } from "@mui/material";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

function InputAmount() {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext)!;

  return (
    <Grid item xs={12} md>
      <TextField
        value={firstAmount}
        onChange={(e) => setFirstAmount(e.target.value)}
        label="Количество"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
    </Grid>
  );
}

export default InputAmount;
