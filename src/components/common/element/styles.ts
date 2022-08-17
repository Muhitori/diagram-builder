import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';

const getBorderColor = (themeMode: string) => themeMode === 'light' ? grey[900] : grey[50];

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  element: {
    minWidth: '50%',
    padding: theme.spacing(1, 2),
    border: `1px solid ${getBorderColor(theme.palette.mode)}`,
    borderRadius: '0.2rem',
  },
}));
