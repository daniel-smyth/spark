import { createCanvas, loadImage } from 'canvas';
import { Collection, Trait } from 'app/create/context';

interface LayerElement {
  id: number;
  name: string | undefined;
  fileName: string;
  path: string;
  weight: number;
}

interface ProcessedLayer {
  id: number;
  elements: LayerElement[];
  name: string;
  blend: string;
  opacity: number;
  bypassDNA: boolean;
}

interface ConstructedLayer {
  name: string;
  blend: string;
  opacity: number;
  selectedElement: LayerElement | undefined;
}

// DNA config
const dnaList = new Set();
const RARITY_DELIMITER = '#';
const DNA_DELIMITER = '-';
const UNIQUE_DNA_TOLLERANCE = 10000;

// Canvas config
const background = {
  generate: true,
  brightness: '80%',
  static: false,
  default: '#000000'
};

const format = {
  width: 512,
  height: 512,
  smoothing: false
};

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = format.smoothing;

const cleanName = (imageName: string) => {
  const nameWithoutExtension = imageName.slice(0, -4);

  const nameWithoutWeight = nameWithoutExtension
    .split(RARITY_DELIMITER)
    .shift();

  return nameWithoutWeight;
};

const getRarityWeight = (imageName: string) => {
  const nameWithoutExtension = imageName.slice(0, -4);

  let nameWithoutWeight = Number(
    nameWithoutExtension.split(RARITY_DELIMITER).pop()
  );

  if (Number.isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }

  return nameWithoutWeight;
};

const createLayers = (layers: Trait[]) =>
  layers.map((layer, i) => {
    const hashlipsLayer = {
      id: i,
      name: layer.name,
      blend: 'source-over',
      opacity: 1,
      bypassDNA: false,
      elements: layer.variations.map((variation, j) => ({
        id: j,
        name: cleanName(variation.name),
        fileName: variation.name,
        path: variation.url,
        weight: getRarityWeight(variation.name)
      }))
    };

    return hashlipsLayer;
  });

const createDna = (layers: ProcessedLayer[]) => {
  const randNum: string[] = [];

  // eslint-disable-next-line consistent-return
  layers.forEach((layer) => {
    let totalWeight = 0;

    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });

    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < layer.elements.length; i += 1) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;

      if (random < 0) {
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].fileName}${
            layer.bypassDNA ? '?bypassDNA=true' : ''
          }`
        );
      }
    }
  });

  return randNum.join(DNA_DELIMITER);
};

const filterDNAOptions = (dna: string) => {
  const dnaItems = dna.split(DNA_DELIMITER);

  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);

    if (!querystring) {
      return true;
    }

    const options = querystring[1]
      .split('&')
      .reduce((r: { [key: string]: string }, setting) => {
        const keyPairs = setting.split('=');
        return { ...r, [keyPairs[0]]: keyPairs[1] };
      }, {});

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

const isDnaUnique = (dna = '') => {
  const filteredDNA = filterDNAOptions(dna);

  return !dnaList.has(filteredDNA);
};

const removeQueryStrings = (dna: string) => {
  const query = /(\?.*$)/;

  return dna.replace(query, '');
};

const cleanDna = (dna: string) => {
  const withoutOptions = removeQueryStrings(dna);
  const cleaned = Number(withoutOptions.split(':').shift());

  return cleaned;
};

const constructLayerToDna = (dna: string, layers: ProcessedLayer[]) => {
  const mappedDnaToLayers = layers.map((layer, i) => {
    const selectedElement = layer.elements.find(
      (e) => e.id === cleanDna(dna.split(DNA_DELIMITER)[i]) && e
    );

    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement
    };
  });

  return mappedDnaToLayers;
};

const loadLayerImg = async (layer: ConstructedLayer) => {
  const image = await loadImage(`${layer.selectedElement!.path}`);

  return { layer, image };
};

const genColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

const drawElement = (renderObject: { layer: ConstructedLayer; image: any }) => {
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';

  ctx.drawImage(renderObject.image, 0, 0, format.width, format.height);
};

const saveImage = () => canvas.toDataURL('image/png');

const saveMetaData = (
  renderObjectArray: { layer: ConstructedLayer; image: any }[]
) => {
  const traits = [];

  renderObjectArray.forEach((trait) => {
    traits.push(trait.layer.selectedElement!.fileName.replace(/\.[^/.]+$/, ''));
  });

  const elementMetadata: string[][] = [];

  renderObjectArray.forEach((element) => {
    const traitName = element.layer.name;
    const trait = element.layer.selectedElement!.fileName.replace(
      /\.[^/.]+$/,
      ''
    );

    const data = [traitName, trait];
    elementMetadata.push(data);
  });

  return elementMetadata;
};

// const multiplyArtwork = async (collection: Collection) => {
const multiplyArtwork = (collection: Collection) => {
  const processedLayers = createLayers(collection.artwork as Trait[]);

  const imageObjects: {
    imgSrc: string;
    metadata: string[][];
  }[] = [];
  const abstractedIndexes: number[] = [];
  let editionCount = 1;
  let failedCount = 0;

  for (let i = 1; i <= collection.properties.size; i += 1) {
    abstractedIndexes.push(i);
  }

  while (editionCount <= collection.properties.size) {
    const newDna = createDna(processedLayers);

    if (isDnaUnique(newDna)) {
      const results = constructLayerToDna(newDna, processedLayers);

      const loadedElements: Promise<{ layer: ConstructedLayer; image: any }>[] =
        [];

      results.forEach((layer) => {
        loadedElements.push(loadLayerImg(layer));
      });

      // eslint-disable-next-line no-await-in-loop
      // await Promise.all(loadedElements).then((renderObjectArray) => {
      Promise.all(loadedElements).then((renderObjectArray) => {
        console.log(renderObjectArray);

        drawBackground();

        renderObjectArray.forEach((renderObject) => {
          drawElement(renderObject);
        });

        const image = saveImage();
        const metadata = saveMetaData(renderObjectArray);

        const imageObject = {
          imgSrc: image,
          metadata
        };

        imageObjects.push(imageObject);

        console.log(
          `Created edition: ${abstractedIndexes[0]}, with DNA: ${newDna}`
        );
      });

      dnaList.add(filterDNAOptions(newDna));
      abstractedIndexes.shift();
      editionCount += 1;
    } else {
      console.log('DNA exists!');
      failedCount += 1;
      if (failedCount >= UNIQUE_DNA_TOLLERANCE) {
        console.log(
          `You need more layers or elements to grow your edition to ${collection.properties.size} artworks!`
        );
        break;
      }
    }
  }

  return imageObjects;
};

export default multiplyArtwork;
