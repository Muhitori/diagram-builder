import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  element: {
    padding: theme.spacing(1, 2),
    border: '1px solid black',
    borderRadius: '0.2rem',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
}));
