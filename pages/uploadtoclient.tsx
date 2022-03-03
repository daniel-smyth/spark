import React, { useState } from "react";
import {
  Box,
  Center,
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

import Dropzone from "react-dropzone";
// import { getDroppedOrSelectedFiles } from "html5-file-selector";

function UploadToClient() {
  const [imageLayers, setImageLayers] = useState<any>();
  // Collection details.
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSize, setCollectionSize] = useState("");
  const [imagePrefix, setImageNamePrefix] = useState("");

  function createCollection() {
    console.log(imageLayers);
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
            <label htmlFor="layer-upload">
              <Center
                p={6}
                cursor="pointer"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                transition="background-color 0.2s ease"
                borderRadius={4}
                border="3px dashed"
                borderColor="gray.300"
                onClic
              >
                <Input
                  display={"none"}
                  id="layer-upload"
                  type="file"
                  name="myImage"
                  directory=""
                  webkitdirectory=""
                  onChange={(e) => {
                    setImageLayers(e.target.files);
                  }}
                />
                <Text color={"black"}>Click to upload images</Text>
              </Center>
            </label>
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
                h={"5em"}
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
              onClick={createCollection}
            ></ButtonWithLoading>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default UploadToClient;
