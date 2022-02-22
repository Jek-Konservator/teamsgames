import { configureStore, combineReducers } from "@reduxjs/toolkit";
import toolKitSlice from "./toolKitSlice";

const rootReducer = combineReducers({
  mainReducer: toolKitSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
