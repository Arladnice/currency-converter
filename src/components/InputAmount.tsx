import { Grid, TextField } from "@mui/material";

function InputAmount() {
  return (
    <Grid item xs={12} md>
      <TextField
        label="Количество"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: "$:"
        }}
      />
    </Grid>
  );
}

export default InputAmount;
