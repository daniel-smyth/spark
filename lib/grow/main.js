import sha1 from "sha1";
import { createCanvas, loadImage } from "canvas";

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

var dnaList = new Set();
const DNA_DELIMITER = "-";

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;

export function getLayer(layerInputData) {
  return layerInputData.map((layer, index) => ({
    id: index,
    elements: getElementsClient(layer.layerImageSrcs),
    name: layer.layerName,
    blend: "source-over",
    opacity: 1,
    bypassDNA: false,
  }));
}

function getElementsClient(layerImageSrcs) {
  const layerElements = [];
  for (let i = 0; i < layerImageSrcs.length; i++) {
    const image = layerImageSrcs[i];
    if (image) {
      layerElements.push({
        id: i,
        name: cleanName(image[0]),
        filename: image[0],
        path: image[1],
        weight: getRarityWeight(image[0]),
      });
    }
  }
  return layerElements;
}

function cleanName(imageName) {
  let nameWithoutExtension = imageName.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split("#").shift();
  return nameWithoutWeight;
}

function getRarityWeight(imageName) {
  let nameWithoutExtension = imageName.slice(0, -4);
  var nameWithoutWeight = Number(nameWithoutExtension.split("#").pop());
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
}

const saveMetaData = (_loadedElement) => {
  let traits = [];
  _loadedElement.forEach((trait) => {
    traits.push(trait.layer.selectedElement.filename.replace(/\.[^/.]+$/, ""));
  });

  let elementMetadata = [];
  _loadedElement.forEach((element) => {
    const traitName = element.layer.name;
    const trait = element.layer.selectedElement.filename.replace(
      /\.[^/.]+$/,
      ""
    );
    const data = [traitName, trait];
    elementMetadata.push(data);
  });

  return elementMetadata;
};

const cleanDna = (_str) => {
  const withoutOptions = removeQueryStrings(_str);
  var dna = Number(withoutOptions.split(":").shift());
  return dna;
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

const loadLayerImg = async (_layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(_renderObject.loadedImage, 0, 0, format.width, format.height);
};

const constructLayerToDna = (_dna = "", _layers = []) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer[0].elements.find(
      (e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index])
    );
    return {
      name: layer[0].name,
      blend: layer[0].blend,
      opacity: layer[0].opacity,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

const removeQueryStrings = (_dna) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};

const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna);
  return !_DnaList.has(_filteredDNA);
};

const createDna = (_layers) => {
  let randNum = [];
  _layers.forEach((layer) => {
    layer = layer[0];
    var totalWeight = 0;
    layer.elements.forEach((element) => (totalWeight += element.weight));
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      random -= layer.elements[i].weight;
      if (random < 0) {
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        );
      }
    }
  });
  return randNum.join(DNA_DELIMITER);
};

export async function execute(collectionSize, layers) {
  let imageObjects = [];

  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes = [];
  for (let i = 1; i <= collectionSize; i++) {
    abstractedIndexes.push(i);
  }
  while (layerConfigIndex < layers.length) {
    while (editionCount <= collectionSize) {
      let newDna = createDna(layers);
      if (isDnaUnique(dnaList, newDna)) {
        let results = constructLayerToDna(newDna, layers);
        let loadedElements = [];
        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject, index) => {
            drawElement(renderObject, index, layers.length);
          });
          let image = canvas.toDataURL("image/png");
          let metadata = saveMetaData(renderObjectArray);
          let imageObject = { imgSrc: image, metadata: metadata };
          imageObjects.push(imageObject);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
              newDna
            )}`
          );
        });
        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
        console.log("DNA exists!");
        failedCount++;
        if (failedCount >= 10000) {
          console.log(
            `You need more layers or elements to grow your edition to ${collectionSize} artworks!`
          );
          break;
        }
      }
    }
    layerConfigIndex++;
  }
  return imageObjects;
}

module.exports = { execute, getLayer };
