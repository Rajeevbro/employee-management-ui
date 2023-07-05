import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./authenticationslice";
import employeeReducer from "./emploeeslice";
import userInterfaceControlReducer from "./userInterfaceControllerSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import snackbarReducer from "./snackbarSlice";
import globalReducer from "./globalslice";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "../store/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducer = combineReducers({
  authenticationStore: authenticationReducer,
  employeeStore: employeeReducer,
  userInterfaceControllStore: userInterfaceControlReducer,
  SnackBarStore: snackbarReducer,
  globalStore: globalReducer,
  userStore: userReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
