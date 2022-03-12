import { useWeb3 } from "@3rdweb/hooks";
import React, { useState } from "react";
import CreateImages from "./CreateImages";
import SetCollectionProperties from "./EnterCollectionDetails";
import UploadLayersAsFiles from "./UploadImagesAsFiles";
import UploadLayersAsFolders from "./UploadImagesAsFolders";
import { Spinner, Stack, Text } from "@chakra-ui/react";

/**
 * Contains all components.
 *
 * @returns react component
 */
function CreateArtCollection() {
  // Web3 hook.
  const { provider } = useWeb3();

  // Layer objects contain all data required to complete the
  // art engine randomisation. Objects are set in "/UploadLayers.tsx"
  const [layerObjects, setLayerObjects] = useState<any[]>();

  // Collection meta data.
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [namePrefix, setPrefix] = useState<string>("");
  const [mintAddress, setMintAddress] = useState<string>("");
  const [saleRecipient, setSaleRecipient] = useState<string>("");

  // TODO
  function getUploadMethod() {
    return true ? (
      <UploadLayersAsFiles setState={setLayerObjects} />
    ) : (
      <UploadLayersAsFolders setState={setLayerObjects} />
    );
  }

  return (
    <>
      {provider ? (
        <>
          {!layerObjects ? (
            <UploadLayersAsFiles setState={setLayerObjects} />
          ) : !(name && description && size && namePrefix) ? (
            <SetCollectionProperties
              setName={setName}
              setDescription={setDescription}
              setSize={setSize}
              setNamePrefix={setPrefix}
              setMintAddress={setMintAddress}
              setSaleRecipient={setSaleRecipient}
            />
          ) : (
            <CreateImages
              name={name}
              description={description}
              size={size}
              prefix={namePrefix}
              mintAddress={mintAddress}
              saleRecipient={saleRecipient}
              layerObjs={layerObjects}
            />
          )}
        </>
      ) : (
        // <LogIn />
        <Stack
          minH={"50vh"}
          spacing={8}
          py={10}
          alignItems="center"
          justifyContent={"center"}
        >
          <Spinner color={"blue.500"} />
          <Stack alignItems="center">
            <Text size="lg">No wallet connected.</Text>
            <Text size="md">
              Please use the connect wallet button in the navigation bar.
            </Text>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default CreateArtCollection;
