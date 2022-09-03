import { Node, Edge } from 'react-flow-renderer';

const initialStyle = {
  backgroundColor: 'transparent',
};

const size = {
  width: 120,
  height: 40
}

export const DEFAULT_NODES: Node[] = [
  {
    id: '1',
    type: 'custom-default',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
    style: initialStyle,
    ...size,
  },
  {
    id: '2',
    type: 'custom-default',
    data: { label: 'Default Node' },
    position: { x: 100, y: 125 },
    style: initialStyle,
    ...size,
  },
  {
    id: '3',
    type: 'custom-default',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
    style: initialStyle,
    ...size,
  },
];
export const DEFAULT_EDGES: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];