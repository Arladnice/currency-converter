import { Autocomplete, Grid, TextField } from "@mui/material";

function SelectCountry() {
  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value="option1"
        options={["option1", "optiotn2"]}
        disableClearable
        renderInput={(params) => <TextField {...params} label="из" />}
      />
    </Grid>
  );
}

export default SelectCountry;
