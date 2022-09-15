import { FormikProps } from 'formik';
import { FC, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { snackbarGenerator } from 'src/components/SnackbarGenerator';
import { modalDataSelector } from 'src/store/selector/UI.selector';
import { setGroupGeneralOptions } from 'src/store/slice';
import { GroupFormData, NodeFormData } from 'src/types/Forms';
import { EDIT_GROUP_ROUTE } from 'src/utils/constants/route.constants';
import { Dialog } from '../../dialog/Dialog';
import { Form } from '../../form/Form';

const fields = [
  { name: 'name', label: 'Element prefix', fullWidth: true },
  { name: 'color', type: 'color', label: 'Color:' },
];

const initialValues = {
  name: '',
  color: '#ffffff',
};

export const EditElementGroupModal: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<FormikProps<GroupFormData>>(null);

  const search = new URLSearchParams(location.search);
  const groupName = search.get('groupName');

  const values = useSelector(modalDataSelector('group'));

  const open = useMemo(() => {
    return location.pathname === EDIT_GROUP_ROUTE;
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
      title={`Edit group "${groupName}"`}
      open={open}
      onClose={onClose}
      onSubmit={handleDialogSubmit}
      size="sm"
      submitButtonName={'Edit'}
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
