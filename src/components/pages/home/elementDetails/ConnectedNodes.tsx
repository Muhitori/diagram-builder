import { Typography, Box } from '@mui/material';
import { FC, useCallback } from 'react';
import { Edge } from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import { currentNodeEdgesSelector, nodesSelector } from 'src/store/selector/Node.selector';

interface Props {
  currentNodeId: string;
}

interface ConnectedNodeProps {
  name: string;
}

const Output: FC<ConnectedNodeProps> = ({ name }) => {
  return name ? <Typography>Output: {name}</Typography> : null;
};

const Input: FC<ConnectedNodeProps> = ({ name }) => {
  return name ? <Typography>Input: {name}</Typography> : null;
};

export const ConnectedNodes: FC<Props> = ({ currentNodeId }) => {
  const nodeEdges = useSelector(currentNodeEdgesSelector);
  const nodes = useSelector(nodesSelector);

  const getName = useCallback(
    (id: string) => {
      const connectedNode = nodes.find((node) => node.id === id);
      return connectedNode?.data.label;
    },
    [nodes]
  );

  const renderConnectedNode = (edge: Edge) => {
    if (currentNodeId === edge.source) {
      return <Output key={'output' + edge.target} name={getName(edge.target)} />;
    }
    return <Input key={'input' + edge.source} name={getName(edge.source)} />;
  }

  return nodeEdges.length ? (
    <>
      <Typography variant="h6">Connected nodes:</Typography>
      <Box ml={2}>
        {nodeEdges.map((edge) => renderConnectedNode(edge))}
      </Box>
    </>
  ) : null;
};