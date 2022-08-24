import { AppBar, Button, Switch, Typography, Grid } from '@mui/material';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toolbarOpenedSelector } from 'src/store/selector/UI.selector';
import { ColorModeContext } from '../App';
import { useStyles } from './styles';
import { toggleBar } from 'src/store/slice';

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const toolbarOpened = useSelector(toolbarOpenedSelector);

  const label = mode === 'dark' ? 'light' : 'dark';

  const toggleToolbarHandler = () => {
    dispatch(toggleBar('toolbar'));
  }
  
  return (
    <AppBar position="static">
      <Grid sx={classes.header} container>
        <Grid item>
          <Typography sx={{ marginRight: '1rem' }} variant="h6" component="span">
            Diagram Builder
          </Typography>
          {!toolbarOpened && (
            <Button color='success' onClick={toggleToolbarHandler}>
              Open toolbar
            </Button>
          )}
        </Grid>
        <Grid item>
          <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
          <Typography variant="body1" component="span">
            Switch to {label}
          </Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
}