import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthUserType {
  userID: string;
  displayName: string;
  storageSizeInBytes: number | null;
}

export type UserType = AuthUserType | "preAuth" | "unAuth";

interface InitialSliceType {
  currentUser: UserType;
}

const slice = createSlice({
  name: "auth",
  initialState: {
    currentUser: "preAuth",
  } as InitialSliceType,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = "preAuth";
    },
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { clearCurrentUser, setCurrentUser } = slice.actions;
export default slice.reducer;
