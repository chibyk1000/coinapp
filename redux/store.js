import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
export const store = configureStore({
  reducer: {
authSlice,
 userSlice
  },

});


