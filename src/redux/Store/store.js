import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../Auth/authSlice.js';
export const store = configureStore({
  reducer: {
    auth: AuthReducer
  }
});
