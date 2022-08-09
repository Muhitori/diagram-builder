import { useState, useMemo, createContext } from 'react';
import { Provider } from 'react-redux';
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from '@mui/material';

import { Home } from './pages/Home';

import { store } from 'src/store';
import { getDesignedTheme } from 'src/theme';
import { IColorModeContext } from 'src/types/UI';

export const ColorModeContext = createContext<IColorModeContext>({});

export const App = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignedTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  );



};