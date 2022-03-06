import { ConnectWallet } from "@3rdweb/react";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateImages from "./CreateImages";
import DisplayImages from "./DisplayImages";
import SetCollectionProperties from "./EnterCollectionDetails";
import StoreImageIpfsUrls from "./StoreImageIpfsUrls";
import UploadLayersAsFiles from "./upload/UploadLayerAsFiles";
import UploadLayersAsFolders from "./upload/UploadLayersAsFolders";

/**
 * Contains all components.
 *
 * @returns react component
 */
function CreateCollection() {
  // Layer objects contain all data required to complete the
  // art engine randomisation. Objects are set in "/UploadLayers.tsx"
  const [layerObjects, setLayerObjects] = useState<any[]>();

  // Collection meta data.
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [namePrefix, setPrefix] = useState<string>("");

  // Outputted images.
  const [imageUrls, setImageUrls] = useState<any>();

  // TODO Remove when completed test.
  const blockchainAddress = true;

  // Storing IPFS.
  const [storingInitiated, setStoringInitiated] = useState(false);
  function startStoring() {
    setStoringInitiated(true);
  }

  function getUploadMethod() {
    return true ? (
      <UploadLayersAsFiles setState={setLayerObjects} />
    ) : (
      <UploadLayersAsFolders setState={setLayerObjects} />
    );
  }

  return (
    <>
      {blockchainAddress ? (
        <>
          {!layerObjects ? (
            <UploadLayersAsFiles setState={setLayerObjects} />
          ) : !(name && description && size && namePrefix) ? (
            <SetCollectionProperties
              setName={setName}
              setDescription={setDescription}
              setSize={setSize}
              setNamePrefix={setPrefix}
            />
          ) : !imageUrls ? (
            <CreateImages
              size={size}
              layerObjects={layerObjects}
              setImageUrls={setImageUrls}
            />
          ) : !storingInitiated ? (
            <DisplayImages
              count={size}
              allUrls={imageUrls}
              setState={startStoring}
            />
          ) : (
            <StoreImageIpfsUrls size={size} name={name} allUrls={imageUrls} />
          )}
        </>
      ) : (
        <>
          <Text size="md">
            Please connect your wallet to mint your collection
          </Text>
          <ConnectWallet variant={"solid"} />
        </>
      )}
    </>
  );
}

export default CreateCollection;
