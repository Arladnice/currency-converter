import axios from "axios";
import { AppDispatch } from "../store";
import {
  currenciesFetching,
  currenciesFetchingError,
  currenciesFetchingSuccess,
} from "./currenciesSlice";

export const fetchCurrencies = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(currenciesFetching());
    const response = await axios.get<any[]>(
      "https://restcountries.com/v3.1/all"
    );
    dispatch(currenciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(currenciesFetchingError(e.message));
  }
};
