import { PaletteMode, ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';

const themeOptions: ThemeOptions = {};

export const getDesignedTheme = (mode: PaletteMode) => {
  const lightThemeOptions = {
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

  const darkThemeOptions = {
    primary: grey,
    divider: grey[700],
    background: {
      default: grey[600],
      paper: grey[900],
    },
    text: {
      primary: '#fff',
      secondary: grey[300],
    },
  };

  const tokens = mode === 'light' ? lightThemeOptions : darkThemeOptions;

  return {
    ...themeOptions,
    palette: {
      mode,
      ...themeOptions.palette,
      ...tokens,
    },
  };
};