import { Image, loadImage } from 'canvas';
import { Trait, Variation } from 'app/create/context';

export class Multiplier {
  private traits: Trait[];
  private dna = new Set();
  private fails = 0;

  constructor(data: Trait[]) {
    this.traits = data;
  }

  private createDna(): string {
    const newDna: string[] = [];

    this.traits.forEach((trait) => {
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
      this.fails += 1;

      console.log('DNA exists!');
      if (this.fails >= 10000) {
        throw new Error('You need more items to grow your edition');
      }
      return this.createDna();
    }
  }

  private cleanDna(dna: string) {
    const query = /(\?.*$)/;
    return dna.replace(query, '').split(':').shift();
  }

  public generate() {
    const dna = this.createDna();

    const layers = this.traits
      .flatMap(async (trait, i) => {
        const match = trait.variations.find((variations) => {
          variations.id === Number(this.cleanDna(dna.split('#')[i]));
        });

        if (match) {
          const layer: { image: Image; properties: Variation } = {
            image: await loadImage(`${match?.image}`),
            properties: match
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
}
