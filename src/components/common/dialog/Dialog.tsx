import { FC, ReactNode } from 'react';
import {
  Box,
  Breakpoint,
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Clear';

interface Props {
  title: string;
  children: ReactNode;
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  size?: Breakpoint;
  submitButtonName?: string;
}

export const Dialog: FC<Props> = ({
  title,
  children,
  open,
  onSubmit,
  onClose,
  size,
  submitButtonName,
}) => {
  return (
    <MuiDialog open={open} onClose={onClose} fullWidth maxWidth={size || 'sm'}>
      <DialogTitle
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="h6">{title}</Typography>
        <Icon onClick={onClose}>
          <CloseIcon />
        </Icon>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          pl={5}
          pr={5}
        >
          <Button onClick={onClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained" color="success">
            {submitButtonName || 'OK'}
          </Button>
        </Box>
      </DialogActions>
    </MuiDialog>
  );
};
