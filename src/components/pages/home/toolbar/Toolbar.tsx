import { Paper } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ElementGroup } from 'src/components/common/elementGroup/ElementGroup';
import { Icon } from 'src/components/common/Icon/Icon';
import { elementGroupsSelector } from 'src/store/selector/Element.selector';
import { toggleBar } from 'src/store/slice';
import { useStyles } from './styles';
import { ToolbarControls } from './ToolbarControls';
import ClearIcon from '@mui/icons-material/Clear';

export const Toolbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const elementGroups = useSelector(elementGroupsSelector);

  const toggleToolbarHandler = useCallback(() => {
    dispatch(toggleBar('toolbar'));
  }, [dispatch]);

  return (
    <Paper className={classes.root}>
      <Icon style={{ marginLeft: 'auto', marginBottom: '1rem'}} onClick={toggleToolbarHandler}>
        <ClearIcon />
      </Icon>
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