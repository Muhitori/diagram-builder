import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { ElementGroup } from 'src/components/common/elementGroup/ElementGroup';
import { elementGroupsSelector } from 'src/store/selector/Element.selector';
import { useStyles } from './styles';

export const Toolbar = () => {
  const classes = useStyles();

  const elementGroups = useSelector(elementGroupsSelector);

  return (
    <Paper className={classes.sidebar}>
      <div className={classes.toolbar}>
        {!!elementGroups.length && elementGroups.map(group => <ElementGroup key={group.id} group={group} />)}
      </div>
    </Paper>
  );
}