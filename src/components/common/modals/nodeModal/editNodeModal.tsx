import { FormikProps } from 'formik';
import { FC, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { currentNodeSelector } from 'src/store/selector/Node.selector';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<NodeFormData>>(null);

  const currentNode = useSelector(currentNodeSelector);

  const open = useMemo(() => {
    return location.pathname === EDIT_NODE_ROUTE;
  }, [location.pathname]);

  const onClose = () => {
    navigate('');
  };

  //Close if no current node
  if (!currentNode) {
    snackbarGenerator.error('Something went wrong.');
    onClose();
    return null;
  }

  const { id, data: nodeData } = currentNode;
  const backgroundColor = nodeData.backgroundColor ?
    //removing alpha part
    nodeData.backgroundColor.substring(0, nodeData.backgroundColor.length - 2) :
    '#ffffff';


  const values = {
    name: nodeData.label,
    color: backgroundColor,
  };
  
  const handleDialogSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  const handleFormSubmit = (data: NodeFormData) => {
    const { name, color } = data;

    dispatch(updateNodeData({ id, name: name.trim(), color }));
    snackbarGenerator.success(`${nodeData.label || 'Node'} updated.`);

    onClose();
  };

  return (
    <Dialog
      title={`Edit element "${nodeData.label}"`}
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