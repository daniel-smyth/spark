import {
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  loadImage
} from 'canvas';
import { NFTInputOrUriSchema } from '@thirdweb-dev/sdk/dist/declarations/src/core/schema/nft';
import NFT from './nft';

export default class NFTImage extends NFT {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;

  constructor(metadata: { name: string; description?: string }) {
    super(metadata);
    this.canvas = createCanvas(550, 550);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  public getMeta() {
    this.metadata.image = this.canvas.toDataURL('image/png');
    return this.metadata;
  }

  async insertMeta(data: { [key: string]: any }) {
    const image = await loadImage(data.image);
    this.ctx.drawImage(image, 0, 0, 500, 500);
    delete data.image;

    Object.keys(data).forEach((key) => {
      if (key in NFTInputOrUriSchema) {
        if (data[key] instanceof Object) {
          this.metadata[key] = {
            ...this.metadata[key],
            [key]: { ...data[key] }
          };
        } else if (data[key] instanceof Array) {
          this.metadata[key] = [...this.metadata[key], data[key]];
        } else {
          this.metadata[key] = data[key];
        }
      }
    });
  }
}
