import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ConnectWallet } from "@3rdweb/react";
import ButtonWithLoading from "../components/utils/ButtonWithLoading";
import UploadFolder from "../components/utils/UploadFolder";

function UploadToClient() {
  const [layerCount, setLayerSize] = useState(1);
  const [layerName1, setLayerName1] = useState("");
  const [layerName2, setLayerName2] = useState("");
  const [layerName3, setLayerName3] = useState("");
  const [layerName4, setLayerName4] = useState("");
  const [layerName5, setLayerName5] = useState("");
  const layerNameStates = [
    setLayerName1,
    setLayerName2,
    setLayerName3,
    setLayerName4,
    setLayerName5,
  ];
  const layerList = ["Layer 1", "Layer 2", "Layer 3", "Layer 4", "Layer 5"];
  const [layerFiles, setImageLayers] = useState<FileList[]>([]);

  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSize, setCollectionSize] = useState("");
  const [imagePrefix, setImageNamePrefix] = useState("");

  function addLayerFileToState(layer: FileList) {
    layerFiles.push(layer);
    setImageLayers(layerFiles);
  }

  function execute() {
    const layerNames = [
      layerName1,
      layerName2,
      layerName3,
      layerName4,
      layerName5,
    ];
    if (layerFiles.length > 0)
      layerFiles.forEach((fileList, i) => {
        getLayers([{ layerName: layerNames[i], images: fileList }]);
      });
  }

  return (
    <Container display={"flex"}>
      <Stack
        spacing={6}
        py={10}
        px={10}
        pb={20}
        align={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Heading fontSize={{ base: "3xl", md: "4xl" }}>
          Create NFT Collection
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={6}>
            <ConnectWallet w={"60%"} variant={"solid"} alignSelf="center" />
            <FormControl is="count" isRequired>
              <FormLabel>Enter layers size</FormLabel>
              <NumberInput
                defaultValue={1}
                onChange={(e) => setLayerSize(Number(e))}
              >
                <NumberInputField bg="white" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            {layerList.map((_l, i) => {
              if (i < layerCount)
                return (
                  <>
                    <FormControl is="count" isRequired>
                      <FormLabel>Enter layer name {i + 1}</FormLabel>
                      <Input
                        onChange={(e) => layerNameStates[i](e.target.value)}
                      ></Input>
                    </FormControl>
                    <UploadFolder
                      index={i + 1}
                      layerState={addLayerFileToState}
                    />
                  </>
                );
            })}
            <Text size="md">
              Enter the metadata to be stored with your NFT collection
            </Text>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection name</FormLabel>
              <Input
                onChange={(e) => setCollectionName(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection description</FormLabel>
              <Input
                onChange={(e) => setCollectionDescription(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter image prefix</FormLabel>
              <Input
                onChange={(e) => setImageNamePrefix(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection size</FormLabel>
              <NumberInput onChange={(e) => setCollectionSize(e)}>
                <NumberInputField bg="white" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <ButtonWithLoading
              w="100%"
              buttontext="Create collection"
              loadingText="Creating.."
              size="md"
              variant="solid"
              onClick={execute}
            ></ButtonWithLoading>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default UploadToClient;

const rarityDelimiter = "#";

function getLayers(layerObject: [{ layerName: string; images: FileList }]) {
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
  images: FileList;
}) {
  for (let i = 0; i < images.length; i++) {
    const image = images.item(i);
    if (image) {
      return {
        id: i,
        name: cleanName(image.name),
        filename: image.name,
        path: `${layerName}/${i}`,
        weight: getRarityWeight(image.name),
      };
    }
  }
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
