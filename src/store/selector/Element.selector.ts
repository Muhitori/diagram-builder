import { RootState } from '..';

export const elementGroupsSelector = (state: RootState) => Object.values(state);

export const groupSelector = (id: string) => (state: RootState) => state[id];

export const elementSelector = (id: string, groupId: string) => (state: RootState) => {
  return state[groupId].elements.find(element => element.id === id)
}