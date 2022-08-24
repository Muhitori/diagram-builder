import { grey } from '@mui/material/colors';

export const getBorderColor = (themeMode: string | undefined) =>
  themeMode === 'light' ? grey[900] : grey[50];