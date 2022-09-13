import { PaletteMode, PaletteOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

export const getDesignedTheme = (mode: PaletteMode) => {
  const lightThemeOptions: PaletteOptions = {
    primary: grey,
    divider: grey[200],
    background: {
      default: grey[50],
      paper: grey[100],
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  };

  const darkThemeOptions: PaletteOptions = {
    primary: grey,
    divider: grey[700],
    background: {
      default: grey[600],
      paper: grey[900],
    },
    text: {
      primary: grey[50],
      secondary: grey[300],
    },
  };

  const tokens = mode === 'light' ? lightThemeOptions : darkThemeOptions;

  return {
    palette: {
      mode,
      ...tokens,
    },
  };
};