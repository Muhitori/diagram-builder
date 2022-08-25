import { TextField } from '@mui/material';
import {
  Field as FormikField,
  FieldProps,
} from 'formik';
import { FC } from 'react';
import { IField } from 'src/types/UI';

export const Field: FC<IField> = ({
  name,
  type,
  label,
  fullWidth,
  style,
  variant,
}) => {
  return (
    <FormikField name={name}>
      {({ field }: FieldProps) => (
        <TextField
          variant={variant || 'standard'}
          sx={style}
          type={type}
          fullWidth={fullWidth}
          label={label}
          {...field}
        />
      )}
    </FormikField>
  );
};
