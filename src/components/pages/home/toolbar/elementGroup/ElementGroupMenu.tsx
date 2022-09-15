import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroup } from 'src/store/slice/Elements.slice';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { ADD_ELEMENT_ROUTE, EDIT_GROUP_ROUTE } from 'src/utils/constants/route.constants';
import { groupSelector } from 'src/store/selector/Element.selector';

interface Props {
  groupName: string;
}

export const ElementGroupMenu: FC<Props> = ({ groupName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const group = useSelector(groupSelector(groupName));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openElementCreationModal = () => {
    navigate(`${ADD_ELEMENT_ROUTE}`);
    handleClose();
  }

  const handleGroupSettings = () => {
    // dispatch(setElementModalData(group.generalOptions));
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