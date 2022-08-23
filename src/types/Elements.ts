import { ReactNode } from 'react';

export interface IElement {
  id: string;
  name: string;
  content?: ReactNode;
}

export interface IElementGroup {
  name: string;
  elements: IElement[];
}