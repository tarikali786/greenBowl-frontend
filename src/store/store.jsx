import { configureStore } from "@reduxjs/toolkit";
import saladReducer from "../features/saladSlice";
import { authMiddleware } from "../Helper/middleware/authMiddleware";
export const store = configureStore({
  reducer: {
    salad: saladReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
