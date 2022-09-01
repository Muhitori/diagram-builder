import { Box, Typography } from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { Moveable } from './Moveable';
import { NodeMenu } from './NodeMenu';


export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data }) => {
  const [moveable, setMoveable] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    const node = document.querySelector<HTMLElement>(
      `.react-flow__node[data-id="${id}"]`
    );

    if (node) {
      setMoveable(node);
    }
  };

  return (
    <>
      {moveable && <Moveable node={moveable} />}
      <Box width="100%" height="100%" onClick={handleClick}>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <Typography variant="body2">{data.label}</Typography>
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <NodeMenu nodeId={id} />
      </Box>
    </>
  );
};