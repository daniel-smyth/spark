'use client';

import path from 'path';
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './Upload.module.css';
import { Trait, useCollection } from 'app/create/context';
import { Button, DragAndDrop, Dropzone, Text } from '@components/ui';

const Upload: FC = () => {
  const { collection, setCollection } = useCollection();
  const [artwork, setArtwork] = useState<Trait[]>([]);

  const handleUpload = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      const fullName = path.parse(image.name).name;

      const variation = {
        id: i,
        name: fullName
          .split('#')
          .shift()!
          .substring(fullName.indexOf('_') + 1),
        trait: path.parse(image.name).name.substring(0, fullName.indexOf('_')),
        weight: Number(fullName.split('#').pop()),
        image: URL.createObjectURL(image)
      };

      const trait = artwork.find((t) => t.name === variation.trait);
      if (trait) {
        trait.variations.push(variation);
      } else {
        artwork.push({
          id: artwork.length,
          name: variation.trait,
          variations: [variation]
        });
      }
    }
    setArtwork([...artwork]);
  };

  return (
    <>
      {artwork.length === 0 ? (
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
      ) : (
        <>
          <Text>
            Update layer order. Layer 0 located at the back, layer 1 is printed
            over layer 1.
          </Text>

          <DragAndDrop
            values={collection.artwork.map((trait) => trait.name)}
            onChange={(output: string[]) => {
              setArtwork([
                ...output.map(
                  (str) => collection.artwork.find((t) => t.name === str)!
                )
              ]);
            }}
          />

          <Button
            width="100%"
            onClick={() => {
              setCollection({
                ...collection,
                artwork: artwork.map((trait, i) => {
                  trait.id = i;
                  return trait;
                })
              });
            }}
          >
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default Upload;
