import { AppBar, Switch } from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext } from '../App';
import { useStyles } from './styles';

export const Header = () => {
  const classes = useStyles();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  
  return (
    <AppBar position='static' className={classes.header}>
      <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
    </AppBar>
  );
}