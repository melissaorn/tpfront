import { configureStore } from "@reduxjs/toolkit";
import bouquetReducer from "./bouquetSlice";
import userSlice from "./userSlice";


export const store = configureStore({
  reducer: { bouquets: bouquetReducer,
    user: userSlice,
   },
});
