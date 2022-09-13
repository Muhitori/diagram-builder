import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice/Elements.slice';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';

import MenuIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

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

  const handleGroupSettings = () => {
    snackbarGenerator.info('Work in progress');
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
        <MenuItem onClick={handleGroupSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Element settings
        </MenuItem>
        <MenuItem onClick={deleteElementHandler}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete Element
        </MenuItem>
      </Menu>
    </div>
  );
};
