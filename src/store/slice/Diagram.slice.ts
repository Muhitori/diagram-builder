import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEdge, INode } from 'src/types/Diagram';
import { v4 as uuid } from 'uuid';
import { RootState } from '..';

interface AddNodePayload {
  groupName: string;
  id: string;
}

interface AddEdgePayload {
  sourceId: string;
  targetId: string;
}

interface DiagramState {
  nodes: INode[];
  edges: IEdge[];
}

export const addNodeAsync = createAsyncThunk(
  'diagram/node-add',
  async (payload: AddNodePayload, dispatch) => {
    const { id, groupName } = payload;
    const globalState = dispatch.getState() as RootState;

    const element = globalState.elements[groupName].elements.find(
      (el) => el.id === id
    );
    return element;
  }
);

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
    deleteNode(state, action: PayloadAction<string>) {
      const { payload: id } = action;

      const newNodes = state.nodes.filter((node) => node.id !== id);
      return { ...state, nodes: newNodes };
    },
    addEdge(state, action: PayloadAction<AddEdgePayload>) {
      const id = uuid();
      const { sourceId: source, targetId: target } = action.payload;

      const newEdges = [...state.edges, { id, source, target }];

      return { ...state, edges: newEdges };
    },
    deleteEdge(state, action: PayloadAction<string>) {
      const { payload: id } = action;

      const newEdges = state.edges.filter((edge) => edge.id !== id);
      return { ...state, edges: newEdges };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNodeAsync.fulfilled, (state, {payload}) => {
      if (!payload) return;

      const { name } = payload;

      const id = uuid();
      const data = {
        label: name,
      };
      const position = { x: 0, y: 0 };

      const newNodes = [...state.nodes, { id, data, position }];

      return { ...state, nodes: newNodes };
    });
  },
});

export const { reducer: diagramReducer } = diagramSlice;
export const { deleteNode, addEdge, deleteEdge } = diagramSlice.actions;
