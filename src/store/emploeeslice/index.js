import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeList: [],
  isLoading: true,
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    addEmployee: (state, { payload }) => {
      state.employeeList = payload;
    },
  },
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
