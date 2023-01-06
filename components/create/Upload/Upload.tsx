'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './Upload.module.css';
import { useCollection } from 'app/create/context';
import { Button, DragAndDrop, Dropzone, Text } from '@components/ui';

const Upload: FC = () => {
  const { collection, setCollection } = useCollection();

  const handleUpload = (files: FileList) => {
    collection.setArtwork(files);
  };

  return (
    <>
      {collection.artwork.length === 0 ? (
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
              const newOrder = output.map(
                (str) => collection.artwork.find((t) => t.name === str)!
              );
              collection.artwork = [...newOrder];
            }}
          />

          <Button width="100%" onClick={() => setCollection(collection)}>
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default Upload;
