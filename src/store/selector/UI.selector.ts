import { Bars, Modals } from 'src/types/UI';
import { RootState } from '..';

export const barOpenedSelector = (barName: keyof Bars) => (state: RootState) => state.ui.bars[barName];
export const modalDataSelector = (modalName: keyof Modals) => (state: RootState) =>
  state.ui.modals[modalName];
