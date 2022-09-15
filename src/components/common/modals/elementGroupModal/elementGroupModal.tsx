import { FormikProps } from 'formik';
import { FC, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { setGroupGeneralOptions } from 'src/store/slice';
import { GroupFormData, NodeFormData } from 'src/types/Forms';
import { Dialog } from '../../dialog/Dialog';
import { Form } from '../../form/Form';

interface Props {
  groupName: string;
  title: string;
  open: boolean;
  onClose: () => void;
  submitButtonName: string;
  values?: GroupFormData;
}

const fields = [
  { name: 'name', label: 'Element prefix', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const initialValues = {
  name: '',
  color: '#ffffff',
};

export const ElementGroupModal: FC<Props> = ({
  groupName,
  title,
  open,
  onClose,
  submitButtonName,
  values,
}) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<GroupFormData>>(null);

  const handleDialogSubmit = () => {};

  const handleFormSubmit = (data: NodeFormData) => {
    const { name: prefix, color } = data;
    const elementPrefix = prefix.trim();

    if (groupName) {
      dispatch(
        setGroupGeneralOptions({
          groupName,
          generalOptions: {
            name: elementPrefix,
            color,
          },
        })
      );
      snackbarGenerator.success(`${groupName} updated.`);
      onClose();
    } else {
      snackbarGenerator.error('Error while group updating.');
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
