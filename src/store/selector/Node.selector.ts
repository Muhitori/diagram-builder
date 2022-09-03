import { getRectOfNodes } from 'react-flow-renderer';
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
export const nodeEdgesSelector = (id: string | undefined) => (state: RootState) => {
  const diagramState = state.diagram;
  return diagramState.edges.filter(edge => edge.source === id || edge.target === id);
}

export const nodeSizesSelector = (id: string | undefined) => (state: RootState) => {
  const diagramState = state.diagram;
  const nodes = diagramState.nodes;

  const node = nodes.find(n => n.id === id);
  const parent = nodes.find(n => n.id === node?.parentNode);
  const children = nodes.filter(n => n.parentNode === id);

  const childRect = getRectOfNodes(children);

  return {
    width: node?.width,
    height: node?.height,
    parent: {
      width: parent?.width,
      height: parent?.height,
    },
    children: {
      width: childRect.width,
      height: childRect.height,
    },
  };
}