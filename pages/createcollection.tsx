import { useWeb3 } from "@3rdweb/hooks";
import { ConnectWallet } from "@3rdweb/react";
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LogIn from "../components/LogIn";
import ConnectWalletCard from "../components/web3/ConnectWalletCard";
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
        <ConnectWalletCard />
      )}
    </>
  );
}

export default CreateCollection;
