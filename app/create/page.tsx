'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './Create.module.css';
import { Dropzone, Logo, Text } from '@components/ui';

function UploadImages({
  handleUpload
}: {
  handleUpload: (files: FileList) => void;
}) {
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

      <div className={s.image}>
        <Image
          alt="layers"
          src="/layersScreenshot.jpeg"
          width={280}
          height={150}
        />
      </div>
    </>
  );
}

export default function Create() {
  const [files, setFiles] = useState<FileList>(new FileList());

  const handleUpload = (files: FileList) => {
    setFiles(files);
  };

  return (
    <main className={s.main}>
      <div className={s.background}>
        <div className={s.card}>
          <div className={s.header}>
            <Text variant="sectionHeading">Upload Images</Text>
            <Logo width={60} />
          </div>
          <div className={s.content}>
            <UploadImages handleUpload={handleUpload} />
          </div>
        </div>
      </div>
    </main>
  );
}
