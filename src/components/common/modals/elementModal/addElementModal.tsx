import { FC, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addElement} from 'src/store/slice';
import { Form } from '../../form/Form';
import { FormikProps } from 'formik';
import { Dialog } from '../../dialog/Dialog';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { ElementFormData } from 'src/types/Forms';
import { useNavigate, useLocation } from 'react-router-dom';
import {ADD_ELEMENT_ROUTE,} from 'src/utils/constants/route.constants';

const fields = [
  { name: 'name', label: 'Element name', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const initialValues = {
  name: '',
  color: '#ffffff',
};

export const AddElementModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<ElementFormData>>(null);

  const open = useMemo(() => {
    return location.pathname === ADD_ELEMENT_ROUTE;
  }, [location.pathname]);

  const onClose = () => {
    navigate('');
  };

  const handleAddElement = (data: ElementFormData) => {
    const { name, color } = data;
    const newName = name.trim();

    if (groupName && newName) {
      dispatch(addElement({ groupName, name: newName, color }));
      snackbarGenerator.success(`${name} created.`);
      onClose();
    } else {
      snackbarGenerator.error('Enter element name to create element.');
    }
  };

  const handleDialogSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <Dialog
      title={`Create element for "${groupName}"`}
      open={open}
      onClose={onClose}
      onSubmit={handleDialogSubmit}
      size="sm"
      submitButtonName={'Create'}
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
