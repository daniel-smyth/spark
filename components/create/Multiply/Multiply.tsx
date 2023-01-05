'use client';

import { FC, useEffect } from 'react';
import { loadImage, Image, createCanvas } from 'canvas';
import s from './Multiply.module.css';
import { Trait, useCollection, Variation } from 'app/create/context';

interface Layer {
  variation: Variation;
  image: Image;
}

const createDna = (artwork: Trait[]) => {
  const dna: string[] = [];

  artwork.forEach((trait) => {
    const weight = trait.variations.reduce((acc, v) => (acc += v.weight), 1);
    let random = Math.floor(Math.random() * weight);

    for (let i = 0; i < trait.variations.length; i += 1) {
      // Subtract current weight from random weight until reach sub zero
      random -= trait.variations[i].weight;

      if (random < 0) {
        dna.push(`${trait.variations[i].id}:${trait.variations[i].name}`);
        break;
      }
    }
  });

  return dna.join('#');
};

const constructImage = (dna: string, artwork: Trait[]) => {
  const query = /(\?.*$)/;
  const clean = (dna: string) => dna.replace(query, '').split(':').shift();

  const layers = artwork
    .flatMap(async (trait, i) => {
      const selectedVariation = trait.variations.find(
        (v) => v.id === Number(clean(dna.split('#')[i]))
      );
      if (selectedVariation) {
        const layer: Layer = {
          variation: selectedVariation,
          image: await loadImage(`${selectedVariation?.url}`)
        };
        return layer;
      }
    })
    .filter((r): r is Promise<Layer> => r !== undefined);

  return layers;
};

const drawImage = (layers: Layer[]) => {
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');

  const hue = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
  ctx.fillRect(0, 0, 512, 512);

  layers.forEach((layer) => {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(layer.image, 0, 0, 512, 512);
  });

  return canvas.toDataURL('image/png');
};

const Multiply: FC = () => {
  const { collection, setCollection } = useCollection();

  useEffect(() => {
    const multiply = () => {
      const set = new Set();
      let counter = 0;
      let failed = 0;

      while (counter <= collection.properties.size) {
        const dna = createDna(collection.artwork);

        if (!set.has(dna)) {
          const layers = constructImage(dna, collection.artwork);

          // Promise is for loadImage function from canvas
          Promise.all(layers).then((layers) => {
            const image = drawImage(layers);
            const meta = layers.map((layer) => [
              layer.variation.trait,
              layer.variation.name
            ]);

            collection.nfts.push({ image, meta });
          });

          set.add(dna);
          counter += 1;
        } else {
          console.log('DNA exists!');
          failed += 1;
          if (failed >= 10000) {
            console.log(`You need more items to grow your edition `);
            break;
          }
        }
      }
      setCollection({ ...collection });
    };
    multiply();
  }, []);

  return <div className={s.loading}>Multiplying artwork...</div>;
};

export default Multiply;
