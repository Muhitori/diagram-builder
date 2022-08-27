import { Icon } from '@mui/material'
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

export const NodeDetails: FC<Props> = ({ node }) => {
  const dispatch = useDispatch();

  const closeElementDetailsHandler = useCallback(() => {
    dispatch(setCurrentNodeId(null));
  }, [dispatch]);

  return (
    <>
      <Icon
        sx={{ display: 'block', marginLeft: 'auto' }}
        onClick={closeElementDetailsHandler}
      >
        <ClearIcon />
      </Icon>
      {node ? <NodeInfo node={node} /> : <NodeNotFound />}
    </>
  );
};