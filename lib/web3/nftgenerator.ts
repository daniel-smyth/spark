import path from 'path';
import { NFT } from '@lib/web3/nft';

export interface Trait {
  name: string;
  variations: Array<{
    id: number;
    name: string;
    image: string;
    weight: number;
  }>;
}

export class NFTGenerator {
  DNAs: Set<string> = new Set();

  artwork: Trait[] = [];

  properties = {
    size: 0,
    name: '',
    symbol: '',
    prefix: '',
    description: '',
    primary_sale_recipient: ''
  };

  /**
   * Parse images to collection "trait" objects. Trait objects are uniquely
   * combined to create collections
   */
  public loadArtwork(images: FileList) {
    const artwork: Trait[] = [];

    for (let id = 0; id < images.length; id++) {
      const file = path.parse(images[id].name).name; // e.g. Hat_Red#8.png
      const trait = file.substring(0, file.indexOf('_')); // Hat
      const name = file.substring(file.indexOf('_') + 1, file.indexOf('#')); // Red
      const image = URL.createObjectURL(images[id]); // URL
      const weight = Number(file.split('#').pop()); // 8

      const traitExists = artwork.find((t) => t.name === trait);

      if (traitExists) {
        traitExists.variations.push({ id, name, image, weight });
      } else {
        const newTrait = {
          name: trait,
          variations: [{ id, name, image, weight }]
        };
        artwork.push(newTrait);
      }
    }

    return artwork;
  }

  private makeDNA(failCount = 0): string {
    let dna = '';

    this.artwork.forEach((trait) => {
      const totalWeight = trait.variations.reduce((a, v) => (a += v.weight), 1);
      // Subtract current weight from random weight until reach sub zero
      let random = Math.floor(Math.random() * totalWeight);
      for (let i = 0; i < trait.variations.length; i += 1) {
        random -= trait.variations[i].weight;
        if (random < 0) {
          return (dna += `${'#'}${trait.name}:${trait.variations[i].name}`);
        }
      }
    });

    if (!this.DNAs.has(dna)) {
      this.DNAs.add(dna);
      return dna;
    } else {
      failCount += 1;
      if (failCount >= 10000) {
        throw new Error('You need more items to grow your edition');
      }
      return this.makeDNA(failCount); // Recursively run function until unique we get dna
    }
  }

  async generate(size = this.properties.size || 10000) {
    const collection = [];

    let counter = 0;
    while (counter <= size) {
      const nft = new NFT();
      const dna = this.makeDNA();

      this.artwork.forEach(async (trait) => {
        const existsInDna = trait.variations.find((variation, i) => {
          `${trait.name}:${variation.name}` === dna.split('#')[i];
        });
        if (existsInDna) {
          return await nft.insert(existsInDna);
        }
      });

      nft.insert({
        name: this.properties.prefix
          ? `${this.properties.prefix} ${counter}`
          : `${counter}`,
        description: this.properties.description
      });

      const object = nft.toObject();
      collection.push(object);
      counter += 1;
    }

    return collection;
  }
}
