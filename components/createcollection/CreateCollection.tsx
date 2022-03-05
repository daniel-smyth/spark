import { ConnectWallet } from "@3rdweb/react";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCollectionImages from "./CreateCollectionImages";
import SetCollectionProperties from "./SetCollectionProps";
import UploadLayers from "./UploadLayers";

/**
 * Creates an NFT art collection.
 *
 * @returns react component
 */
function CreateCollection() {
  // Layer objects contain all data required to complete the
  // art engine randomisation. Objects are set in "/UploadLayers.tsx"
  const [layerObjects, setLayerObjects] = useState<any[]>();

  // Collection meta data.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState(0);
  const [namePrefix, setPrefix] = useState("");

  // TODO Remove when completed test.
  const blockchainAddress = true;

  return (
    <>
      {blockchainAddress ? (
        <>
          {!layerObjects ? (
            <UploadLayers setState={setLayerObjects} />
          ) : !(name && description && size && namePrefix) ? (
            <SetCollectionProperties
              setName={setName}
              setDescription={setDescription}
              setSize={setSize}
              setNamePrefix={setPrefix}
            />
          ) : (
            <CreateCollectionImages size={size} layerObjects={layerObjects} />
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
