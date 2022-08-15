import { AppBar, Switch, Typography } from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext } from '../App';
import { useStyles } from './styles';

export const Header = () => {
  const classes = useStyles();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const label = mode === 'dark' ? 'light' : 'dark';
  
  return (
    <AppBar position="static" className={classes.header}>
      <div>
        <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
        <Typography variant="body1" component="span">
          Switch to {label}
        </Typography>
      </div>
    </AppBar>
  );
}