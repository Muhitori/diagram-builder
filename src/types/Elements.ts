import { ReactNode } from 'react';
import { GroupFormData } from './Forms';

export interface IElement {
  id: string;
  name: string;
  color?: string;
  content?: ReactNode;
}

export interface IElementGroup {
  name: string;
  generalOptions: GroupFormData;
  elements: IElement[];
}