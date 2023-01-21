export class NFT {
  metadata: Record<string, any> = {};

  constructor(metadata: { name: string; description?: string }) {
    this.metadata = {
      ...metadata
    };
  }

  async insert(data: Record<string, any>) {
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof Object) {
        this.metadata[key] = { ...this.metadata[key], [key]: { ...data[key] } };
      } else if (data[key] instanceof Array) {
        this.metadata[key] = [...this.metadata[key], data[key]];
      } else {
        this.metadata[key] = data[key];
      }
    });
  }

  public toObject() {
    return this.metadata;
  }
}
