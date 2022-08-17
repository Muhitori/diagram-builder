import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { IElementGroup } from 'src/types/Elements';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';
import { deleteGroup } from 'src/store/slice';
import { Element } from 'src/components/common/element/Element';
import { useStyles } from './styles';

interface Props {
  group: IElementGroup;
}

export const ElementGroup: FC<Props> = ({ group: { id, name, elements } }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteGroupHandler = () => {
    dispatch(deleteGroup(id));
  }

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{name}</Typography>

        <Box display="flex">
          <AddIcon />
          <div className={classes.icon} onClick={deleteGroupHandler}>
            <DeleteIcon />
          </div>
        </Box>
      </Box>

      <div className={classes.elements}>
        {!!elements.length &&
          elements.map((element) => (
            <Element key={element.id} groupId={id} element={element} />
          ))}
      </div>
    </div>
  );
};