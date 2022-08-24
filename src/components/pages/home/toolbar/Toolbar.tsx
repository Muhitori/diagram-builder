import { Box, Icon } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ElementGroup } from 'src/components/common/elementGroup/ElementGroup';
import { elementGroupsSelector } from 'src/store/selector/Element.selector';
import { toggleBar } from 'src/store/slice';
import { ToolbarControls } from './ToolbarControls';
import ClearIcon from '@mui/icons-material/Clear';

export const Toolbar = () => {
  const dispatch = useDispatch();

  const elementGroups = useSelector(elementGroupsSelector);

  const toggleToolbarHandler = useCallback(() => {
    dispatch(toggleBar('toolbar'));
  }, [dispatch]);

  return (
    <>
      <Icon
        sx={{ display: 'block', marginLeft: 'auto', marginBottom: '1rem' }}
        onClick={toggleToolbarHandler}
      >
        <ClearIcon />
      </Icon>
      <ToolbarControls />
      <Box display='flex' flexDirection='column'>
        {!!elementGroups.length &&
          elementGroups.map((group) => (
            <ElementGroup key={group.name} group={group} />
          ))}
      </Box>
    </>
  );
}