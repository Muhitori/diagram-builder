import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice/Elements.slice';

import MenuIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: string;
  groupName: string;
}

export const ElementMenu: FC<Props> = ({ id, groupName }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteElementHandler = () => {
    dispatch(deleteElement({ groupName, id }));
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={deleteElementHandler}>
          <DeleteIcon />
          <Typography sx={{ ml: 1 }}>Delete Element</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
