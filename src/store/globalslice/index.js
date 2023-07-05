import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setLoading } = globalSlice.actions;

export default globalSlice.reducer;
