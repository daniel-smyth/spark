import { Image, loadImage } from 'canvas';
import { Trait, Variation } from 'app/create/context';

export class ArtMultiplier {
  private dnaSet = new Set();

  private failCount = 0;

  private artwork: Trait[];

  constructor(artwork: Trait[]) {
    this.artwork = artwork;
  }

  private createDna(): string {
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

    if (!this.dnaSet.has(dna)) {
      this.dnaSet.add(dna);
      return dna.join('#');
    }

    this.failCount += 1;

    console.log('DNA exists!');
    if (this.failCount >= 10000) {
      throw new Error('You need more items to grow your edition');
    }

    return this.createDna();
  }

  public generate() {
    const dna = this.createDna();

    const generatedImage = this.artwork
      .flatMap(async (trait) => {
        const traitInDna = trait.variations.find((variation, i) => {
          variation.id === Number(dna.split('#')[i]);
        });

        if (traitInDna) {
          const layer: { image: Image; variation: Variation } = {
            image: await loadImage(`${traitInDna?.image}`),
            variation: traitInDna
          };
          return layer;
        }
      })
      .filter(
        (i): i is Promise<{ image: Image; variation: Variation }> =>
          i !== undefined
      );

    return generatedImage;
  }
}
