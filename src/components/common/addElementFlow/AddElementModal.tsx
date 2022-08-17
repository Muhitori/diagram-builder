import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { FC, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Clear';
import { Icon } from '../Icon/Icon';
import { useDispatch } from 'react-redux';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { addElement } from 'src/store/slice';

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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Create Element for {groupName}</Typography>
        <Icon onClick={onClose}>
          <CloseIcon />
        </Icon>
      </DialogTitle>
      <DialogContent>
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={handleAddElement}
        >
          <Form>
            <Field name="name">
              {({ field }: FieldProps) => (
                <>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Element name"
                    {...field}
                  />
                </>
              )}
            </Field>
          </Form>
        </Formik>
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