'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import s from './Properties.module.css';
import { Button, TextInput, NumberInput, Text } from '@components/ui';
import { useCollection } from '@app/create/context';
import Error from './Error';

const Properties: FC = () => {
  const { collection, setCollection } = useCollection();

  return (
    <Formik
      initialValues={collection.properties}
      validate={(values) => {
        const errors: { [k: string]: string } = {};
        Object.keys(values).forEach((key) => {
          if (!values[key as keyof typeof values]) {
            errors.email = 'Required';
          }
        });
        return errors;
      }}
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
                <strong>
                  {collection.artwork
                    .reduce((acc, l) => acc * l.variations.length, 1)
                    .toLocaleString('en-US')}
                </strong>{' '}
                is the max size you can make your collection with uploaded
                artwork.
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
              (key, i) =>
                key !== 'size' && (
                  <React.Fragment key={key}>
                    <TextInput
                      name={key}
                      type="text"
                      variant="ghost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[key as keyof typeof values]}
                    />
                    {errors[key as keyof typeof values] &&
                      touched[key as keyof typeof values] && (
                        <Error>{errors[key as keyof typeof values]}</Error>
                      )}
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
