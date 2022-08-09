import { PaletteMode, ThemeOptions } from '@mui/material';
import { amber, grey, deepOrange } from '@mui/material/colors';

const themeOptions: ThemeOptions = {};

export const getDesignedTheme = (mode: PaletteMode) => {
  const lightThemeOptions = {
    primary: amber,
    divider: amber[200],
    background: {
      default: amber[50],
      paper: amber[50],
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  };

  const darkThemeOptions = {
    primary: deepOrange,
    divider: deepOrange[700],
    background: {
      default: deepOrange[900],
      paper: deepOrange[900],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
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