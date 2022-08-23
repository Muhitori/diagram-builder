import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HEADER_HEIGHT } from 'src/utils/UI.constants';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    height: `calc(100% - ${theme.spacing(HEADER_HEIGHT)})`,
  },
  elementDetails: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
  },
}));
