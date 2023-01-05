'use client';

import path from 'path';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './Upload.module.css';
import { useCollection } from 'app/create/context';
import { Dropzone, Text } from '@components/ui';

const Upload: FC = () => {
  const { collection, setCollection } = useCollection();

  const handleUpload = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      const variation = {
        id: i,
        name: path
          .parse(image.name)
          .name.split('#')
          .shift()!
          .substring(path.parse(image.name).name.indexOf('_') + 1),
        trait: path
          .parse(image.name)
          .name.substring(0, path.parse(image.name).name.indexOf('_')),
        weight: Number(path.parse(image.name).name.split('#').pop()),
        url: URL.createObjectURL(image)
      };

      const trait = collection.artwork.find((t) => t.name === variation.trait);
      if (trait) {
        trait.variations.push(variation);
      } else {
        collection.artwork.push({
          id: collection.artwork.length,
          name: variation.trait,
          variations: [variation]
        });
      }
    }
    setCollection({ ...collection });
  };

  return (
    <>
      <Dropzone onChange={handleUpload} />

      <Text>
        Spark3 detects <Link href="/">NFT trait types and trait names</Link>{' '}
        from your image file name. Follow our naming convention:
      </Text>

      <Text>
        <strong>&quot;TRAITTYPE_TRAIT.png&quot;</strong>
      </Text>

      <Text>Trait examples: Background, Eyes, Fur, Mouth.</Text>

      <div className={s.box}>
        <Image
          alt="layers"
          src="/layersScreenshot.jpeg"
          width={280}
          height={150}
        />
      </div>
    </>
  );
};

export default Upload;
