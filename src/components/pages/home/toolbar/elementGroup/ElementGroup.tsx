import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { IElementGroup } from 'src/types/Elements';
import { Element } from 'src/components/pages/home/toolbar/element/Element';
import { useStyles } from './styles';
import { ElementGroupMenu } from './ElementGroupMenu';

interface Props {
  group: IElementGroup;
}

export const ElementGroup: FC<Props> = ({ group: { name, elements } }) => {
  const classes = useStyles();

  return (
    <Box sx={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{name}</Typography>
        <ElementGroupMenu groupName={name} />
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