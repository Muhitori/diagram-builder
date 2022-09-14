import { Bars } from 'src/types/UI';
import { RootState } from '..';

export const barOpenedSelector = (barName: keyof Bars) => (state: RootState) => state.ui.bars[barName];
export const elementModalDataSelector = (state: RootState) => state.ui.elementModalData;
