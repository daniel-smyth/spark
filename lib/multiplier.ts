import { Image, loadImage } from 'canvas';
import { Trait, Variation } from 'app/create/context';

export class Multiplier {
  private data: Trait[];
  private dna = new Set();
  private fails = 0;

  constructor(data: Trait[]) {
    this.data = data;
  }

  private create(): string {
    const newDna: string[] = [];

    this.data.forEach((trait) => {
      const weight = trait.variations.reduce((acc, v) => (acc += v.weight), 1);
      let random = Math.floor(Math.random() * weight);

      for (let i = 0; i < trait.variations.length; i += 1) {
        // Subtract current weight from random weight until reach sub zero
        random -= trait.variations[i].weight;

        if (random < 0) {
          newDna.push(`${trait.variations[i].id}:${trait.variations[i].name}`);
          break;
        }
      }
    });

    if (!this.dna.has(newDna)) {
      this.dna.add(newDna);
      return newDna.join('#');
    } else {
      console.log('DNA exists!');
      this.fails += 1;
      if (this.fails >= 10000) {
        throw new Error('You need more items to grow your edition');
      }
      return this.create();
    }
  }

  private parse(dna: string) {
    const query = /(\?.*$)/;
    const clean = (dna: string) => dna.replace(query, '').split(':').shift();

    const layers = this.data
      .flatMap(async (trait, i) => {
        const selectedVariation = trait.variations.find(
          (v) => v.id === Number(clean(dna.split('#')[i]))
        );
        if (selectedVariation) {
          const layer: { image: Image; properties: Variation } = {
            image: await loadImage(`${selectedVariation?.image}`),
            properties: selectedVariation
          };
          return layer;
        }
      })
      .filter(
        (r): r is Promise<{ image: Image; properties: Variation }> =>
          r !== undefined
      );

    return layers;
  }

  generate() {
    const dna = this.create();
    const layers = this.parse(dna);

    return layers;
  }
}
