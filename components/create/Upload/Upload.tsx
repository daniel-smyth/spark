'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { Trait } from '@lib/web3';
import { useCollection } from '@app/create/context';
import { Button, DragAndDrop, Dropzone, Text } from '@components/ui';

const Upload: FC = () => {
  const { collection, setCollection } = useCollection();
  const [artwork, setArtwork] = useState<Trait[]>([]);

  const handleUpload = (files: FileList) =>
    setArtwork(collection.loadArtwork(files));

  const handleSort = (output: string[]) =>
    setArtwork([...output.map((str) => artwork.find((t) => t.name === str)!)]);

  const submit = () => {
    collection.artwork = [...artwork];
    setCollection(collection);
  };

  return (
    <>
      {artwork.length === 0 && (
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
        </>
      )}
      {artwork.length > 0 && (
        <>
          <Text>
            Update layer order. Layer 0 located at the back, layer 1 is printed
            over layer 1.
          </Text>
          <DragAndDrop
            values={artwork.map((trait) => trait.name)}
            onChange={handleSort}
          />
          <Button width="100%" onClick={submit}>
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default Upload;
