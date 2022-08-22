import { RootState } from '..';

export const toolbarOpenedSelector = (state: RootState) => state.ui.bars.toolbar;
export const elementDetailsOpenedSelector = (state: RootState) =>
  state.ui.bars.elementBar;
