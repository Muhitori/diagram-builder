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
import { DEFAULT_EDGES, DEFAULT_NODES } from 'src/utils/diagram.constants';
import {  deleteNodeEdges, elementToNode, insertNewNodeAsChild } from 'src/utils/nodes.helper';
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

const initialState: DiagramState = {
  currentNodeId: null,
  nodes: DEFAULT_NODES,
  edges: DEFAULT_EDGES,
};

export const diagramSlice = createSlice({
  name: 'element',
  initialState,
  reducers: {
    onNodesChange(state, { payload }: PayloadAction<NodeChange[]>) {
      try {
        const changes = payload;
        const nodes = applyNodeChanges(changes, state.nodes);
        return { ...state, nodes };
      } catch (error) {
        snackbarGenerator.error('error');
        return state;
      }
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
      try {
        let newEdges = [...state.edges];

        const nodesWithoutChildren = state.nodes.filter(
          (node) => {
            //delete edge for each deleted child
            if (node.parentNode === id) {
              newEdges = deleteNodeEdges(newEdges, node.id);
            }
            return node.parentNode !== id
          });
      
        const newNodes = nodesWithoutChildren.filter((node) => node.id !== id);
        newEdges = deleteNodeEdges(newEdges, id);

        return { ...state, edges: newEdges, nodes: newNodes };
      } catch (error) {
        snackbarGenerator.error('Error while deleting node. Try to delete its child first');
        return state;
      }
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
