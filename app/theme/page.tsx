'use client';

import { useState } from 'react';
import s from './Theme.module.css';
import { Button, Text } from '@components/ui';

export default function Theme() {
  const [loading, setLoading] = useState(false);

  return (
    <main className={s.main}>
      <ul>
        <li>
          <Button variant="flat" width={150}>
            Flat
          </Button>
        </li>
        <li>
          <Button variant="slim" width={150}>
            Slim
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            width={150}
            loading={loading}
            onClick={() => setLoading(!loading)}
          >
            Ghost
          </Button>
        </li>
        <li>
          <Button variant="naked" width={150}>
            Naked
          </Button>
        </li>
        <li>
          <Button variant="flat" width={150} disabled>
            disabled
          </Button>
        </li>
        <li>
          <Button
            variant="flat"
            loading={loading}
            onClick={() => setLoading(!loading)}
            width={150}
          >
            Test Loading
          </Button>
        </li>
        <li>
          <Button variant="flat" loading width={150}>
            Loading
          </Button>
        </li>
      </ul>

      <Text variant="heading">I am a heading</Text>
      <Text variant="pageHeading">I am a pageHeading</Text>
      <Text variant="sectionHeading">I am a sectionHeading</Text>
      <Text variant="body">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.{' '}
      </Text>
    </main>
  );
}
