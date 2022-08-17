import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { ElementGroup } from 'src/components/common/elementGroup/ElementGroup';
import { elementGroupsSelector } from 'src/store/selector/Element.selector';
import { useStyles } from './styles';
import { ToolbarControls } from './ToolbarControls';

export const Toolbar = () => {
  const classes = useStyles();

  const elementGroups = useSelector(elementGroupsSelector);

  return (
    <Paper className={classes.root}>
      <ToolbarControls />
      <div className={classes.toolbar}>
        {!!elementGroups.length &&
          elementGroups.map((group) => (
            <ElementGroup key={group.name} group={group} />
          ))}
      </div>
    </Paper>
  );
}