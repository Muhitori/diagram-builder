import { DragEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteElement } from 'src/store/slice';
import { IElement } from 'src/types/Elements';

import ClearIcon from '@mui/icons-material/Clear';
import { useStyles } from './styles';
import { Typography } from '@mui/material';
import { Icon } from '../Icon/Icon';
import { elementSelector } from 'src/store/selector/Element.selector';

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

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('groupName', groupName);
    event.dataTransfer.setData('id', id);
  }

  return (
    <div className={classes.root}>
      <div className={classes.element} draggable onDragStart={handleDragStart}>
        <Typography variant="body2">{name}</Typography>
      </div>

      <Icon onClick={deleteElementHandler}>
        <ClearIcon />
      </Icon>
    </div>
  );
};