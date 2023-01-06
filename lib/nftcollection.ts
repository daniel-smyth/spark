import p from 'path';
import { Image, createCanvas, loadImage } from 'canvas';

const SEPARATOR = '#';

export class NFTCollection {
  uid: Set<string> = new Set();

  artwork: {
    name: string;
    variations: { id: number; name: string; image: string; weight: number }[];
  }[] = [];

  properties = {
    size: 0,
    name: '',
    symbol: '',
    prefix: '',
    description: '',
    primary_sale_recipient: ''
  };

  setArtwork(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = p.parse(files[i].name).name; // e.g. Hat_Red#2.png

      const trait = this.artwork.find(
        (t) => t.name === file.substring(0, file.indexOf('_'))
      );

      const variation = {
        id: i,
        name: file.substring(file.indexOf('_') + 1, file.indexOf(SEPARATOR)),
        image: URL.createObjectURL(files[i]),
        weight: Number(file.split(SEPARATOR).pop())
      };

      if (trait) {
        trait.variations.push(variation);
      } else {
        this.artwork.push({
          name: file.substring(0, file.indexOf('_')),
          variations: [variation]
        });
      }
    }
  }

  getArtwork() {
    return this.artwork;
  }

  setProperties(properties: typeof this.properties) {
    this.properties = properties;
  }

  getProperties() {
    return this.properties;
  }

  private makeUniqueDna(failCount = 0): string {
    let dna = '';

    this.artwork.forEach((trait) => {
      const totalWeight = trait.variations.reduce((a, v) => (a += v.weight), 1);
      let random = Math.floor(Math.random() * totalWeight);

      for (let i = 0; i < trait.variations.length; i += 1) {
        // Subtract current weight from random weight until reach sub zero
        random -= trait.variations[i].weight;
        if (random < 0) {
          dna += `${SEPARATOR}${trait.name}:${trait.variations[i].name}`;
          break;
        }
      }
    });

    if (!this.uid.has(dna)) {
      this.uid.add(dna);
      return dna;
    } else {
      failCount += 1;
      if (failCount >= 10000) {
        throw new Error('You need more items to grow your edition');
      }
      return this.makeUniqueDna(failCount); // Recursively run function until unique dna exists
    }
  }

  async makeUniqueImage(dna: string) {
    let image = '';
    let attributes: Record<string, string> = {};

    const layers = await Promise.all(
      this.artwork
        .flatMap(async (trait) => {
          const existsInDna = trait.variations.find((variation, i) => {
            `${trait.name}:${variation.name}` === dna.split('#')[i];
          });
          if (existsInDna) {
            attributes[trait.name] = existsInDna.name;
            return await loadImage(`${existsInDna.image}`);
          }
        })
        .filter((layer): layer is Promise<Image> => layer !== undefined)
    );

    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
    ctx.fillRect(0, 0, 512, 512);

    layers.forEach((image) => {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(image, 0, 0, 512, 512);
    });

    image = canvas.toDataURL('image/png');

    return {
      image,
      attributes
    };
  }

  async generate() {
    const output = [];

    let counter = 0;
    while (counter <= this.properties.size) {
      const uid = this.makeUniqueDna();
      const image = await this.makeUniqueImage(uid);

      const nft = {
        name: this.properties.prefix
          ? `${this.properties.prefix} ${counter}`
          : `${counter}`,
        description: this.properties.description,
        ...image
      };

      output.push(nft);
      counter += 1;
    }

    return output;
  }
}
