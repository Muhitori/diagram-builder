import { Grid } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { elementDetailsOpenedSelector, toolbarOpenedSelector } from 'src/store/selector/UI.selector';
import { Diagram } from './Diagram';
import { ElementDetails } from './ElementDetails';
import { Sidebar } from './Sidebar';
import { useStyles } from './styles';
import { Toolbar } from './toolbar/Toolbar';

const baseDiagramWidth = 7;
const toolbarWidth = 3;
const elementWidth = 2;

export const Home = () => {
  const classes = useStyles();
  
  const toolbarOpened = useSelector(toolbarOpenedSelector);
  const elementOpened = useSelector(elementDetailsOpenedSelector);

  const diagramWidth = useMemo(() => {
    if (toolbarOpened && elementOpened) {
      return baseDiagramWidth;
    }

    if (elementOpened) {
      return baseDiagramWidth + toolbarWidth;
    }

    if (toolbarOpened) {
      return baseDiagramWidth + elementWidth;
    }

    return baseDiagramWidth + toolbarWidth + elementWidth;
  }, [toolbarOpened, elementOpened]);

  return (
    <Grid container className={classes.root}>
      <Sidebar opened={toolbarOpened} size={toolbarWidth}>
        <Toolbar />
      </Sidebar>
      <Grid item sm={diagramWidth} md={diagramWidth} lg={diagramWidth}>
        <Diagram />
      </Grid>
      <Sidebar opened={elementOpened} size={elementWidth}>
        <ElementDetails />
      </Sidebar>
    </Grid>
  );
}