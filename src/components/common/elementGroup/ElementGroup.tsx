import { Box, Icon, Typography } from '@mui/material';
import { FC } from 'react';
import { IElementGroup } from 'src/types/Elements';
import { useDispatch } from 'react-redux';
import { deleteGroup } from 'src/store/slice';
import { Element } from 'src/components/common/element/Element';
import { useStyles } from './styles';
import { AddElementFlow } from '../addElementFlow/AddElementFlow';

import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  group: IElementGroup;
}

export const ElementGroup: FC<Props> = ({ group: { name, elements } }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const deleteGroupHandler = () => {
    dispatch(deleteGroup(name));
  }

  return (
    <Box sx={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{name}</Typography>

        <Box display="flex">
          <AddElementFlow groupName={name} />
          <Icon onClick={deleteGroupHandler}>
            <DeleteIcon />
          </Icon>
        </Box>
      </Box>

      <Box sx={classes.elements}>
        {!!elements.length &&
          elements.map((element) => (
            <Element key={element.id} groupName={name} element={element} />
          ))}
      </Box>
    </Box>
  );
};