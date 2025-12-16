import { configureStore } from "@reduxjs/toolkit";
import bouquetReducer from "./bouquetSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    bouquets: bouquetReducer,
    user: userReducer,
  },
});
