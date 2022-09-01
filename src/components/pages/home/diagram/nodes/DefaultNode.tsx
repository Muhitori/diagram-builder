import { Box, Typography } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { Moveable } from './Moveable';
import { NodeMenu } from './NodeMenu';


export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data, selected }) => {
  const [moveable, setMoveable] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (selected && !moveable) {
      const node = document.querySelector<HTMLElement>(
        `.react-flow__node[data-id="${id}"]`
      );

      if (node) {
        setMoveable(node);
      }
    }

    if (!selected) {
      setMoveable(null);
    }
  }, [selected])

  return (
    <>
      {moveable && <Moveable node={moveable} id={id} />}
      <Box width="100%" height="100%">
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <Typography variant="body2">{data.label}</Typography>
        <Handle
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