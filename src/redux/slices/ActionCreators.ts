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
      "https://api.freecurrencyapi.com/v1/currencies",
      {
        params: {
          apikey: "fca_live_R1bjwclp0miUejau7WN75x420xahH198rn9tN5Kr",
        },
      }
    );
    dispatch(currenciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(currenciesFetchingError(e.message));
  }
};
