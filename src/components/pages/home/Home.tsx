import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { elementDetailsOpenedSelector, toolbarOpenedSelector } from 'src/store/selector/UI.selector';
import { Diagram } from './Diagram';
import { ElementDetails } from './ElementDetails';
import { Sidebar } from '../../common/sidebar/Sidebar';
import { useStyles } from './styles';
import { Toolbar } from './toolbar/Toolbar';

export const Home = () => {
  const classes = useStyles();
  
  const toolbarOpened = useSelector(toolbarOpenedSelector);
  const elementOpened = useSelector(elementDetailsOpenedSelector);

  return (
    <Grid container className={classes.root}>
      <Sidebar opened={toolbarOpened} side="left">
        <Toolbar />
      </Sidebar>
      <Sidebar opened={elementOpened} side="right">
        <ElementDetails />
      </Sidebar>

      <Diagram />
    </Grid>
  );
}