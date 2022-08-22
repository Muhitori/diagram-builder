import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Bars {
  toolbar: boolean;
  elementBar: boolean;
}

interface UIState {
  bars: Bars;
}

const initialState: UIState = {
  bars: {
    toolbar: false,
    elementBar: true,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleBar(state, action: PayloadAction<keyof Bars>) {
      const barName = action.payload;

      const bars = { 
        ...state.bars,
        [barName]: !state.bars[barName],
      };

      return {
        ...state,
        bars
      };
    },
  },
});

export const { reducer: uiReducer } = uiSlice;
export const { toggleBar } = uiSlice.actions;
