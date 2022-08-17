import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGroup } from 'src/store/slice';

export const ToolbarControls = () => {
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState('');

  const changeHandler = (value: string) => {
    setGroupName(value);
  }

  const addGroupHandler = () => {
    const name = groupName.trim();

    if (name) {
      dispatch(addGroup(name));
      setGroupName('');
    }
  }

  const onKeyDown = (keyName: string) => {
    if (keyName === 'Enter') {
      addGroupHandler();
    }
  }

  return (
    <Box display="flex" justifyContent="space-between" mb={1}>
      <TextField
        placeholder="Group name"
        variant="standard"
        size="medium"
        value={groupName}
        onChange={(event) => changeHandler(event.target.value)}
        onKeyDown={(event) => onKeyDown(event.key)}
      />
      <Button onClick={addGroupHandler} variant="contained">
        Add group
      </Button>
    </Box>
  );
}