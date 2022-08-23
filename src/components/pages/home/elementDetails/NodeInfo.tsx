import { Typography, Box } from '@mui/material';
import { FC } from 'react';
import { Node } from 'react-flow-renderer'
import { roundCoords } from 'src/utils/math.helper';
import { ConnectedNodes } from './ConnectedNodes';

interface Props {
  node: Node;
}

export const NodeInfo: FC<Props> = ({ node }) => {
  return (
    <>
      <Typography variant="h4">{node.data.label}</Typography>
      <Box ml={2}>
        {node.parentNode && (
          <Typography variant="h6">Parent: {node.parentNode}</Typography>
        )}
        <Typography variant="h6">
          Type: {node.type ? node.type : 'default'}
        </Typography>
        <Typography variant="h6">
          Color: {node.style?.color ? node.style.color : '#FFF'}
        </Typography>
        <Typography variant="h6">Position: </Typography>
        <Box ml={2}>
          <Typography variant="body2">
            x: {roundCoords(node.position.x)}
          </Typography>
          <Typography variant="body2">
            y: {roundCoords(node.position.y)}
          </Typography>
        </Box>
        <ConnectedNodes currentNodeId={node.id} />
      </Box>
    </>
  );
}