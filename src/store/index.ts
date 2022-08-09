import { configureStore } from '@reduxjs/toolkit';
import { elementReducer } from './slice/Element.slice';

export const store = configureStore({
  reducer: elementReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;