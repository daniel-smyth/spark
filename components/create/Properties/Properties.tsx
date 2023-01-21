'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import s from './Properties.module.css';
import { useCollection } from '@app/create/context';
import { Button, Text } from '@components/ui';
import { FormikTextInput, FormikNumberInput } from '@components/formik';

const Properties: FC = () => {
  const { collection, setCollection } = useCollection();

  const getMaxSize = () =>
    collection.artwork
      .reduce((max, trait) => max * trait.variations.length, 1)
      .toLocaleString('en-US');

  return (
    <Formik
      initialValues={collection.properties}
      validationSchema={Yup.object().shape({
        size: Yup.number().max(10000).required('Size is require'),
        name: Yup.string().max(255).required('Name is required'),
        symbol: Yup.string().max(3).required('Symbol is required'),
        prefix: Yup.string().max(255),
        description: Yup.string().max(255),
        primary_sale_recipient: Yup.string()
          .min(41)
          .max(43)
          .required('Invalid address')
      })}
      onSubmit={(values, { setSubmitting }) => {
        collection.properties = values;
        setCollection(collection);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className={s.container}>
            <Text>
              <strong>Collection Size</strong>
            </Text>
            <div className={s.flex}>
              <Text>
                <strong>{getMaxSize()}</strong> is the max size you can make
                your collection with uploaded artwork.
              </Text>
              <FormikNumberInput label="size" name="size" type="number" />
            </div>
          </div>
          <div className={s.container}>
            <Text>
              <strong>Collection Properties</strong>
            </Text>
            <Text>
              Enter your collection&apos;s properties. This data cannot be
              changed. <Link href="/">See NFT trait types and trait names</Link>{' '}
              for more information.
            </Text>
          </div>
          <div className={s.container}>
            <FormikTextInput name="name" type="text" />
            <FormikTextInput name="symbol" type="text" />
            <FormikTextInput name="prefix" type="text" />
            <FormikTextInput name="description" type="text" />
            <FormikTextInput name="primary_sale_recipient" type="text" />
          </div>
          <Button width="100%" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Properties;
