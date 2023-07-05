import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.userData = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
