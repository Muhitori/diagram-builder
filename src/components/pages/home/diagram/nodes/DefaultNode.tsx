import { Box, Typography } from '@mui/material';
import { FC, useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { Moveable } from './Moveable';
import { NodeMenu } from './NodeMenu';
import { v4 as uuid } from 'uuid';
import { grey } from '@mui/material/colors';
import { ColorModeContext } from 'src/components/App';
import { useSelector } from 'react-redux';
import { nodeSizesSelector } from 'src/store/selector/Node.selector';


export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data, selected }) => {
  const { width, height, children } = useSelector(nodeSizesSelector(id));
  const { mode } = useContext(ColorModeContext);

  const nodeRef = useRef<HTMLElement | null>(null);
  const [visibleNode, setVisibleNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (selected && !visibleNode) {
      if (nodeRef.current) {
        setVisibleNode(nodeRef.current);
      }
    }

    if (!selected) {
      setVisibleNode(null);
    }
  }, [selected]);

  //fires on adding children to node (width & height are changed)
  useEffect(() => {
    if (nodeRef.current && width && height) {
      nodeRef.current.style.width = width + 'px';
      nodeRef.current.style.height = height + 'px';
      nodeRef.current.style.transform = 'rotate(0deg)';
    }
  }, [width, height]);

  const color = useMemo(
    () => (mode === 'light' ? grey[900] : grey[50]),
    [mode]
  );

  return (
    <>
      {visibleNode && (
        <Moveable
          node={visibleNode}
          id={id}
          hasChildren={children.width > 0 && children.height > 0}
        />
      )}
      <Box
        ref={nodeRef}
        width={'100%'}
        height={'100%'}
        border={`1px solid ${color}`}
        borderRadius="3px"
        color={color}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Handle
          id={uuid()}
          type="target"
          position={Position.Top}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <Typography variant="body2">{data.label}</Typography>
        <Handle
          id={uuid()}
          type="source"
          position={Position.Bottom}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <NodeMenu nodeId={id} />
      </Box>
    </>
  );
};