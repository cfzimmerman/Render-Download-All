import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialSliceType {
  downloadActive: boolean;
  downloadBytesCompleted: number;
  downloadComplete: boolean;
}

const slice = createSlice({
  name: "download",
  initialState: {
    downloadActive: false,
    downloadBytesCompleted: 0,
    downloadComplete: false,
  } as InitialSliceType,
  reducers: {
    clearDownload: (state) => {
      state.downloadActive = false;
      state.downloadBytesCompleted = 0;
    },
    setDownloadAcive: (state, action: PayloadAction<boolean>) => {
      state.downloadActive = action.payload;
    },
    setDownloadBytesCompleted: (state, action: PayloadAction<number>) => {
      state.downloadBytesCompleted = action.payload;
    },
    incrementDownloadBytesCompleted: (state, action: PayloadAction<number>) => {
      state.downloadBytesCompleted += action.payload;
    },
    setDownloadComplete: (state, action: PayloadAction<boolean>) => {
      state.downloadComplete = action.payload;
    },
  },
});

export const {
  clearDownload,
  setDownloadBytesCompleted,
  incrementDownloadBytesCompleted,
  setDownloadAcive,
  setDownloadComplete,
} = slice.actions;
export default slice.reducer;
