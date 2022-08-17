export interface IElement {
  id: string;
  name: string;
}

export interface IElementGroup {
  name: string;
  elements: IElement[];
}