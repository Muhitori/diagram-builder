import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    backdropFilter: 'blur(4.9px)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
