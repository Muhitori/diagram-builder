import { DragEvent, FC, useContext, useMemo } from 'react';
import { IElement } from 'src/types/Elements';

import { useStyles } from './styles';
import { Box, Typography } from '@mui/material';
import { ColorModeContext } from 'src/components/App';
import { getBorderColor, getElementBackgroundColor } from 'src/utils/UI.helper';
import { ElementMenu } from './ElementMenu';

interface Props {
  groupName: string;
  element: IElement;
}

export const Element: FC<Props> = ({ groupName, element: { id, name, color } }) => {
  const classes = useStyles();

  const { mode } = useContext(ColorModeContext);

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('groupName', groupName);
    event.dataTransfer.setData('id', id);
  }

  const borderColor = useMemo(() => getBorderColor(mode), [mode]);

  //Adding opacity 0.5
  const backgroundColor = useMemo(() => getElementBackgroundColor(color), [color]);

  return (
    <Box sx={{ ...classes.root }}>
      <Box
        sx={{ ...classes.element, borderColor, backgroundColor }}
        draggable
        onDragStart={handleDragStart}
      >
        <Typography variant="body2">{name}</Typography>
      </Box>

      <ElementMenu id={id} groupName={groupName} />
    </Box>
  );
};