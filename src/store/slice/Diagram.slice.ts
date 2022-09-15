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
import { DEFAULT_EDGES, DEFAULT_NODES } from 'src/utils/constants/diagram.constants';
import {
  deleteNodeEdges,
  elementToNode,
  getNodeById,
  getNodesWithNewChild,
  updateNodesHelper,
} from 'src/utils/helpers/nodes.helper';
import unionBy from 'lodash/unionBy';
import { RootState } from '..';
import { ElementFormData } from 'src/types/Forms';
import { getElementBackgroundColor } from 'src/utils/helpers/UI.helper';

interface AddNodePayload {
  groupName: string;
  id: string;
  position: {
    x: number;
    y: number;
  }
  parentNodeId?: string;
}

type UpdateNodeDataPayload = { id: string } & ElementFormData;

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

const initialState: DiagramState = {
  currentNodeId: null,
  nodes: DEFAULT_NODES,
  edges: DEFAULT_EDGES,
};

export const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    setCurrentNodeId(state, { payload }: PayloadAction<string | null>) {
      return { ...state, currentNodeId: payload };
    },
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
    updateNodeData(state, { payload }: PayloadAction<UpdateNodeDataPayload>) {
      const { id, name, color } = payload;
      const nodes = state.nodes.map(node => { 
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: name,
              backgroundColor: getElementBackgroundColor(color),
            },
          };
        }
        return node;
      });

      return { ...state, nodes };
    },
    updateNodes(state, { payload }: PayloadAction<(Node | undefined)[]>) {
      const nodes = updateNodesHelper(state.nodes, payload);
      return { ...state, nodes };
    },
    updateEdges(state, { payload }: PayloadAction<(Edge | undefined)[]>) {
      const edges = payload.filter((edge) => Boolean(edge)) as Edge[];
      const newEdges = unionBy(state.edges, edges, 'id');
      console.log(newEdges);
      return { ...state, edges: newEdges };
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
      const hasChildren = state.nodes.some((node) => node.parentNode === id);

      if (hasChildren) {
        snackbarGenerator.info('To delete node delete its child first');
        return state;
      }

      const nodes = state.nodes.filter((node) => node.id !== id);
      const edges = deleteNodeEdges(state.edges, id);
      return { ...state, edges, nodes };
    },
    deleteEdge(state, { payload: id }: PayloadAction<string>) {
      const newEdges = state.edges.filter((edge) => edge.id !== id);
      return { ...state, edges: newEdges };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNodeAsync.fulfilled, (state, { payload }) => {
      if (!payload.element) {
        snackbarGenerator.error('Error while adding element.');
        return;
      }

      const { element, position, parentNodeId } = payload;
      const newNode: Node = elementToNode(element, position);

      if (parentNodeId) {
        const parentNode = getNodeById(state.nodes, parentNodeId);
        const nodes = getNodesWithNewChild(state.nodes, newNode, parentNodeId);

        snackbarGenerator.success(
          `Node ${element.name} added as child of ${parentNode?.data.label}.`
        );

        return { ...state, nodes };
      }

      snackbarGenerator.success(`Node ${element.name} added to board.`);
      return { ...state, nodes: [...state.nodes, newNode] };
    });
    builder.addCase(createNodeAsync.rejected, () => {
      snackbarGenerator.error('Error while adding node.');
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
  updateEdges,
  updateNodeData,
} = diagramSlice.actions;
