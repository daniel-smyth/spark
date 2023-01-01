'use client';

import { ChangeEvent, FC, useState } from 'react';
import s from './Calculator.module.css';
import { Text } from '@components/ui';

const Calculator: FC = () => {
  const [data, setData] = useState({
    traits: 10,
    layers: 4
  });
  const [size, setSize] = useState(10000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });

    switch (e.target.name) {
      case 'traits':
        setSize(Number(e.target.value) ** data.layers);
        break;
      case 'layers':
        setSize(data.traits ** Number(e.target.value));
        break;
    }
  };

  return (
    <div className={s.card}>
      <Text variant="pageHeading">{size.toLocaleString('en-US')} NFTs</Text>
      <Text>Trait Count</Text>
      <input
        name="traits"
        type="number"
        placeholder="Trait Count"
        value={data.traits}
        onChange={handleChange}
      />
      <Text>Layer Count</Text>
      <input
        name="layers"
        type="number"
        placeholder="Layer Count"
        value={data.layers}
        onChange={handleChange}
      />
    </div>
  );
};

export default Calculator;
