import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrenciesState {
  data: any[];
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
    currenciesFetchingSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.error = "";
      state.data = action.payload;
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
