import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "null",
  isSnackBarOpen: false,
};

const snackBarSlice = createSlice({
  name: "snackbarSlice",
  initialState,
  reducers: {
    setSnackbarMessage: (state, { payload }) => {
      state.message = payload;
    },
    setIsSnackBarOpen: (state, { payload }) => {
      state.isSnackBarOpen = payload;
    },
  },
});

export const { setIsSnackBarOpen, setSnackbarMessage } = snackBarSlice.actions;

export default snackBarSlice.reducer;
