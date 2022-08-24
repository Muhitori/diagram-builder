import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { toolbarOpenedSelector } from 'src/store/selector/UI.selector';
import { Diagram } from './Diagram';
import { ElementDetails } from './elementDetails/ElementDetails';
import { Sidebar } from '../../common/sidebar/Sidebar';
import { useStyles } from './styles';
import { Toolbar } from './toolbar/Toolbar';
import { currentNodeSelector } from 'src/store/selector/Node.selector';

export const Home = () => {
  const classes = useStyles();
  
  const toolbarOpened = useSelector(toolbarOpenedSelector);
  const currentNode = useSelector(currentNodeSelector);

  return (
    <Grid container sx={classes.root}>
      <Sidebar opened={toolbarOpened} side="left">
        <Toolbar />
      </Sidebar>
      <Sidebar opened={!!currentNode} side="right">
        <ElementDetails node={currentNode} />
      </Sidebar>

      <Diagram />
    </Grid>
  );
}