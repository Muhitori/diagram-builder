import { Typography } from '@mui/material';
import { FC } from 'react'
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { NodeMenu } from './NodeMenu';

export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data }) => {
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
      <NodeMenu nodeId={id} />
    </>
  );
};