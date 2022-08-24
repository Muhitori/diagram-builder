import { Box, Paper, Slide } from '@mui/material';
import { FC, MutableRefObject, ReactElement, useContext, useMemo } from 'react';
import { ColorModeContext } from 'src/components/App';
import { SIDEBAR_ELEVATION } from 'src/utils/UI.constants';

interface Props {
  opened: boolean;
  side: 'left' | 'right';
  children: ReactElement;
  parentRef?: MutableRefObject<HTMLDivElement | null>;
}
export const Sidebar: FC<Props> = ({ opened, side, children, parentRef }) => {
  const { mode } = useContext(ColorModeContext);
  
  const direction = useMemo(() => (side === 'left' ? 'right' : 'left'), []);
  const backgroundColor = useMemo(
    () => (mode === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'),
    [mode]
  );

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
        <Paper
          elevation={SIDEBAR_ELEVATION}
          sx={{
            width: '100%',
            height: '100%',
            p: 1,
            backgroundColor,
            backdropFilter: 'blur(3px)',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Slide>
  );
};