import { ConnectWallet } from "@3rdweb/react";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateImages from "../components/web3/createcollection/CreateImages";
import DisplayImages from "../components/web3/createcollection/DisplayImages";
import SetCollectionProperties from "../components/web3/createcollection/EnterCollectionDetails";
import StoreImageIpfsUrls from "../components/web3/createcollection/StoreImageIpfsUrls";
import UploadLayersAsFiles from "../components/web3/createcollection/upload/UploadLayerAsFiles";
import UploadLayersAsFolders from "../components/web3/createcollection/upload/UploadLayersAsFolders";

/**
 * Contains all components.
 *
 * @returns react component
 */
function CreateCollection() {
  // Layer objects contain all data required to complete the
  // art engine randomisation. Objects are set in "/UploadLayers.tsx"
  const [layerObjects, setLayerObjects] = useState<any[]>();
  // Outputted images.
  const [imageUrls, setImageUrls] = useState<any>();

  // Collection meta data.
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [namePrefix, setPrefix] = useState<string>("");

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
          ) : (
            <CreateImages
              name={name}
              size={size}
              layerObjects={layerObjects}
              setImageUrls={setImageUrls}
            />
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
