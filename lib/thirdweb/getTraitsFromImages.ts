export function getTraitsFromImages(files: FileList) {
  const traits: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const name = files[i].name.substring(0, files[i].name.indexOf("_"));
    if (!traits.includes(name)) traits.push(name);
  }

  const layers = traits.map((layerName) => [layerName, []]);
  for (let i = 0; i < files.length; i++) {
    const trait = files[i].name.substring(0, files[i].name.indexOf("_"));
    const type = files[i].name.substring(files[i].name.indexOf("_") + 1);
    const url = URL.createObjectURL(files[i]);
    layers.forEach((layer) => {
      if (layer[0] == trait) {
        const urlArray = layer[1] as Array<any[]>;
        urlArray.push([type, url]);
      }
    });
  }

  return { traits, layers };
}
