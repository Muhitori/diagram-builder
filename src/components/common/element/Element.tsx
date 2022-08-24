import { DragEvent, FC, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteElement } from 'src/store/slice';
import { IElement } from 'src/types/Elements';

import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from './styles';
import { Box, Icon, Typography } from '@mui/material';
import { ColorModeContext } from 'src/components/App';
import { getBorderColor } from 'src/utils/UI.helper';

interface Props {
  groupName: string;
  element: IElement;
}

export const Element: FC<Props> = ({ groupName, element: { id, name } }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { mode } = useContext(ColorModeContext);

  const deleteElementHandler = () => {
    dispatch(deleteElement({ groupName, id }));
  };

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('groupName', groupName);
    event.dataTransfer.setData('id', id);
  }

  const borderColor = useMemo(() => getBorderColor(mode),[mode]);

  return (
    <Box sx={classes.root}>
      <Box
        sx={{ ...classes.element, borderColor }}
        draggable
        onDragStart={handleDragStart}
      >
        <Typography variant="body2">{name}</Typography>
      </Box>

      <Icon onClick={deleteElementHandler}>
        <DeleteIcon />
      </Icon>
    </Box>
  );
};