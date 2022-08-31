import { SxProps, Theme } from '@mui/material';

export interface Bars {
  toolbar: boolean;
  nodeBar: boolean;
}

export interface IColorModeContext {
  mode?: string;
  toggleColorMode?: () => void;
}

export interface IField {
  name: string;
  type?: string;
  fullWidth?: boolean;
  label: string;
  style?: SxProps<Theme>;
  variant?: 'standard' | 'filled' | 'outlined';
}