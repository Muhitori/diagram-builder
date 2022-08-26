import { useState, useMemo, createContext } from 'react';
import { Provider } from 'react-redux';
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from '@mui/material';

import { Home } from './pages/home/Home';

import { store } from 'src/store';
import { getDesignedTheme } from 'src/theme';
import { IColorModeContext } from 'src/types/UI';
import { Layout } from './layout/Layout';
import { SnackbarGenerator } from './SnackbarGenerator';
import { SnackbarProvider } from 'notistack';
import { MAX_SNACK } from 'src/utils/UI.constants';

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
          <SnackbarProvider maxSnack={MAX_SNACK}>
            <SnackbarGenerator />
            <CssBaseline />
            <Layout>
              <Home />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  );



};