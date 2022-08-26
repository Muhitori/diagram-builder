import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addElement } from 'src/store/slice';
import { Form } from '../form/Form';
import { FormikProps } from 'formik';
import { IField } from 'src/types/UI';
import { Dialog } from '../dialog/Dialog';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';

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
    } else {
      snackbarGenerator.info('Enter element name to create element.')
    }
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <Dialog
      title={`Create Element for ${groupName}`}
      open={open}
      onClose={onClose}
      onSubmit={handleCreateClick}
      size="sm"
    >
      <Form
        formRef={formRef}
        initialValues={initialValues}
        onSubmit={handleAddElement}
        fields={fields}
      />
    </Dialog>
  );
};