import { Icon } from '@mui/material'
import { setCurrentNodeId, toggleBar } from 'src/store/slice';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NodeInfo } from './NodeInfo';
import { NodeNotFound } from './NodeNotFound';
import { currentNodeSelector } from 'src/store/selector/Node.selector';

import ClearIcon from '@mui/icons-material/Clear';

export const NodeDetails: FC = () => {
  const dispatch = useDispatch();
  const node = useSelector(currentNodeSelector);

  const closeElementDetailsHandler = useCallback(() => {
    dispatch(toggleBar('nodeBar'));
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