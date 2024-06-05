import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './statsSlice';
import fetchReducer from './fetchSlice';

const store = configureStore({
  reducer: {
    stats: counterReducer,
    fetch: fetchReducer,
  },
});

export default store;
