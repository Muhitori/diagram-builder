import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEdge, INode } from 'src/types/Diagram';

interface DiagramState {
  nodes: INode[];
  edges: IEdge[];
}

const initialState: DiagramState = {
  nodes: [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
    },

    {
      id: '2',
      data: { label: 'Default Node' },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ],
};

export const diagramSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<string>) {},
    deleteNode(state, action: PayloadAction<string>) {},
    addEdge(state, action: PayloadAction<string>) {},
    deleteEdge(state, action: PayloadAction<string>) {},
  },
});

export const { reducer: diagramReducer } = diagramSlice;
export const { addNode, deleteNode, addEdge, deleteEdge } = diagramSlice.actions;
