import { Box, Typography } from '@mui/material';
import { FC, useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { Moveable } from './Moveable';
import { NodeMenu } from './NodeMenu';
import { v4 as uuid } from 'uuid';
import { grey } from '@mui/material/colors';
import { ColorModeContext } from 'src/components/App';


export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data, selected }) => {
  const { mode } = useContext(ColorModeContext);

  const nodeRef = useRef<HTMLElement | null>(null);
  const [visibleNode, setVisibleNode] = useState<HTMLElement | null>(null);

  const node = document.querySelector<HTMLElement>(
    `.react-flow__node[data-id="${id}"]`
  );

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

  const color = useMemo(
    () => (mode === 'light' ? grey[900] : grey[50]),
    [mode]
  );

  return (
    <>
      {visibleNode && <Moveable node={visibleNode} id={id} />}
      <Box
        ref={nodeRef}
        width={node?.style.width || '100%'}
        height={node?.style.height || '100%'}
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