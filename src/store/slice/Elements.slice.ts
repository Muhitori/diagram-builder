import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IElementGroup } from 'src/types/Elements';
import { GroupFormData } from 'src/types/Forms';
import { v4 as uuid } from 'uuid';

interface AddElementPayload {
  groupName: string;
  name: string;
  color: string | undefined;
}

interface UpdateElementPayload {
  groupName: string;
  id: string;
  name: string;
  color: string | undefined;
}


interface SetGeneralOptionsPayload {
  generalOptions: GroupFormData;
  groupName: string;
}

interface DeleteElementPayload {
  groupName: string;
  id: string;
}

interface ElementsState {
  [id: string]: IElementGroup;
}

const initialGeneralOptions = {
  prefix: '',
  color: undefined,
};

const initialState: ElementsState = {
  'Group Sample': {
    name: 'Group Sample',
    generalOptions: initialGeneralOptions,
    elements: [{ id: 'elementSample1', name: 'Element Sample 1' }],
  },
};

export const elementsSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    addGroup(state, action: PayloadAction<string>) {
      const { payload: name } = action;

      return {
        ...state,
        [name]: {
          name,
          generalOptions: initialGeneralOptions,
          elements: [],
        },
      };
    },
    setGroupGeneralOptions(
      state,
      action: PayloadAction<SetGeneralOptionsPayload>
    ) {
      const { groupName, generalOptions } = action.payload;

      return {
        ...state,
        [groupName]: {
          ...state[groupName],
          generalOptions,
        },
      };
    },
    deleteGroup(state, action: PayloadAction<string>) {
      const { payload: groupName } = action;
      delete state[groupName];
      return state;
    },
    addElement(state, action: PayloadAction<AddElementPayload>) {
      const {
        payload: { groupName, name, color },
      } = action;

      const id = uuid();
      const elements = [...state[groupName].elements, { id, name, color }];

      return {
        ...state,
        [groupName]: {
          ...state[groupName],
          elements,
        },
      };
    },
    updateElement(state, action: PayloadAction<UpdateElementPayload>) {
      const {
        payload: { groupName, id, name, color },
      } = action;

      const elements = state[groupName].elements.map(element => {
        if (element.id === id) {
          return { ...element, name, color };
        }
        return element;
      });

      return {
        ...state,
        [groupName]: {
          ...state[groupName],
          elements,
        },
      };
    },
    deleteElement(state, action: PayloadAction<DeleteElementPayload>) {
      const {
        payload: { groupName, id },
      } = action;

      const elements = state[groupName].elements.filter(
        (element) => element.id !== id
      );

      return {
        ...state,
        [groupName]: {
          ...state[groupName],
          elements,
        },
      };
    },
  },
});

export const { reducer: elementsReducer } = elementsSlice;
export const {
  addGroup,
  setGroupGeneralOptions,
  deleteGroup,
  addElement,
  deleteElement,
  updateElement,
} = elementsSlice.actions;