'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Formik } from 'formik';
import s from './Form.module.css';
import {
  Button,
  DragAndDrop,
  Dropzone,
  TextInput,
  NumberInput,
  Text
} from '@components/ui';

interface Trait {
  name: string;
  variations: Variation[];
}

interface Variation {
  name: string;
  url: string;
}

interface Collection {
  artwork: Trait[];
  properties: {
    size: number;
    name: string;
    symbol: string;
    description: string;
    prefix: string;
    external_link: string;
  };
}

const Form: FC = () => {
  const [collection, setCollection] = useState<Collection>({
    artwork: [],
    properties: {
      size: 0,
      name: '',
      symbol: '',
      description: '',
      prefix: '',
      external_link: ''
    }
  });

  const handleUpload = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      const variation = {
        name: image.name.substring(image.name.indexOf('_') + 1),
        url: URL.createObjectURL(image)
      };

      const traitStr = image.name.substring(0, image.name.indexOf('_'));
      const trait = collection.artwork.find((t) => t.name === traitStr);

      if (trait) {
        trait.variations.push(variation);
      } else {
        collection.artwork.push({ name: traitStr, variations: [variation] });
      }
    }
    setCollection({ ...collection });
  };

  const changeOrder = (arr: string[]) => {
    setCollection({
      ...collection,
      artwork: [
        ...arr.map((trait) => collection.artwork.find((t) => t.name === trait)!)
      ]
    });
  };

  return (
    <>
      {collection.artwork.length === 0 && (
        <>
          <Text>Upload your NFT artwork</Text>

          <Dropzone handleChange={handleUpload} />

          <Text>
            Spark3 detects <Link href="/">NFT trait types and trait names</Link>{' '}
            from your image file name. Follow our naming convention:
          </Text>

          <Text>
            <strong>&quot;TRAITTYPE_TRAIT.png&quot;</strong>
          </Text>

          <Text>Trait examples: Background, Eyes, Fur, Mouth.</Text>

          <div className={s.image}>
            <Image
              alt="layers"
              src="/layersScreenshot.jpeg"
              width={280}
              height={150}
            />
          </div>
        </>
      )}

      {collection.artwork.length > 0 && (
        <>
          <Text>
            Update layer order. Layer 0 located at the back, layer 1 is printed
            over layer 1.
          </Text>

          <DragAndDrop
            values={collection.artwork.map((trait) => trait.name)}
            onChange={changeOrder}
          />
        </>
      )}

      {collection.properties.size === 0 && collection.artwork.length > 0 && (
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

                <Text>
                  This data cannot be changed.{' '}
                  <Link href="/">See NFT trait types and trait names</Link> for
                  more information.
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
      )}

      {collection.properties.size > 0 && <></>}
    </>
  );
};

export default Form;
