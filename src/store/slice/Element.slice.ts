import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IElementGroup } from 'src/types/Elements';

interface ElementGroupPayload {
  id: string;
  name: string;
}

interface AddElementPayload {
  groupId: string;
  id: string;
  name: string;
}

interface DeleteElementPayload {
  groupId: string;
  id: string;
}

interface ElementsState {
  [id: string]: IElementGroup;
}

const initialState: ElementsState = {
  groupSample: {
    id: 'groupSample',
    name: 'Group Sample',
    elements: [
      { id: 'elementSample1', name: 'Element Sample 1' },
      { id: 'elementSample2', name: 'Element Sample 2' },
      { id: 'elementSample3', name: 'Element Sample 3' },
      { id: 'elementSample4', name: 'Element Sample 4' },
    ],
  },
};

export const elementSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    addGroup(state, action: PayloadAction<ElementGroupPayload>) {
      const {
        payload: { id, name },
      } = action;

      return {
        ...state,
        [id]: {
          id,
          name,
          elements: [],
        },
      };
    },
    deleteGroup(state, action: PayloadAction<string>) {
      const { payload: groupId } = action;
      delete state[groupId];
      return state;
    },
    addElement(state, action: PayloadAction<AddElementPayload>) {
      const {
        payload: { groupId, id, name },
      } = action;

      const elements = [...state[groupId].elements, { id, name }];

      return {
        ...state,
        [groupId]: {
          ...state[groupId],
          elements,
        },
      };
    },
    deleteElement(state, action: PayloadAction<DeleteElementPayload>) {
      const {
        payload: { groupId, id },
      } = action;

      const elements = state[groupId].elements.filter(
        (element) => element.id !== id
      );

      return {
        ...state,
        [groupId]: {
          ...state[groupId],
          elements,
        },
      };
    },
  },
});

export const { reducer: elementReducer } = elementSlice;
export const { addGroup, deleteGroup, addElement, deleteElement } = elementSlice.actions;