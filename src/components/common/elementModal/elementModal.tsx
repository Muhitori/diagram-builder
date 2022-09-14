import { FC, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, setElementModalData } from 'src/store/slice';
import { Form } from '../form/Form';
import { FormikProps } from 'formik';
import { IField } from 'src/types/UI';
import { Dialog } from '../dialog/Dialog';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADD_ELEMENT_ROUTE, EDIT_ELEMENT_ROUTE, EDIT_GROUP_ROUTE, EDIT_NODE_ROUTE } from 'src/utils/constants/route.constants';
import { elementModalDataSelector } from 'src/store/selector/UI.selector';

interface ElementFields {
  name: string;
  color: string;
}

const routes = [
  ADD_ELEMENT_ROUTE,
  EDIT_ELEMENT_ROUTE,
  EDIT_GROUP_ROUTE,
  EDIT_NODE_ROUTE,
];

export const ElementModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<ElementFields>>(null);

  const initialValues = useSelector(elementModalDataSelector);

  const fields = useMemo(() => {
    if (location.pathname === EDIT_GROUP_ROUTE) {
      return [
        { name: 'name', label: 'Element prefix', fullWidth: true },
        { name: 'color', type: 'color', label: 'Color:' },
      ];
    }

    if (location.pathname === EDIT_NODE_ROUTE) {
      return [
        { name: 'name', label: 'Node name', fullWidth: true },
        { name: 'color', type: 'color', label: 'Color:' },
      ];
    }

    return [
      { name: 'name', label: 'Element name', fullWidth: true },
      { name: 'color', type: 'color', label: 'Color:' },
    ];
  }, [location.pathname])

  const open = useMemo(() => {
    return routes.includes(location.pathname)
  }, [location.pathname]);

  const onClose = () => {
    navigate('');

    //reset data
    dispatch(setElementModalData(null));
  }

  const handleAddElement = (data: ElementFields) => {
    const { name, color } = data;
    const elementName = name.trim();
    const groupName = search.get('groupName');

    if (groupName && elementName) {
      dispatch(addElement({ groupName, name: elementName, color }));
      snackbarGenerator.success(`${name} created.`);
      onClose();
    } else {
      snackbarGenerator.error('Enter element name to create element.');
    }
  };

  const handleEditGroup = (data: ElementFields) => {
    snackbarGenerator.info('edit group');
  }

  const handleEditElement = (data: ElementFields) => {
    snackbarGenerator.info('edit element');
  };
  
  const handleEditNode = (data: ElementFields) => {
    snackbarGenerator.info('edit node');
  };

  const handleFormSubmit = (data: ElementFields) => {
    if (location.pathname === ADD_ELEMENT_ROUTE) {
      handleAddElement(data);
    }

    if (location.pathname === EDIT_GROUP_ROUTE) {
      handleEditGroup(data);
    }

    if (location.pathname === EDIT_ELEMENT_ROUTE) {
      handleEditElement(data);
    }

    if (location.pathname === EDIT_NODE_ROUTE) {
      handleEditNode(data);
    }
  }

  const handleDialogSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const title = useMemo(() => {
    if (location.pathname === ADD_ELEMENT_ROUTE) {
      const groupName = search.get('groupName');
      return `Create element for "${groupName}"`;
    }

    if (location.pathname === EDIT_GROUP_ROUTE) {
      const groupName = search.get('groupName');
      return `Edit group "${groupName}"`;
    }

    if (location.pathname === EDIT_ELEMENT_ROUTE) {
      const elementName = search.get('elementName');
      return `Edit element "${elementName}"`;
    }

    //EDIT_NODE_ROUTE
    const nodeName = search.get('nodeName');
    return `Edit node "${nodeName}"`;
  }, [location.pathname]);

  return (
    <Dialog
      title={title}
      open={open}
      onClose={onClose}
      onSubmit={handleDialogSubmit}
      size="sm"
    >
      <Form
        formRef={formRef}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        fields={fields}
      />
    </Dialog>
  );
};