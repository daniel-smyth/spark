'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './Upload.module.css';
import { useCollection } from 'app/create/context';
import { Dropzone, Text } from '@components/ui';

const Upload: FC = () => {
  const { collection, setCollection } = useCollection();

  const processImage = (image: File) => {
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
  };

  const handleUpload = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      processImage(image);
    }
    console.log(collection);
    setCollection({ ...collection });
  };

  return (
    <>
      <Dropzone handleChange={handleUpload} />

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
