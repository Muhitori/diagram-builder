import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ElementFields } from 'src/types/Forms';
import { Bars } from 'src/types/UI';

interface UIState {
  bars: Bars;
  elementModalData: ElementFields
}

const initialElementData = {
  name: '',
  color: '#ffffff',
};

const initialState: UIState = {
  bars: {
    toolbar: false,
    nodeBar: false,
  },
  elementModalData: initialElementData,
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
    setElementModalData(state, action: PayloadAction<Partial<ElementFields> | null>) {
      const data = action.payload;

      return {
        ...state,
        elementModalData: {
          ...initialElementData,
          ...data,
        },
      };
    },
  },
});

export const { reducer: uiReducer } = uiSlice;
export const { toggleBar, setElementModalData } = uiSlice.actions;
