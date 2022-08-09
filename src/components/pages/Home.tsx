import { Switch } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from 'src/components/App';

export const Home = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <div>
      <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
    </div>
  );
}