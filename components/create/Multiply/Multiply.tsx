'use client';

import { FC, useEffect } from 'react';
import { createCanvas } from 'canvas';
import s from './Multiply.module.css';
import { Multiplier } from '@lib/multiplier';
import { useCollection } from 'app/create/context';

const Multiply: FC = () => {
  const { collection, setCollection } = useCollection();

  useEffect(() => {
    const multiply = () => {
      const multiplier = new Multiplier(collection.artwork);
      let count = 0;

      while (count <= collection.properties.size) {
        const layers = multiplier.generate();

        Promise.all(layers).then((layers) => {
          const image = createCanvas(512, 512);
          const ctx = image.getContext('2d');
          ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
          ctx.fillRect(0, 0, 512, 512);

          layers.forEach((layer) => {
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(layer.image, 0, 0, 512, 512);
          });

          collection.nfts.push({
            name: `${collection.properties.prefix} ${count}`,
            image: image.toDataURL('image/png'),
            description: collection.properties.description,
            external_url: collection.properties.external_link,
            attributes: layers.reduce((acc: any, layer) => {
              acc[layer.properties.trait] = layer.properties.name;
              return acc;
            }, {})
          });
        });

        count += 1;
      }
      setCollection({ ...collection });
    };
    multiply();
  }, []);

  return <div className={s.loading}>Multiplying artwork...</div>;
};

export default Multiply;
