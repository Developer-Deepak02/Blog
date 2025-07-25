import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';

export const store = configureStore({
	reducer: {
    user: userReducer,
  },
});

export default store;