import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";

export const store = configureStore({
  reducer: {
    auth,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
