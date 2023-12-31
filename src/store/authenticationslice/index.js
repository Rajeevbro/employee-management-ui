import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseStatus: "",
  token: "",
  isLoading: true,
  role: "",
  isTokenValid: false,
  userName: "",
};

const authenticationSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setResponseStatus: (state, { payload }) => {
      state.responseStatus = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setTokenValidity: (state, { payload }) => {
      state.isTokenValid = payload;
    },
    setUserName: (state, { payload }) => {
      state.userName = payload;
    },
  },
});

export const {
  setLoading,
  setResponseStatus,
  setRole,
  setToken,
  setTokenValidity,
  setUserName,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
