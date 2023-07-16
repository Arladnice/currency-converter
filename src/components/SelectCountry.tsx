import { Autocomplete, Grid, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCurrencies } from "../redux/slices/ActionCreators";

interface SelectCountryProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}

const SelectCountry: FC<SelectCountryProps> = ({ label, setValue, value }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(
    (state) => state.currencies
  );
  // console.log(data);

  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  useEffect(() => {
    if (data) {
      const dataFilter = data.filter((item) => "currencies" in item);
      const dataCountries = dataFilter.map((item) => {
        return `${Object.keys(item.currencies)[0]} - ${item.name.common}`;
      });

      setOptions(dataCountries);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    );
  }

  if (error) {
    return "Что-то пошло не так";
  }

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        options={options}
        disableClearable
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;
