import { ReactNode } from 'react';
import { ElementFields } from './Forms';

export interface IElement {
  id: string;
  name: string;
  color?: string;
  content?: ReactNode;
}

export interface IElementGroup {
  name: string;
  generalOptions: Partial<ElementFields>,
  elements: IElement[];
}