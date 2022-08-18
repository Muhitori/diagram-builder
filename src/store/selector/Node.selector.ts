import { RootState } from '..';

export const nodesSelector = (state: RootState) => state.diagram.nodes;
export const edgesSelector = (state: RootState) => state.diagram.edges;