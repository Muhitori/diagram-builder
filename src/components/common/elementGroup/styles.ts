import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  elements: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2)
  },
  icon: {
    width: '24px',
    height: '24px'
  }
}));
