'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Formik } from 'formik';
import { NFTContractDeployMetadata } from '@thirdweb-dev/sdk';
import s from './Create.module.css';
import {
  Button,
  DragAndDrop,
  Dropzone,
  Input,
  Logo,
  Text
} from '@components/ui';

if (!process.env.NEXT_PUBLIC_ADDRESS) {
  throw new Error('Please include your NEXT_PUBLIC_ADDRESS URL in .env');
}

const address = process.env.NEXT_PUBLIC_ADDRESS;

type Trait = {
  name: string;
  variations: Variation[];
};

type Variation = {
  name: string;
  url: string;
};

type Properties = NFTContractDeployMetadata & {
  size: number;
  prefix: string;
};

export default function Create() {
  const [traits, setTraits] = useState<Trait[]>([]);
  const [properties, setProperties] = useState<Properties>();

  const handleUpload = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      const traitStr = image.name.substring(0, image.name.indexOf('_'));
      const trait = traits.find((t) => t.name === traitStr);

      const variation = {
        name: image.name.substring(image.name.indexOf('_') + 1),
        url: URL.createObjectURL(image)
      };

      if (trait) {
        trait.variations.push(variation);
      } else {
        traits.push({ name: traitStr, variations: [variation] });
      }
    }
    setTraits([...traits]);
  };

  const orderImages = (array: string[]) => {
    setTraits([...array.map((trait) => traits.find((t) => t.name === trait)!)]);
  };

  return (
    <main className={s.main}>
      <div className={s.background}>
        <div className={s.card}>
          {!properties && (
            <>
              <div className={s.header}>
                <Text variant="sectionHeading">Collection Properties</Text>
                <Logo width={60} />
              </div>

              <Text>
                This data cannot be changed.{' '}
                <Link href="/">See NFT trait types and trait names</Link> for
                more information.
              </Text>

              <Formik
                initialValues={{
                  name: '',
                  prefix: '',
                  description: '',
                  symbol: '',
                  size: 0,
                  seller_fee_basis_points: 0,
                  external_link: ''
                }}
                validate={(values) => {
                  const errors: any = {};
                  Object.keys(values).forEach((key) => {
                    if (
                      key === 'name' ||
                      key === 'prefix' ||
                      key === 'description' ||
                      key === 'symbol'
                    )
                      errors[key] = 'Required';
                  });
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setProperties({
                    ...values,
                    platform_fee_basis_points: 20,
                    primary_sale_recipient: address,
                    fee_recipient: address
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
                  <>
                    <form className={s.form} onSubmit={handleSubmit}>
                      {Object.keys(values).map((k) => (
                        <>
                          <Input
                            type="text"
                            placeholder={k}
                            name={k}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[k as keyof typeof values]}
                          />
                          {errors[k as keyof typeof values] &&
                            touched[k as keyof typeof values] && (
                              <div className={s.formError}>
                                <Text>{errors[k as keyof typeof values]}</Text>
                              </div>
                            )}
                        </>
                      ))}
                      <Button type="submit" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </form>
                  </>
                )}
              </Formik>
            </>
          )}

          {properties && (
            <>
              <div className={s.header}>
                <Text variant="sectionHeading">Upload Images</Text>
                <Logo width={60} />
              </div>

              <Dropzone handleChange={handleUpload} />

              <Text>
                Spark3 detects{' '}
                <Link href="/">NFT trait types and trait names</Link> from your
                image file name. Follow our naming convention:
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

          {traits.length > 0 && (
            <>
              <div className={s.header}>
                <Text variant="sectionHeading">Order Images</Text>
                <Logo width={60} />
              </div>

              <Text>
                Update layer order. Layer 1 located at the back, layer 2 is
                printed over layer 1.
              </Text>

              <DragAndDrop
                values={traits.map((trait) => trait.name)}
                onChange={orderImages}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
