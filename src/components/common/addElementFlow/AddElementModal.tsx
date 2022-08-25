import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Typography } from '@mui/material';
import { FC, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { addElement } from 'src/store/slice';
import { Form } from '../form/Form';
import { FormikProps } from 'formik';
import { IField } from 'src/types/UI';

interface AddElementFields {
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  groupName: string;
}

const initialValues = {
  name: ''
};

const fields: IField[] = [
  { name: 'name', label: 'Element name', fullWidth: true }
];

export const AddElementModal: FC<Props> = ({ groupName, open, onClose }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<AddElementFields>>(null);

  const handleAddElement = (data: AddElementFields) => {
    const { name } = data;
    const elementName = name.trim();

    if (elementName) {
      dispatch(addElement({ groupName, name: elementName }));
      onClose();
    }
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        component="div"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="h6">Create Element for {groupName}</Typography>
        <Icon onClick={onClose}>
          <CloseIcon />
        </Icon>
      </DialogTitle>

      <DialogContent>
        <Form
          formRef={formRef}
          initialValues={initialValues}
          onSubmit={handleAddElement}
          fields={fields}
        />
      </DialogContent>

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
          <Button
            onClick={handleCreateClick}
            variant="contained"
            color="success"
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};