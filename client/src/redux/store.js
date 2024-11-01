import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './heroSlice';

const store = configureStore({
  reducer: {
    heroes: heroReducer,
  },
});

export default store;
