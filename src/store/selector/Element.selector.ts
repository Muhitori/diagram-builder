import { RootState } from '..';

export const elementGroupsSelector = (state: RootState) =>
  Object.values(state.elements);

export const groupSelector = (id: string) => (state: RootState) => state.elements[id];

export const elementSelector = (id: string, groupId: string) => (state: RootState) => {
  return state.elements[groupId].elements.find((element) => element.id === id);
}