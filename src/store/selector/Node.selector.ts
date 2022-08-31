import { getConnectedNodes } from 'src/utils/nodes.helper';
import { RootState } from '..';

export const nodesSelector = (state: RootState) => state.diagram.nodes;
export const edgesSelector = (state: RootState) => state.diagram.edges;

export const currentNodeSelector = (state: RootState) => {
  const diagramState = state.diagram;
  const id = diagramState.currentNodeId;
  return diagramState.nodes.find((node) => node.id === id);
};

export const currentNodeEdgesSelector = (state: RootState) => {
  const diagramState = state.diagram;
  const { nodes, edges, currentNodeId } = diagramState;

  return getConnectedNodes(nodes, edges, currentNodeId);
}

export const nodeByIdSelector = (id: string | undefined) => (state: RootState) => state.diagram.nodes.find(node => node.id === id);