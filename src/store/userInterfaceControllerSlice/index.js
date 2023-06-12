import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
};
const userInterfaceControlSlice = createSlice({
  name: "userInterfaceControlSlice",
  initialState,
  reducers: {
    setSidebaropen: (state, { payload }) => {
      state.isSideBarOpen = payload;
    },
  },
});

export const { setSidebaropen } = userInterfaceControlSlice.actions;
export default userInterfaceControlSlice.reducer;
