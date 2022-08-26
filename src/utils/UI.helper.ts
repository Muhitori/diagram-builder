import { grey } from '@mui/material/colors';

export const getBorderColor = (themeMode: string | undefined) =>
  themeMode === 'light' ? grey[900] : grey[50];

export const getElementBackgroundColor = (color: string | undefined) => color ? color + '88' : 'transparent'; //opacity 0.5