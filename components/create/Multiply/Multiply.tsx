'use client';

import { FC, useEffect } from 'react';
import { createCanvas, Image } from 'canvas';
import s from './Multiply.module.css';
import { ArtMultiplier } from '@lib/multiplier';
import { useCollection, Variation } from 'app/create/context';

interface Layer {
  image: Image;
  variation: Variation;
}

const Multiply: FC = () => {
  const { collection, setCollection } = useCollection();

  const drawImage = (layers: Layer[]) => {
    const image = createCanvas(512, 512);
    const ctx = image.getContext('2d');

    ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
    ctx.fillRect(0, 0, 512, 512);

    layers.forEach((layer) => {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(layer.image, 0, 0, 512, 512);
    });
    return image;
  };

  useEffect(() => {
    const multiplier = new ArtMultiplier(collection.artwork);
    let count = 0;

    while (count <= collection.properties.size) {
      const layers = multiplier.generate();

      Promise.all(layers).then((layers) => {
        const image = drawImage(layers);

        const nft = {
          image: image.toDataURL('image/png'),
          name: `${collection.properties.prefix} ${count}`,
          description: collection.properties.description,
          external_url: collection.properties.external_link,
          attributes: layers.reduce((acc: any, layer) => {
            acc[layer.variation.trait] = layer.variation.name;
            return acc;
          }, {})
        };
        collection.nfts.push(nft);
      });
      count += 1;
    }
    setCollection({ ...collection });
  }, []);

  return <div className={s.loading}>Multiplying artwork...</div>;
};

export default Multiply;
