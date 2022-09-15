import { FC, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addElement, updateElement} from 'src/store/slice';
import { Form } from '../../form/Form';
import { FormikProps } from 'formik';
import { Dialog } from '../../dialog/Dialog';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { ElementFormData } from 'src/types/Forms';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ADD_ELEMENT_ROUTE,
  EDIT_ELEMENT_ROUTE,
} from 'src/utils/constants/route.constants';

interface Props {
  groupName: string;
  elementName?: string;
  elementId?: string;
  values?: ElementFormData;
}

const fields = [
  { name: 'name', label: 'Element name', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const initialValues = {
  name: '',
  color: '#ffffff',
};

const routes = [ADD_ELEMENT_ROUTE, EDIT_ELEMENT_ROUTE];

export const ElementModal: FC<Props> = ({
  groupName,
  elementName,
  elementId,
  values,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<ElementFormData>>(null);

  const open = useMemo(() => {
    return routes.includes(location.pathname);
  }, [location.pathname]);

  const onClose = () => {
    navigate('');
  };

  const title = useMemo(() => {
    if (location.pathname === ADD_ELEMENT_ROUTE) {
      return `Create element for "${groupName}"`;
    }

    return `Edit element "${elementName}"`;
  }, [location.pathname, groupName, elementName]);

  const submitButtonName = useMemo(() => {
    if (location.pathname === ADD_ELEMENT_ROUTE) {
      return 'Create';
    }

    return 'Edit';
  }, [location.pathname]);

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

  const handleEditElement = (data: ElementFormData) => {
    const { name, color } = data;
    const newName = name.trim();

    if (!elementId) {
      snackbarGenerator.error('Something went wrong.');
      return;
    }

    if (groupName && newName) {
      dispatch(updateElement({ groupName, id: elementId, name: newName, color }));
      snackbarGenerator.success(`${elementName} updated.`);
      onClose();
    } else {
      snackbarGenerator.error('Enter element name to update element.');
    }
  };

  const handleFormSubmit = (data: ElementFormData) => {
    if (location.pathname === ADD_ELEMENT_ROUTE) {
      handleAddElement(data);
    }

    if (location.pathname === EDIT_ELEMENT_ROUTE) {
      handleEditElement(data);
    }
  };

  const handleDialogSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <Dialog
      title={title}
      open={open}
      onClose={onClose}
      onSubmit={handleDialogSubmit}
      size="sm"
      submitButtonName={submitButtonName}
    >
      <Form
        formRef={formRef}
        initialValues={values || initialValues}
        onSubmit={handleFormSubmit}
        fields={fields}
      />
    </Dialog>
  );
};
