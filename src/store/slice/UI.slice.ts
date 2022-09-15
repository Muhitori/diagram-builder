import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Bars } from 'src/types/UI';

interface UIState {
  bars: Bars;
}


const initialState: UIState = {
  bars: {
    toolbar: false,
    nodeBar: false,
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
        bars,
      };
    },
  },
});

export const { reducer: uiReducer } = uiSlice;
export const { toggleBar } = uiSlice.actions;
