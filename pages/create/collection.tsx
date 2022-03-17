import { useWeb3 } from "@3rdweb/hooks";
import React, { useState } from "react";
import SetCollectionProperties from "../../components/web3/collection/EnterInfo";
import UploadLayersAsFolders from "../../components/web3/collection/UploadFolders";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withRouter } from "next/router";
import CreateCollectionContainer from "../../components/form/CreateCollectionContainer";
import UploadLayers from "../../components/web3/collection/UploadFiles";
import Spark3Black from "../../components/logo/spark3black";
import CreateImages from "../../components/web3/collection/Create";
import Reject from "../../components/web3/Reject";

/**
 * Contains all components. Props may contain a preset collection size
 * from the calculator.
 *
 * @returns react component
 */
function CreateCollection(props: any) {
  // Collection details.
  let collectionDetails: {
    size: number;
    name: string;
    description: string;
    prefix: string;
    mintTo: string;
    saleRecipient: string;
  };
  const [info, setInfo] = useState(collectionDetails!);

  let size = props.router.query.size ? props.router.query.size : 0;

  // Layer objects contain all data required for Hashlips
  const [layerObjects, setLayerObjects] = useState<any[]>();

  // ThirdWeb.
  const { provider } = useWeb3();

  // TODO
  function getUploadMethod() {
    <UploadLayersAsFolders setState={setLayerObjects} />;
  }

  function title() {
    return <Heading size="md">Set Layer Order</Heading>;
  }

  return (
    <>
      {provider ? (
        <>
          {info && layerObjects ? (
            <CreateImages info={info} layerObjs={layerObjects} />
          ) : (
            <CreateCollectionContainer>
              <SimpleGrid columns={{ base: 1, md: 2 }} pb={8}>
                <Heading size="md">Upload Layers</Heading>
                <Box display={{ base: "none", md: "flex" }} pl={32}>
                  <Spark3Black width={60} />
                </Box>
              </SimpleGrid>

              {!layerObjects ? (
                <>
                  <UploadLayers setState={setLayerObjects} />
                </>
              ) : !info ? (
                <SetCollectionProperties presetSize={size} setState={setInfo} />
              ) : null}
            </CreateCollectionContainer>
          )}
        </>
      ) : (
        <Reject />
      )}
    </>
  );
}

export default withRouter(CreateCollection);
