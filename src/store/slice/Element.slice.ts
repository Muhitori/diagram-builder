import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
}

export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {}
});

export const { reducer: elementReducer } = elementSlice;