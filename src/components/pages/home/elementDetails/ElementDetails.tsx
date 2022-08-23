import { Icon, Paper } from '@mui/material'
import { useStyles } from '../styles';
import ClearIcon from '@mui/icons-material/Clear';
import { setCurrentNodeId } from 'src/store/slice';
import { FC, useCallback } from 'react';
import { useDispatch} from 'react-redux';
import { Node } from 'react-flow-renderer';
import { NodeInfo } from './NodeInfo';
import { NodeNotFound } from './NodeNotFound';

interface Props {
  node?: Node;
}

export const ElementDetails: FC<Props> = ({ node }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const closeElementDetailsHandler = useCallback(() => {
    dispatch(setCurrentNodeId(null));
  }, [dispatch]);

  return (
    <Paper className={classes.elementDetails}>
      <Icon
        sx={{ display: 'block', marginLeft: 'auto' }}
        onClick={closeElementDetailsHandler}
      >
        <ClearIcon />
      </Icon>
      {node ? <NodeInfo node={node} /> : <NodeNotFound />}
    </Paper>
  );
};