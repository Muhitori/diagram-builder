import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGroup } from 'src/store/slice/Elements.slice';
import { useNavigate } from 'react-router-dom';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';

import MenuIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  groupName: string;
}

export const ElementGroupMenu: FC<Props> = ({ groupName }) => {
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

  const handleGroupSettings = () => {
    snackbarGenerator.info('Work in progress');
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
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          Add element
        </MenuItem>
        <MenuItem onClick={handleGroupSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Group settings
        </MenuItem>
        <MenuItem onClick={deleteGroupHandler}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete group
        </MenuItem>
      </Menu>
    </div>
  );
};