import { ReactNode } from 'react';
import { ElementFormData } from './Forms';

export interface IElement {
  id: string;
  name: string;
  color?: string;
  content?: ReactNode;
}

export interface IElementGroup {
  name: string;
  generalOptions: Partial<ElementFormData>;
  elements: IElement[];
}