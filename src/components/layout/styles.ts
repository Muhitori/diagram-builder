import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HEADER_HEIGHT } from 'src/utils/UI.constants'

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    height: theme.spacing(HEADER_HEIGHT),
  },
}));
