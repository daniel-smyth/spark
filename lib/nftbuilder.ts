import { Image, loadImage, createCanvas } from 'canvas';
import { NFT, Trait, Variation } from 'app/create/context';

export default class NFTGenerator {
  private artwork: Trait[];

  private dnaList = new Set();

  private fails = 0;

  constructor(artwork: Trait[]) {
    this.artwork = artwork;
  }

  private makeUniqueDna(): string {
    const dna: string[] = [];

    this.artwork.forEach((trait) => {
      const totalWeight = trait.variations.reduce((a, v) => (a += v.weight), 1);
      let random = Math.floor(Math.random() * totalWeight);

      for (let i = 0; i < trait.variations.length; i += 1) {
        // Subtract current weight from random weight until reach sub zero
        random -= trait.variations[i].weight;
        if (random < 0) {
          dna.push(`${trait.variations[i].id}:${trait.variations[i].name}`);
          break;
        }
      }
    });

    if (!this.dnaList.has(dna)) {
      this.dnaList.add(dna);
      return dna.join('#');
    }

    this.fails += 1;

    console.log('DNA exists!');
    if (this.fails >= 10000) {
      throw new Error('You need more items to grow your edition');
    }

    return this.makeUniqueDna();
  }

  private mergeImages = (layers: Image[]) => {
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
    ctx.fillRect(0, 0, 512, 512);

    layers.forEach((image) => {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(image, 0, 0, 512, 512);
    });
    return canvas.toDataURL('image/png');
  };

  private async makeUniqueImage() {
    const uniqueDna = this.makeUniqueDna();

    const layers = await Promise.all(
      this.artwork
        .flatMap(async (trait) => {
          const existsInDna = trait.variations.find((variation, i) => {
            variation.id === Number(uniqueDna.split('#')[i]);
          });

          if (existsInDna) {
            return {
              variation: existsInDna,
              image: await loadImage(`${existsInDna?.image}`)
            };
          }
        })
        .filter(
          (layer): layer is Promise<{ image: Image; variation: Variation }> =>
            layer !== undefined
        )
    );

    const image = this.mergeImages(layers.map((layer) => layer.image));

    const attributes = layers.reduce((attributes: any, layer) => {
      attributes[layer.variation.trait] = layer.variation.name;
      return attributes;
    }, {});

    return { image, attributes };
  }

  async generate(
    size: number,
    options: {
      prefix?: string;
      description?: string;
    }
  ) {
    const { prefix, description = '' } = options;

    const output: NFT[] = [];

    let counter = 0;
    while (counter <= size) {
      const { image, attributes } = await this.makeUniqueImage();

      const nft: NFT = {
        name: prefix ? `${prefix} ${counter}` : `${counter}`,
        image,
        description,
        attributes
      };

      output.push(nft);
      size += 1;
    }

    return output;
  }
}
