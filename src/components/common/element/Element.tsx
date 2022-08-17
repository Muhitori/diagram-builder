import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice';
import { IElement } from 'src/types/Elements';

import ClearIcon from '@mui/icons-material/Clear';
import { useStyles } from './styles';
import { Typography } from '@mui/material';
import { Icon } from '../Icon/Icon';

interface Props {
  groupName: string;
  element: IElement;
}

export const Element: FC<Props> = ({ groupName, element: { id, name } }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteElementHandler = () => {
    dispatch(deleteElement({ groupName, id }));
  };

  return (
    <div className={classes.root}>
      <div draggable className={classes.element}>
        <Typography variant="body2">{name}</Typography>
      </div>

      <Icon onClick={deleteElementHandler}>
        <ClearIcon />
      </Icon>
    </div>
  );
};