import { configureStore } from "@reduxjs/toolkit";
import saladReducer from "../features/saladSlice";
export const store = configureStore({
  reducer: {
    salad: saladReducer,
  },
});
