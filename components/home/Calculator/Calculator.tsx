'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import s from './Calculator.module.css';
import { NumberInput, Text } from '@components/ui';

const Calculator: FC = () => {
  const [data, setData] = useState({ traits: 10, layers: 4 });

  const handleChange = ({ name, value }: { name?: string; value: number }) => {
    if (name) {
      setData({ ...data, [name]: value });
    }
  };

  return (
    <div className={s.root}>
      <Text variant="sectionHeading">
        {(data.traits ** data.layers).toLocaleString('en-US')} NFTs
      </Text>
      <Text>
        Traits per Layer. <Link href="/">Traits?</Link>
      </Text>
      <NumberInput name="traits" value={data.traits} onChange={handleChange} />
      <Text>
        Layer Count. <Link href="/">Layers?</Link>
      </Text>
      <NumberInput name="layers" value={data.layers} onChange={handleChange} />
    </div>
  );
};

export default Calculator;
