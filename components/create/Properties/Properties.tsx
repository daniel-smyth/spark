'use client';

import { FC } from 'react';
import { Formik } from 'formik';
import s from './Properties.module.css';
import { Button, TextInput, NumberInput, Text } from '@components/ui';
import { useCollection } from 'app/create/context';

const Properties: FC = () => {
  const { collection, setCollection } = useCollection();

  return (
    <Formik
      initialValues={collection.properties}
      validate={(values) => {
        const errors: any = {};

        Object.keys(values).forEach((key) => {
          if (
            key === 'size' ||
            key === 'name' ||
            key === 'prefix' ||
            key === 'description' ||
            key === 'symbol'
          ) {
            errors[key] = 'Required';
          }
        });

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setCollection({
          ...collection,
          properties: { ...values }
        });
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
          </div>

          <div className={s.container}>
            {Object.keys(values).map(
              (key) =>
                key !== 'size' && (
                  <>
                    <TextInput
                      type="text"
                      name={key}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[key as keyof typeof values]}
                    />
                    {errors[key as keyof typeof values] &&
                      touched[key as keyof typeof values] && (
                        <div className={s.error}>
                          <Text>{errors[key as keyof typeof values]}</Text>
                        </div>
                      )}
                  </>
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
