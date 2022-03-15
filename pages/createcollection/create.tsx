import { useWeb3 } from "@3rdweb/hooks";
import React, { useState } from "react";
import CreateImages from "../../components/web3/createcollection/CreateImages";
import SetCollectionProperties from "../../components/web3/createcollection/EnterCollectionDetails";
import UploadLayersAsFiles from "../../components/web3/createcollection/UploadImagesAsFiles";
import UploadLayersAsFolders from "../../components/web3/createcollection/UploadImagesAsFolders";
import { Spinner, Stack, Text } from "@chakra-ui/react";
import { withRouter } from "next/router";
import CreateCollectionContainer from "../../components/form/CreateCollectionContainer";
import UploadLayers from "../../components/web3/createcollection/UploadLayers";

/**
 * Contains all components. Props may contain a preset collection size
 * from the calculator.
 *
 * @returns react component
 */
function CreateCollection(props: any) {
  // Web3 hook.
  const { provider } = useWeb3();

  // Layer objects contain all data required to complete the
  // art engine randomisation. Objects are set in "/UploadLayers.tsx"
  const [layerObjects, setLayerObjects] = useState<any[]>();

  // Collection meta data.
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [namePrefix, setPrefix] = useState<string>("");
  const [mintAddress, setMintAddress] = useState<string>("");
  const [saleRecipient, setSaleRecipient] = useState<string>("");

  // Set collection size.
  const [size, setSize] = useState<number>(
    props.router.query.size ? props.router.query.size : 0
  );

  // Form data.
  const [formTitle, setFormTitle] = useState("Upload Layers");

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
          <CreateCollectionContainer title={formTitle}>
            <UploadLayers setState={setLayerObjects} />
          </CreateCollectionContainer>

          {!layerObjects ? (
            <UploadLayersAsFiles setState={setLayerObjects} />
          ) : !(name && description && size && namePrefix) ? (
            <SetCollectionProperties
              presetSize={size}
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

export default withRouter(CreateCollection);
