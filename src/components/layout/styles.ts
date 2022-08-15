import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HEADER_HEIGHT } from 'src/utils/UI.constants'

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    height: theme.spacing(HEADER_HEIGHT),
  },
}));
