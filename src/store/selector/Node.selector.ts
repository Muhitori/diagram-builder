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
  const id = diagramState.currentNodeId;
  return diagramState.edges.filter(edge => edge.source === id || edge.target === id);
}