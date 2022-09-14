import { MenuItem, Menu, Box, ListItemIcon } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentNodeSelector } from 'src/store/selector/Node.selector';
import { setCurrentNodeId, deleteNode, toggleBar, setElementModalData } from 'src/store/slice';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { EDIT_NODE_ROUTE } from 'src/utils/constants/route.constants';
import { barOpenedSelector } from 'src/store/selector/UI.selector';

interface Props {
  nodeId: string;
}

export const NodeMenu: FC<Props> = ({ nodeId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNodeBarOpened = useSelector(barOpenedSelector('nodeBar'));
  const currentNode = useSelector(currentNodeSelector);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const open = Boolean(contextMenu);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setCurrentNodeId(nodeId));
      
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    setContextMenu(contextMenu === null ? { mouseX, mouseY } : null);
  };

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleNodeInfoOpen = () => {
    dispatch(toggleBar('nodeBar'));

    handleMenuClose();
  };

  const handleNodeInfoClose = () => {
    dispatch(toggleBar('nodeBar'));
    dispatch(setCurrentNodeId(null));

    handleMenuClose();
  };

  const handleNodeDelete = () => {
    dispatch(deleteNode(nodeId));

    handleMenuClose();
  };

  const handleNodeSettings = () => {
    if (!currentNode?.data) {
      snackbarGenerator.error('Please select node to edit.');
      return;
    }

    const name = currentNode.data.label;
    const colorWithAlpha = currentNode.data.backgroundColor;
    console.log(colorWithAlpha);
    const color = colorWithAlpha.substring(0, colorWithAlpha.length - 2);

    navigate(`${EDIT_NODE_ROUTE}?nodeName=${name}`);
    dispatch(setElementModalData({ name, color }));

    handleMenuClose();
  };

  const nodeBarOption = useMemo(() => {
    return isNodeBarOpened ? (
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