import { FC, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateElement } from 'src/store/slice';
import { Form } from '../../form/Form';
import { FormikProps } from 'formik';
import { Dialog } from '../../dialog/Dialog';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { ElementFormData } from 'src/types/Forms';
import { useNavigate, useLocation } from 'react-router-dom';
import { EDIT_ELEMENT_ROUTE } from 'src/utils/constants/route.constants';

interface Props {
  groupName: string;
  elementName: string;
  elementId: string;
  values: ElementFormData;
}

const fields = [
  { name: 'name', label: 'Element name', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const initialValues = {
  name: '',
  color: '#ffffff',
};

export const EditElementModal: FC<Props> = ({
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
    return location.pathname === EDIT_ELEMENT_ROUTE;
  }, [location.pathname]);

  const onClose = () => {
    navigate('');
  };

  const title = useMemo(() => `Edit element "${elementName}"`, [location.pathname, elementName]);

  const handleEditElement = (data: ElementFormData) => {
    const { name, color } = data;
    const newName = name.trim();

    if (!elementId) {
      snackbarGenerator.error('Something went wrong.');
      return;
    }

    if (groupName && newName) {
      dispatch(
        updateElement({ groupName, id: elementId, name: newName, color })
      );
      snackbarGenerator.success(`${elementName} updated.`);
      onClose();
    } else {
      snackbarGenerator.error('Enter element name to update element.');
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
      submitButtonName={'Edit'}
    >
      <Form
        formRef={formRef}
        initialValues={values || initialValues}
        onSubmit={handleEditElement}
        fields={fields}
      />
    </Dialog>
  );
};
