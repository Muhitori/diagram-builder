import { Icon, Paper } from '@mui/material'
import { useStyles } from '../styles';
import ClearIcon from '@mui/icons-material/Clear';
import { setCurrentNodeId } from 'src/store/slice';
import { FC, useCallback, useContext } from 'react';
import { useDispatch} from 'react-redux';
import { Node } from 'react-flow-renderer';
import { NodeInfo } from './NodeInfo';
import { NodeNotFound } from './NodeNotFound';
import { SIDEBAR_ELEVATION } from 'src/utils/UI.constants';
import { ColorModeContext } from 'src/components/App';

interface Props {
  node?: Node;
}

export const ElementDetails: FC<Props> = ({ node }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { mode } = useContext(ColorModeContext);

  const closeElementDetailsHandler = useCallback(() => {
    dispatch(setCurrentNodeId(null));
  }, [dispatch]);

  return (
    <Paper
      elevation={SIDEBAR_ELEVATION}
      sx={{
        backgroundColor:
          mode === 'dark' ? 'rgba(0,0,0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(3px)',
      }}
      className={classes.elementDetails}
    >
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