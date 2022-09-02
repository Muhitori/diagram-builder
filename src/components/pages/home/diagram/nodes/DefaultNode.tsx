import { Box, Typography } from '@mui/material';
import { FC, useState, useEffect, useRef } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { Moveable } from './Moveable';
import { NodeMenu } from './NodeMenu';
import { v4 as uuid } from 'uuid';


export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data, selected }) => {
  const nodeRef = useRef<HTMLElement | null>(null);
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
      <Box
        ref={nodeRef}
        // width="100%"
        // height="100%"
        // border="1px solid black"
        // color={grey[900]}
        // display='flex'
        // alignItems='flex-start'
        // justifyContent='center'
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