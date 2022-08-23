import { Box, Slide } from '@mui/material';
import { FC, MutableRefObject, ReactElement, useMemo } from 'react';

interface Props {
  opened: boolean;
  side: 'left' | 'right';
  children: ReactElement;
  parentRef?: MutableRefObject<HTMLDivElement | null>;
}
export const Sidebar: FC<Props> = ({ opened, side, children, parentRef }) => {
  const direction = useMemo(() => (side === 'left' ? 'right' : 'left'), []);

  return (
    <Slide
      container={parentRef?.current}
      direction={direction}
      in={opened}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          [side]: 0,
          height: '100%',
          width: '400px',
          zIndex: 1000,
        }}
        p={1}
      >
        {children}
      </Box>
    </Slide>
  );
};