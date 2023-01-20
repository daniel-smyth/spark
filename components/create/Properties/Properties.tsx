'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import s from './Properties.module.css';
import { useCollection } from '@app/create/context';
import { Button, NumberInput, Text } from '@components/ui';
import { TextInput } from '@components/form';

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
        primary_sale_recipient: Yup.number()
          .max(255)
          .required('Primary sale recipient is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        collection.properties = values;
        setCollection(collection);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
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
              <NumberInput
                name="size"
                value={values.size}
                onChange={handleChange}
              />
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
            {Object.keys(values).map(
              (key) =>
                key !== 'size' && (
                  <React.Fragment key={key}>
                    <TextInput
                      name={key}
                      type="text"
                      variant="ghost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[key as keyof typeof values]}
                      errors={errors}
                      touched={touched}
                    />
                  </React.Fragment>
                )
            )}
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
