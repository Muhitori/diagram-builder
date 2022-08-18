import { ReactNode } from 'react';

export interface INode {
  id: string;
  type?: string;
  data: {
    label: string | ReactNode
  };
  position: {
    x: number;
    y: number;
  };
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}