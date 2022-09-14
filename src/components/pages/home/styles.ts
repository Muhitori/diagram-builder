import { HEADER_HEIGHT } from 'src/utils/constants/UI.constants';


export const useStyles = () => ({
  root: {
    position: 'relative',
    height: `calc(100% - ${HEADER_HEIGHT})`,
  },
});
