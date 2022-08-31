import { Typography } from '@mui/material';
import { FC } from 'react'
import { Handle, NodeProps, Position } from 'react-flow-renderer'

export const DefaultNode: FC<NodeProps> = ({ isConnectable, data }) => {
  return (
    <>
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
    </>
  );
};