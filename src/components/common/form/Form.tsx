import { Formik, Form as FormikForm, FormikProps, FormikHelpers } from 'formik';
import { ReactNode, RefObject } from 'react';
import { IField } from 'src/types/UI';
import { Field } from './Field';

interface FormProps<T> {
  formRef: RefObject<FormikProps<T>>;
  initialValues: T;
  fields: IField[];
  onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void;
}

type Props<T> = FormProps<T> & { children?: ReactNode };

export const Form = <T extends object>(props: Props<T>) => {
  const { formRef, initialValues, onSubmit, fields } = props;

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <FormikForm>
        {fields.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            fullWidth={field.fullWidth}
            style={field.style}
            variant={field.variant}
          />)
        )}
      </FormikForm>
    </Formik>
  );
};