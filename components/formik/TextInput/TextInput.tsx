'use client';

import React, { FC } from 'react';
import { useField } from 'formik';
import { TextInput, TextInputProps } from '@components/ui';
import Error from '../Error';

const FormikTextInput: FC<TextInputProps> = ({ ...props }) => {
  const [field, meta] = useField({
    name: props.name || '',
    type: props.type,
    placeholder: props.placeholder
  });

  return (
    <>
      <TextInput {...field} {...props} />
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </>
  );
};

export default FormikTextInput;
