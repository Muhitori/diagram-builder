import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice/Elements.slice';

import MenuIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { EDIT_ELEMENT_ROUTE } from 'src/utils/constants/route.constants';
import { setModalData } from 'src/store/slice/UI.slice';

interface Props {
  id: string;
  groupName: string;
  name: string;
  color: string | undefined;
}

export const ElementMenu: FC<Props> = ({ id, groupName, name, color }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleElementSettings = () => {
    navigate(
      `${EDIT_ELEMENT_ROUTE}?elementName=${name}&groupName=${groupName}&elementId=${id}`
    );
    dispatch(setModalData({ name: 'element', data: { name, color } }));
    handleClose();
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
        <MenuItem onClick={handleElementSettings}>
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
