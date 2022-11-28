/* eslint-disable @typescript-eslint/no-shadow */
import Path from 'path';
import sha1 from 'sha1';
import { createCanvas, loadImage } from 'canvas';
import {
  ConstructedLayer,
  Layer,
  ProcessedLayer
} from '../../types/CreateCollection';

const rarityDelimiter = '#';

const DNA_DELIMITER = '-';
const dnaList = new Set();
const uniqueDnaTollerance = 10000;

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
  const nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();

  return nameWithoutWeight;
};

const getRarityWeight = (imageName: string) => {
  const nameWithoutExtension = imageName.slice(0, -4);

  let nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );

  if (Number.isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }

  return nameWithoutWeight;
};

const createLayer = (rawLayer: Layer, index: number) => {
  const hashlipsLayer: ProcessedLayer = {
    id: index,
    name: rawLayer.name,
    blend: 'source-over',
    opacity: 1,
    bypassDNA: false,
    elements: rawLayer.types.map((trait, i) => ({
      id: i,
      name: cleanName(trait.name),
      fileName: trait.name,
      path: trait.url,
      weight: getRarityWeight(trait.name)
    }))
  };

  return hashlipsLayer;
};

const createDna = (layers: ProcessedLayer[]) => {
  const randNum: string[] = [];

  layers.forEach((layer) => {
    let totalWeight = 0;

    layer.elements.forEach((element) => {
      totalWeight += element.weight; // adds total of weights for all images
    });

    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < layer.elements.length; i += 1) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;

      if (random < 0) {
        randNum.push(
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

const isDnaUnique = (dnaList = new Set(), dna = '') => {
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
    console.log(layer);
    const selectedElement = layer.elements.find((e) => {
      console.log(e);
      console.log(dna);
      console.log(dna.split(DNA_DELIMITER)[i]);
      if (e.id === cleanDna(dna.split(DNA_DELIMITER)[i])) return e;
    });

    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement
    };
  });

  console.log(mappedDnaToLayers);

  return mappedDnaToLayers;
};

const loadLayerImg = async (layer: ConstructedLayer) => {
  try {
    const image = await loadImage(`${layer.selectedElement!.path}`);

    return { layer, loadedImage: image };
  } catch (error) {
    console.error('Error loading image:', error);
    return undefined;
  }
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

const drawElement = (renderObject: {
  layer: ConstructedLayer;
  loadedImage: any;
}) => {
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';

  ctx.drawImage(renderObject.loadedImage, 0, 0, format.width, format.height);
};

const saveImage = () => canvas.toDataURL('image/png');

const saveMetaData = (
  renderObjectArray: {
    layer: ConstructedLayer;
    loadedImage: any;
  }[]
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

const multiplyArtwork = async (layers: Layer[], collectionSize: number) => {
  const processedLayers = layers.map((layer, i) => {
    const hashlipsLayer = createLayer(layer, i);

    return hashlipsLayer;
  });

  const imageObjects: { imgSrc: string; metadata: string[][] }[] = [];
  const abstractedIndexes: number[] = [];
  let editionCount = 1;
  let failedCount = 0;

  for (let i = 1; i <= collectionSize; i += 1) {
    abstractedIndexes.push(i);
  }

  while (editionCount <= collectionSize) {
    const newDna = createDna(processedLayers);

    if (isDnaUnique(dnaList, newDna)) {
      const results = constructLayerToDna(newDna, processedLayers);

      const loadedElements: { layer: ConstructedLayer; loadedImage: any }[] =
        [];

      results.forEach(async (layer) => {
        // const constructedLayer = await loadLayerImg(layer);
        if (constructedLayer) loadedElements.push(constructedLayer);
      });

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(loadedElements).then((renderObjectArray) => {
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

        // console.log(
        //   `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(newDna)}`
        // );
      });

      dnaList.add(filterDNAOptions(newDna));
      abstractedIndexes.shift();
      editionCount += 1;
    } else {
      // console.log('DNA exists!');
      failedCount += 1;
      if (failedCount >= uniqueDnaTollerance) {
        // console.log(
        //   `You need more layers or elements to grow your edition to ${collectionSize} artworks!`
        // );
        break;
      }
    }
  }

  console.log(processedLayers);

  return imageObjects;
};

export default multiplyArtwork;
