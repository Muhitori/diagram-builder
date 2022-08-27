import { Typography, Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { currentNodeEdgesSelector } from 'src/store/selector/Node.selector';


interface ConnectedNodeProps {
  label: string;
  name: string;
}

const ConnectedNode: FC<ConnectedNodeProps> = ({ label, name }) => {
  return name ? (
    <Typography>
      {label}: {name}
    </Typography>
  ) : null;
};

export const ConnectedNodes = () => {
  const nodeEdges = useSelector(currentNodeEdgesSelector);

  return nodeEdges.length ? (
    <>
      <Typography variant="h6">Connected nodes:</Typography>
      <Box ml={2}>
        {nodeEdges.map(({ key, label, name }) => <ConnectedNode key={key} label={label} name={name} />)}
      </Box>
    </>
  ) : null;
};