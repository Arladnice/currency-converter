import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Data {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
}

export interface CurrenciesState {
  data: Data[];
  isLoading: boolean;
  error: string;
}

const initialState: CurrenciesState = {
  data: [],
  isLoading: false,
  error: "",
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    currenciesFetching(state) {
      state.isLoading = true;
    },
    currenciesFetchingSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload.data;
    },
    currenciesFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  currenciesFetching,
  currenciesFetchingError,
  currenciesFetchingSuccess,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
