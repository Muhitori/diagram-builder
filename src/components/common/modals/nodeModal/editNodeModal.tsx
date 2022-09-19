import { FormikProps } from 'formik';
import { FC, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { modalDataSelector } from 'src/store/selector/UI.selector';
import { updateNodeData } from 'src/store/slice';
import { NodeFormData } from 'src/types/Forms';
import { EDIT_NODE_ROUTE } from 'src/utils/constants/route.constants';
import { Dialog } from '../../dialog/Dialog';
import { Form } from '../../form/Form';

const fields = [
  { name: 'name', label: 'Node name', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

export const EditNodeModal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<FormikProps<NodeFormData>>(null);

  const search = new URLSearchParams(location.search);
  const nodeId = search.get('nodeId');
  const nodeName = search.get('nodeName');
  
  const values = useSelector(modalDataSelector('node')) as NodeFormData;

  const open = useMemo(() => {
    return location.pathname === EDIT_NODE_ROUTE;
  }, [location.pathname]);

  const onClose = () => {
    navigate('');
  };

  const handleDialogSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleFormSubmit = (data: NodeFormData) => {
    const { name, color } = data;

    if (!nodeId) {
      snackbarGenerator.error('Something went wrong.');
      return;
    }

    dispatch(updateNodeData({ id: nodeId, name: name.trim(), color }));
    snackbarGenerator.success(`${nodeName || 'Node'} updated.`);

    onClose();
  };

  return (
    <Dialog
      title={`Edit element "${nodeName}"`}
      open={open}
      onClose={onClose}
      onSubmit={handleDialogSubmit}
      size="sm"
      submitButtonName={'Edit'}
    >
      <Form
        formRef={formRef}
        initialValues={values}
        onSubmit={handleFormSubmit}
        fields={fields}
      />
    </Dialog>
  );
};