import { configureStore } from '@reduxjs/toolkit';
import createAccountReducer from './slices/createAccountSlice';

const store = configureStore({
  reducer: {
    createAccount: createAccountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;