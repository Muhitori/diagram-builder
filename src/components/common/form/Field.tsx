import { Checkbox, FormControl, TextField } from '@mui/material';
import {
  Field as FormikField,
  FieldProps,
} from 'formik';
import { FC } from 'react';
import { IField } from 'src/types/UI';
import { useStyles } from './styles';

export const Field: FC<IField> = ({
  name,
  type,
  label,
  fullWidth,
  style,
  variant,
}) => {
  const classes = useStyles();

  if (type === 'color') {
    return (
      <FormControl sx={{ ...classes.formControl, ...style }}>
        {label}
        <FormikField name={name}>
          {({ field }: FieldProps) => (
            <TextField
              {...field}
              type={type}
              value={field.value || '#ffffff'}
              sx={{ ml: 1, width: '5rem' }}
            />
          )}
        </FormikField>
      </FormControl>
    );
  }

  if (type === 'checkbox') {
    return (
      <FormControl sx={{ ...classes.formControl, ...style,}}>
        <FormikField name={name}>
          {({ field }: FieldProps) => (
            <Checkbox {...field} value={field.value || false} />
          )}
        </FormikField>
        {label}
      </FormControl>
    );
  }


  return (
    <FormikField name={name}>
      {({ field }: FieldProps) => (
        <TextField
          variant={variant || 'standard'}
          sx={{ mb: 2, ...style }}
          type={type}
          fullWidth={fullWidth}
          label={label}
          {...field}
        />
      )}
    </FormikField>
  );
};
