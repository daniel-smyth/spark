import { useWeb3 } from "@3rdweb/hooks";
import React, { useState } from "react";
import ConnectWalletCard from "../ConnectWalletCard";
import CreateImages from "./images/CreateImages";
import SetCollectionProperties from "./EnterCollectionDetails";
import UploadLayersAsFiles from "./images/UploadImagesAsFiles";
import UploadLayersAsFolders from "./images/UploadImagesAsFolders";
import { Text } from "@chakra-ui/react";

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
  // Outputted images.
  const [imageUrls, setImageUrls] = useState<any>();

  // Collection meta data.
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [namePrefix, setPrefix] = useState<string>("");

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
            />
          ) : (
            <CreateImages
              name={name}
              description={description}
              size={size}
              namePrefix={namePrefix}
              layerObjects={layerObjects}
              setImageUrls={setImageUrls}
            />
          )}
        </>
      ) : (
        // <LogIn />
        <Text>No wallet connected.</Text>
      )}
    </>
  );
}

export default CreateArtCollection;
