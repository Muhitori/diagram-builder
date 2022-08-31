import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { barOpenedSelector } from 'src/store/selector/UI.selector';
import { Diagram } from './diagram/Diagram';
import { NodeDetails } from './nodeDetails/NodeDetails';
import { Sidebar } from '../../common/sidebar/Sidebar';
import { useStyles } from './styles';
import { Toolbar } from './toolbar/Toolbar';
import { currentNodeSelector } from 'src/store/selector/Node.selector';

export const Home = () => {
  const classes = useStyles();
  
  const toolbarOpened = useSelector(barOpenedSelector('toolbar'));
  const currentNode = useSelector(currentNodeSelector);

  return (
    <Grid container sx={classes.root}>
      <Sidebar opened={toolbarOpened} side="left">
        <Toolbar />
      </Sidebar>
      <Sidebar opened={!!currentNode} side="right">
        <NodeDetails node={currentNode} />
      </Sidebar>

      <Diagram />
    </Grid>
  );
}