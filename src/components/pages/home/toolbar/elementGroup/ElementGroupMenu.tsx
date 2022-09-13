import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGroup } from 'src/store/slice/Elements.slice';

import MenuIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface Props {
  groupName: string;
}

export const ElementMenu: FC<Props> = ({ groupName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openElementCreationModal = () => {
    navigate(`/element-add-modal`);
    handleClose();
  }

  const deleteGroupHandler = () => {
    dispatch(deleteGroup(groupName));
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={openElementCreationModal}>
          <AddIcon />
          <Typography sx={{ ml: 1 }}>Add element</Typography>
        </MenuItem>
        <MenuItem onClick={deleteGroupHandler}>
          <DeleteIcon />
          <Typography sx={{ ml: 1 }}>Delete group</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};