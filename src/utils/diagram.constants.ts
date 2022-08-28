import { Node, Edge } from 'react-flow-renderer';

const initialStyle = {
  backgroundColor: 'transparent',
};

export const DEFAULT_NODES: Node[] = [
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
];
export const DEFAULT_EDGES: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];