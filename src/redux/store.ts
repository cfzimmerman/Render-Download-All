import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import download from "./download";

export const store = configureStore({
  reducer: {
    auth,
    download,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
