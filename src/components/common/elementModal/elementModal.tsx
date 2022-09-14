import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addElement } from 'src/store/slice';
import { Form } from '../form/Form';
import { FormikProps } from 'formik';
import { IField } from 'src/types/UI';
import { Dialog } from '../dialog/Dialog';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADD_ELEMENT_ROUTE, EDIT_ELEMENT_ROUTE, EDIT_GROUP_ROUTE, EDIT_NODE_ROUTE } from 'src/utils/constants/route.constants';

interface ElementFields {
  name: string;
  color: string;
}

interface Props {
  groupName: string;
  values?: ElementFields;
}

const initialValues = {
  name: '',
  color: 'transparent'
};

const fields: IField[] = [
  { name: 'name', label: 'Element name', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const routes = [
  ADD_ELEMENT_ROUTE,
  EDIT_ELEMENT_ROUTE,
  EDIT_GROUP_ROUTE,
  EDIT_NODE_ROUTE,
];

export const ElementModal: FC<Props> = ({ groupName, values }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<ElementFields>>(null);

  const open = routes.includes(location.pathname);

  const onClose = () => {
    navigate('');
  }

  const handleAddElement = (data: ElementFields) => {
    const { name, color } = data;
    const elementName = name.trim();

    if (elementName) {
      dispatch(addElement({ groupName, name: elementName, color }));
      snackbarGenerator.success(`${name} created.`);
      onClose();
    } else {
      snackbarGenerator.info('Enter element name to create element.');
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
        initialValues={values || initialValues}
        onSubmit={handleAddElement}
        fields={fields}
      />
    </Dialog>
  );
};