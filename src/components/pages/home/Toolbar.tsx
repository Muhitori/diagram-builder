import { Paper } from '@mui/material';
import MuiToolbar from '@mui/material/Toolbar';
import { useStyles } from './styles';

export const Toolbar = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.sidebar}>
      <MuiToolbar />
    </Paper>
  );
}