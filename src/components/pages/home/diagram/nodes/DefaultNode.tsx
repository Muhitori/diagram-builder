import { Typography } from '@mui/material';
import { FC } from 'react'
import { Handle, NodeProps, Position } from 'react-flow-renderer';


interface CustomProps {
  nodeContextMenuHandler: (id: string) => void
}

type Props = NodeProps & CustomProps;
  
export const DefaultNode: FC<Props> = (props) => {
  const { id, isConnectable, data, nodeContextMenuHandler } = props;

  return (
    <div onContextMenu={(event) => {
      event.preventDefault();
      nodeContextMenuHandler(id);
    }}>
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
    </div>
  );
};