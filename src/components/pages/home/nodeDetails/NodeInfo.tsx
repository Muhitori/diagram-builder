import { Typography, Box } from '@mui/material';
import { FC } from 'react';
import { Node } from 'react-flow-renderer'
import { useSelector } from 'react-redux';
import { nodeByIdSelector } from 'src/store/selector/Node.selector';
import { roundCoords } from 'src/utils/helpers/math.helper';
import { ConnectedNodes } from './ConnectedNodes';

interface Props {
  node: Node;
}

interface PositionArticleProps {
  label: string;
  x: number;
  y: number;
}

const PositionArticle: FC<PositionArticleProps> = ({ label, x, y}) => {
  return (
    <>
      <Typography variant="h6">{label}:</Typography>
      <Box ml={2}>
        <Typography variant="body2">
          x: {roundCoords(x)}
        </Typography>
        <Typography variant="body2">
          y: {roundCoords(y)}
        </Typography>
      </Box>
    </>
  );
};

export const NodeInfo: FC<Props> = ({ node }) => {
  const parentNode = useSelector(nodeByIdSelector(node.parentNode));

  return (
    <>
      <Typography variant="h4">{node.data.label}</Typography>
      <Box ml={2}>
        {node.parentNode && parentNode && (
          <Typography variant="h6">Parent: {parentNode.data.label}</Typography>
        )}
        <Typography variant="h6">
          Type: {node.type ? node.type : 'default'}
        </Typography>
        <Typography variant="h6">
          Color:{' '}
          {node.style?.backgroundColor
            ? node.style.backgroundColor
            : '#ffffffff'}
        </Typography>
        <PositionArticle
          label="Position"
          x={node.position.x}
          y={node.position.y}
        />
        {node.positionAbsolute && (
          <PositionArticle
            label="Position absolute"
            x={node.positionAbsolute.x}
            y={node.positionAbsolute.y}
          />
        )}
        <ConnectedNodes />
      </Box>
    </>
  );
}