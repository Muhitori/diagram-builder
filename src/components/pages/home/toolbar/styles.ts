import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
