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
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import {  elementToNode, insertNewNodeAsChild } from 'src/utils/nodes.helper';
import { RootState } from '..';

interface AddNodePayload {
  groupName: string;
  id: string;
  position: {
    x: number;
    y: number;
  }
  parentNodeId?: string;
}

interface DiagramState {
  currentNodeId: string | null;
  nodes: Node[];
  edges: Edge[];
}

export const createNodeAsync = createAsyncThunk(
  'diagram/node-add',
  (payload: AddNodePayload, { getState }) => {
    const { id, groupName, position, parentNodeId } = payload;
    const globalState = getState() as RootState;

    const element = globalState.elements[groupName].elements.find(
      (el) => el.id === id
    );

    return { element, position, parentNodeId };
  }
);

export const onNodeClick = createAsyncThunk(
  'diagram/node-click',
  (node: Node) => {
    return node.id;
  }
);

const initialStyle = {
  backgroundColor: 'transparent',
};

const initialState: DiagramState = {
  currentNodeId: null,
  nodes: [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
      style: initialStyle,
    },
    {
      id: '2',
      data: { label: 'Default Node' },
      position: { x: 100, y: 125 },
      style: initialStyle,
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
      style: initialStyle,
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
    onNodesChange(state, { payload }: PayloadAction<NodeChange[]>) {
      const changes = payload;
      const nodes = applyNodeChanges(changes, state.nodes);
      return { ...state, nodes };
    },
    updateNodes(state, { payload }: PayloadAction<(Node | undefined)[]>) {
      const filteredNodes: Node[] = payload.filter(node => Boolean(node)) as Node[];
      const nodeIds = filteredNodes.map((node) => node.id);

      const nodes = state.nodes.map((node) => {
        if (nodeIds.includes(node.id)) {
          return filteredNodes.find((n) => n.id === node.id) || node;
        }
        return node;
      });
      return { ...state, nodes };
    },
    onEdgesChange(state, { payload }: PayloadAction<EdgeChange[]>) {
      const changes = payload;
      const edges = applyEdgeChanges(changes, state.edges);
      return { ...state, edges };
    },
    onConnect(state, { payload }: PayloadAction<Connection>) {
      const connection = payload;
      const edges = addEdge(connection, state.edges);
      return { ...state, edges };
    },
    deleteNode(state, { payload: id }: PayloadAction<string>) {
      const newNodes = state.nodes.filter((node) => node.id !== id);
      return { ...state, nodes: newNodes };
    },
    deleteEdge(state, { payload: id }: PayloadAction<string>) {
      const newEdges = state.edges.filter((edge) => edge.id !== id);
      return { ...state, edges: newEdges };
    },
    setCurrentNodeId(state, { payload }: PayloadAction<string | null>) {
      return { ...state, currentNodeId: payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNodeAsync.fulfilled, (state, { payload }) => {
      if (!payload.element) {
        snackbarGenerator.error('Error while adding element.');
        return;
      }

      const { element, position, parentNodeId} = payload;
      const newNode: Node = elementToNode(element, position);

      if (parentNodeId) {
        const nodes = insertNewNodeAsChild(state.nodes, newNode, parentNodeId);  
        return { ...state, nodes };
      }

      return { ...state, nodes: [...state.nodes, newNode] };
    });
    builder.addCase(createNodeAsync.rejected, () => {
      snackbarGenerator.error('Error while adding node.');
    });
    builder.addCase(onNodeClick.fulfilled, (state, { payload }) => {
      return { ...state, currentNodeId: payload };
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
  setCurrentNodeId,
  updateNodes,
} = diagramSlice.actions;
