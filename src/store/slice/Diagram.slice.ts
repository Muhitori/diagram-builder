import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';
import { RootState } from '..';

interface AddNodePayload {
  groupName: string;
  id: string;
  position: {
    x: number;
    y: number;
  }
}

interface DiagramState {
  nodes: Node[];
  edges: Edge[];
}

export const createNodeAsync = createAsyncThunk(
  'diagram/node-add',
  (payload: AddNodePayload, dispatch) => {
    const { id, groupName, position } = payload;
    const globalState = dispatch.getState() as RootState;

    const element = globalState.elements[groupName].elements.find(
      (el) => el.id === id
    );
    return { element, position };
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
    onNodesChange(state, action: PayloadAction<NodeChange[]>) {
      const changes = action.payload;
      const nodes = applyNodeChanges(changes, state.nodes);
      return { ...state, nodes };
    },
    onEdgesChange(state, action: PayloadAction<EdgeChange[]>) {
      const changes = action.payload;
      const edges = applyEdgeChanges(changes, state.edges);
      return { ...state, edges };
    },
    onConnect(state, action: PayloadAction<Connection>) {
      const connection = action.payload;
      const edges = addEdge(connection, state.edges);
      return { ...state, edges };
    },
    deleteNode(state, action: PayloadAction<string>) {
      const { payload: id } = action;

      const newNodes = state.nodes.filter((node) => node.id !== id);
      return { ...state, nodes: newNodes };
    },
    deleteEdge(state, action: PayloadAction<string>) {
      const { payload: id } = action;

      const newEdges = state.edges.filter((edge) => edge.id !== id);
      return { ...state, edges: newEdges };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNodeAsync.fulfilled, (state, { payload }) => {
      if (!payload.element) return;

      const { element: { name }, position } = payload;

      const id = uuid();
      const data = {
        label: name,
      };

      const newNodes = [...state.nodes, { id, data, position }];

      return { ...state, nodes: newNodes };
    });
  },
});

export const { reducer: diagramReducer } = diagramSlice;
export const {
  deleteNode,
  deleteEdge,
  onNodesChange,
  onEdgesChange,
  onConnect,
} = diagramSlice.actions;
