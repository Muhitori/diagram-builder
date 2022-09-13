import { MenuItem, Menu, Box, Typography } from '@mui/material';
import { FC, MouseEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentNodeSelector } from 'src/store/selector/Node.selector';
import { setCurrentNodeId, deleteNode } from 'src/store/slice';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  nodeId: string;
}

export const NodeMenu: FC<Props> = ({ nodeId }) => {
  const dispatch = useDispatch();
  const currentNode = useSelector(currentNodeSelector);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const open = Boolean(contextMenu);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    //close node info when context menu opened
    dispatch(setCurrentNodeId(null));

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    setContextMenu(contextMenu === null ? { mouseX, mouseY } : null);
  };

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleNodeSelect = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(setCurrentNodeId(nodeId));
    handleMenuClose();
  };

  const handleNodeDeselect = (event: MouseEvent) => {
    event.preventDefault();
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
    console.log('node settings modal opened');
    handleMenuClose();
  };

  const nodeBarOption = useMemo(() => {
    return currentNode ? (
      <MenuItem onClick={handleNodeDeselect}>
        <VisibilityOffIcon />
        <Typography sx={{ ml: 1 }}>Close node info</Typography>
      </MenuItem>
    ) : (
      <MenuItem onClick={handleNodeSelect}>
        <VisibilityIcon />
        <Typography sx={{ ml: 1 }}>Show node info</Typography>
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
          <SettingsIcon />
          <Typography sx={{ ml: 1 }}>Node settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleNodeDelete}>
          <DeleteIcon />
          <Typography sx={{ ml: 1 }}>Delete node</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};