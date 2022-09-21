import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialSliceType {
  downloadActive: boolean;
  downloadBytesCompleted: number;
}

const slice = createSlice({
  name: "download",
  initialState: {
    downloadActive: false,
    downloadBytesCompleted: 0,
  } as InitialSliceType,
  reducers: {
    clearDownload: (state) => {
      state.downloadActive = false;
      state.downloadBytesCompleted = 0;
    },
    setDownloadBytesCompleted: (state, action: PayloadAction<number>) => {
      state.downloadBytesCompleted = action.payload;
    },
    incrementDownloadBytesCompleted: (state, action: PayloadAction<number>) => {
      state.downloadBytesCompleted += action.payload;
    },
  },
});

export const {
  clearDownload,
  setDownloadBytesCompleted,
  incrementDownloadBytesCompleted,
} = slice.actions;
export default slice.reducer;
