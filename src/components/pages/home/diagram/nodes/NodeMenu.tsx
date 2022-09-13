import { MenuItem, Menu, Box, ListItemIcon } from '@mui/material';
import { FC, MouseEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentNodeSelector } from 'src/store/selector/Node.selector';
import { setCurrentNodeId, deleteNode, toggleBar } from 'src/store/slice';
import { barOpenedSelector } from 'src/store/selector/UI.selector';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  nodeId: string;
}

export const NodeMenu: FC<Props> = ({ nodeId }) => {
  const dispatch = useDispatch();
  const nodeInfoOpened = useSelector(barOpenedSelector('nodeBar'));
  const currentNode = useSelector(currentNodeSelector);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const open = Boolean(contextMenu);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (nodeInfoOpened) {
      dispatch(setCurrentNodeId(nodeId));
    }
      
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    setContextMenu(contextMenu === null ? { mouseX, mouseY } : null);
  };

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleNodeInfoOpen = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(toggleBar('nodeBar'));
    dispatch(setCurrentNodeId(nodeId));
    handleMenuClose();
  };

  const handleNodeInfoClose = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(toggleBar('nodeBar'));
    dispatch(setCurrentNodeId(null));
    handleMenuClose();
  };

  const handleNodeDelete = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(deleteNode(nodeId));
    handleMenuClose();
  };

  const handleNodeSettings = (event: MouseEvent) => {
    event.preventDefault();
    snackbarGenerator.info('Work in progress');
    handleMenuClose();
  };

  const nodeBarOption = useMemo(() => {
    return currentNode ? (
      <MenuItem onClick={handleNodeInfoClose}>
        <ListItemIcon>
          <VisibilityOffIcon />
        </ListItemIcon>
        Close node info
      </MenuItem>
    ) : (
      <MenuItem onClick={handleNodeInfoOpen}>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        Show node info
      </MenuItem>
    );
  }, [currentNode]);

  return (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      onContextMenu={handleMenuOpen}
    >
      <Menu
        open={open}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        onClick={(event) => event.stopPropagation()}
      >
        {nodeBarOption}
        <MenuItem onClick={handleNodeSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Node settings
        </MenuItem>
        <MenuItem onClick={handleNodeDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete node
        </MenuItem>
      </Menu>
    </Box>
  );
};