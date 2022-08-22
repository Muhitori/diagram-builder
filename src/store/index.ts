import { configureStore } from '@reduxjs/toolkit';
import { uiReducer, diagramReducer, elementsReducer } from './slice';


export const store = configureStore({
  reducer: {
    ui: uiReducer,
    elements: elementsReducer,
    diagram: diagramReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;