import { DragEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice';
import { IElement } from 'src/types/Elements';

import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from './styles';
import { Icon, Typography } from '@mui/material';

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
        <DeleteIcon />
      </Icon>
    </div>
  );
};