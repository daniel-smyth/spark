import React from "react";

function ClientSideRandomising() {
  return <div>ClientSideRandomising</div>;
}

export default ClientSideRandomising;

const rarityDelimiter = "#";

function GetLayers(layerObject: [{ layerName: string; images: File[] }]) {
  const layers = layerObject.map((layerFolder, index) => ({
    id: index,
    elements: getElementsClient(layerFolder),
    name: layerFolder.layerName,
    blend: "source-over",
    opacity: 1,
    bypassDNA: false,
  }));

  console.log(layers);
}

function getElementsClient({
  layerName,
  images,
}: {
  layerName: string;
  images: File[];
}) {
  images.map((image: File, index: number) => {
    return {
      id: index,
      name: cleanName(image.name),
      filename: image.name,
      path: `${layerName}/${index}`,
      weight: getRarityWeight(image.name),
    };
  });
}

function getRarityWeight(imageName: string) {
  let nameWithoutExtension = imageName.slice(0, -4);
  var nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
}

function cleanDna(imageName: string) {
  const withoutOptions = removeQueryStrings(imageName);
  var dna = Number(withoutOptions.split(":").shift());
  return dna;
}

const cleanName = (imageName: string) => {
  let nameWithoutExtension = imageName.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

/**
 * Cleaning function for DNA strings. When DNA strings include an option, it
 * is added to the filename with a ?setting=value query string. It needs to be
 * removed to properly access the file name before Drawing.
 *
 * @param {String} _dna The entire newDNA string
 * @returns Cleaned DNA string without querystring parameters.
 */
function removeQueryStrings(dna: string) {
  const query = /(\?.*$)/;
  return dna.replace(query, "");
}
