import { AppBar, Switch, Typography } from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext } from '../App';
import { useStyles } from './styles';

export const Header = () => {
  const classes = useStyles();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const label = mode === 'dark' ? 'light' : 'dark';
  
  return (
    <AppBar
      position="static"
      sx={{ flexDirection: 'row' }}
      classes={{ root: classes.header }}
    >
      <Typography variant="h6">
        Diagram Builder
      </Typography>
      <div>
        <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
        <Typography variant="body1" component="span">
          Switch to {label}
        </Typography>
      </div>
    </AppBar>
  );
}