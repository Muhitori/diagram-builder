import { Icon, Paper } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ElementGroup } from 'src/components/common/elementGroup/ElementGroup';
import { elementGroupsSelector } from 'src/store/selector/Element.selector';
import { toggleBar } from 'src/store/slice';
import { useStyles } from './styles';
import { ToolbarControls } from './ToolbarControls';
import ClearIcon from '@mui/icons-material/Clear';
import { SIDEBAR_ELEVATION } from 'src/utils/UI.constants';
import { ColorModeContext } from 'src/components/App';

export const Toolbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { mode } = useContext(ColorModeContext);

  const elementGroups = useSelector(elementGroupsSelector);

  const toggleToolbarHandler = useCallback(() => {
    dispatch(toggleBar('toolbar'));
  }, [dispatch]);

  return (
    <Paper
      elevation={SIDEBAR_ELEVATION}
      className={classes.root}
      sx={{
        backgroundColor:
          mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(3px)',
      }}
    >
      <Icon
        sx={{ display: 'block', marginLeft: 'auto', marginBottom: '1rem' }}
        onClick={toggleToolbarHandler}
      >
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