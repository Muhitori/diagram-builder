import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice';
import { IElement } from 'src/types/Elements';

import ClearIcon from '@mui/icons-material/Clear';
import { useStyles } from './styles';
import { Typography } from '@mui/material';

interface Props {
  groupId: string;
  element: IElement;
}

export const Element: FC<Props> = ({ groupId, element: { id, name } }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteElementHandler = () => {
    dispatch(deleteElement({ groupId, id }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.element}>
        <Typography variant="body2">{name}</Typography>
      </div>

      <div className={classes.icon} onClick={deleteElementHandler}>
        <ClearIcon />
      </div>
    </div>
  );
};