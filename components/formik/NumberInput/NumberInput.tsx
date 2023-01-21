'use client';

import React, { FC, InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { NumberInput } from '@components/ui';
import Error from '../Error';

interface FormikNumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormikNumberInput: FC<FormikNumberInputProps> = ({ label, ...props }) => {
  const { name = '', type, placeholder } = props;
  const [field, meta] = useField({ name, type, placeholder });

  return (
    <>
      <NumberInput {...field} {...props} />
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </>
  );
};

export default FormikNumberInput;
