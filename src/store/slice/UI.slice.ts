import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ElementFormData, GroupFormData, NodeFormData } from 'src/types/Forms';
import { Bars, Modals } from 'src/types/UI';

interface SetModalDataPayload {
  name: keyof Modals;
  data: GroupFormData | ElementFormData | NodeFormData;
}

interface UIState {
  bars: Bars;
  modals: Modals;
}

const initialGroupModalData: GroupFormData = {
  prefix: '',
  color: '#ffffff',
};

const initialElementModalData: ElementFormData = {
  name: '',
  color: '#ffffff'
}

const initialNodeModalData: NodeFormData = {
  name: '',
  color: '#ffffff',
};

const initialState: UIState = {
  bars: {
    toolbar: false,
    nodeBar: false,
  },
  modals: {
    group: initialGroupModalData,
    element: initialElementModalData,
    node: initialNodeModalData
  }
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
    setModalData(state, { payload }: PayloadAction<SetModalDataPayload>) {
      const { name, data } = payload;

      return {
        ...state,
        modals: {
          ...state.modals,
          [name]: data
        }
      }
    }
  },
});

export const { reducer: uiReducer } = uiSlice;
export const { toggleBar, setModalData } = uiSlice.actions;
