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

  const nodes = diagramState.nodes;
  const currentNodeId = diagramState.currentNodeId;

  const getNodeNameById = (nodeId: string) => {
    const connectedNode = nodes.find((node) => node.id === nodeId);
    return connectedNode?.data.label;
  }

  const filteredEdges = diagramState.edges.filter(
    (edge) => edge.source === currentNodeId || edge.target === currentNodeId
  );

  const sortedConnectedNodes = filteredEdges
    .map((edge) => {
      if (currentNodeId === edge.source) {
        return {
          key: 'output' + edge.target,
          label: 'Output',
          name: getNodeNameById(edge.target),
        };
      }

      return {
        key: 'input' + edge.source,
        label: 'Input',
        name: getNodeNameById(edge.source),
      };
    })
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return sortedConnectedNodes;
}