'use client';

import Image from 'next/image';
import s from './Create.module.css';
import { Dropzone, Logo, Text } from '@components/ui';
import { ChangeEvent } from 'react';
import Link from 'next/link';

export default function Create() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
    }
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
            <Dropzone handleChange={handleChange} />

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
          </div>
        </div>
      </div>
    </main>
  );
}
