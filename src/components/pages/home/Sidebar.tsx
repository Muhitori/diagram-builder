import { Grid } from '@mui/material';
import { FC, ReactElement, useMemo } from 'react';

interface Props {
  opened: boolean;
  size: number;
  children: ReactElement;
}
export const Sidebar: FC<Props> = ({ opened, size, children }) => {

  const renderedSidebar = useMemo(
    () => (
      <Grid item sm={size} md={size} lg={size}>
        {children}
      </Grid>
    ),
    []
  );

  return opened ? renderedSidebar : null;
};