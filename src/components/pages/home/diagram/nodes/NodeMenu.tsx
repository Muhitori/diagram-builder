import { MenuItem, Menu, Box } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentNodeSelector } from 'src/store/selector/Node.selector';
import { setCurrentNodeId, deleteNode } from 'src/store/slice';

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
    
    const mouseX = event.clientX + 2;
    const mouseY = event.clientY - 6;

    setContextMenu(
      contextMenu === null
        ? { mouseX, mouseY } : null
    );
  };

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleNodeSelect = () => {
    dispatch(setCurrentNodeId(nodeId));
    handleMenuClose();
  };

  const handleNodeDeselect = () => {
    dispatch(setCurrentNodeId(null));
    handleMenuClose();
  };

  const handleNodeDelete = () => {
    dispatch(deleteNode(nodeId));
    handleMenuClose();
  };

  const nodeBarOption = useMemo(() => {
    return currentNode ? (
      <MenuItem onClick={handleNodeDeselect}>Close node info</MenuItem>
    ) : (
      <MenuItem onClick={handleNodeSelect}>Show node info</MenuItem>
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
      >
        {nodeBarOption}
        <MenuItem onClick={handleNodeDelete}>Delete node</MenuItem>
      </Menu>
    </Box>
  );
};