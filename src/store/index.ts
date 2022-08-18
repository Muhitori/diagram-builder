import { configureStore } from '@reduxjs/toolkit';
import { diagramReducer } from './slice/Diagram.slice';
import { elementsReducer } from './slice/Elements.slice';


export const store = configureStore({
  reducer: {
    elements: elementsReducer,
    diagram: diagramReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;