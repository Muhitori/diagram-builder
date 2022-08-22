import { Paper } from '@mui/material'
import { Icon } from 'src/components/common/Icon/Icon';
import { useStyles } from './styles';
import ClearIcon from '@mui/icons-material/Clear';
import { toggleBar } from 'src/store/slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const ElementDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleElementDetailsHandler = useCallback(() => {
    dispatch(toggleBar('elementBar'));
  }, [dispatch]);

  return (
    <Paper className={classes.sidebar}>
      <Icon
        style={{ marginLeft: 'auto', marginBottom: '1rem' }}
        onClick={toggleElementDetailsHandler}
      >
        <ClearIcon />
      </Icon>
    </Paper>
  );
}