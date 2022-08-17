export interface IElement {
  id: string;
  name: string;
}

export interface IElementGroup {
  id: string;
  name: string;
  elements: IElement[];
}