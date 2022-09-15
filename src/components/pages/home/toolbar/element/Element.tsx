import { DragEvent, FC, useContext, useMemo } from 'react';
import { IElement } from 'src/types/Elements';

import { useStyles } from './styles';
import { Box, Typography } from '@mui/material';
import { ColorModeContext } from 'src/components/App';
import { getBorderColor, getElementBackgroundColor } from 'src/utils/helpers/UI.helper';
import { ElementMenu } from './ElementMenu';
import { ElementFormData } from 'src/types/Forms';
import { EditElementModal } from 'src/components/common/modals/elementModal/editElementModal';

interface Props {
  groupName: string;
  element: IElement;
  generalOptions: Partial<ElementFormData>;
}

export const Element: FC<Props> = ({ groupName, generalOptions, element: { id, name, color } }) => {
  const classes = useStyles();
  const { name: prefix, color: groupColor } = generalOptions;

  const { mode } = useContext(ColorModeContext);

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('groupName', groupName);
    event.dataTransfer.setData('id', id);
  }

  const borderColor = useMemo(() => getBorderColor(mode), [mode]);

  //Adding opacity 0.5
  const backgroundColor = useMemo(() => {
    const elementColor = color || groupColor;
    return getElementBackgroundColor(elementColor);
  }, [color, groupColor]);

  const elementName = useMemo(() => prefix ? `${prefix}-${name}` : name, [prefix, name]);

  return (
    <Box sx={{ ...classes.root }}>
      <Box
        sx={{ ...classes.element, borderColor, backgroundColor }}
        draggable
        onDragStart={handleDragStart}
      >
        <Typography variant="body2">{elementName}</Typography>
      </Box>

      <ElementMenu id={id} groupName={groupName} />
      <EditElementModal
        key={id}
        groupName={groupName}
        elementId={id}
        elementName={name}
        values={{ name, color }}
      />
    </Box>
  );
};