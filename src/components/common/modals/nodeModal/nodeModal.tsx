import { FormikProps } from 'formik';
import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { updateNodeData } from 'src/store/slice';
import { NodeFormData } from 'src/types/Forms';
import { Dialog } from '../../dialog/Dialog';
import { Form } from '../../form/Form';

interface Props {
  nodeName: string;
  nodeId: string;
  title: string;
  open: boolean;
  onClose: () => void;
  submitButtonName: string;
  values?: NodeFormData;
}

const fields = [
  { name: 'name', label: 'Node name', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const initialValues = {
  name: '',
  color: '#ffffff',
};

export const NodeModal: FC<Props> = ({
  nodeId,
  nodeName,
  title,
  open,
  onClose,
  submitButtonName,
  values,
}) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<NodeFormData>>(null);

  const handleDialogSubmit = () => {};

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