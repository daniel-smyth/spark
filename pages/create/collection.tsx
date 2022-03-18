import React, { useState } from "react";
import { withRouter } from "next/router";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import Spark3Black from "../../components/logo/spark3black";
import Reject from "../../components/web3/Reject";
import CreateCollectionContainer from "../../components/form/CreateCollectionContainer";
import UploadFiles from "../../components/web3/collection/UploadFiles";
import UploadLayersAsFolders from "../../components/web3/collection/UploadFolders";
import CollectionInputForm from "../../components/web3/collection/InputForm";
import Create from "../../components/web3/collection/Mint";

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
  const address = useAddress();

  // TODO
  function getUploadMethod() {
    <UploadLayersAsFolders setState={setLayerObjects} />;
  }

  return (
    <>
      {address ? (
        <>
          {info && layerObjects ? (
            <Create info={info} layerObjs={layerObjects} />
          ) : (
            <CreateCollectionContainer>
              <SimpleGrid columns={{ base: 1, md: 2 }} pb={8}>
                <Box display={{ base: "none", md: "flex" }}>
                  <Spark3Black width={60} />
                </Box>
              </SimpleGrid>

              {!layerObjects ? (
                <>
                  <UploadFiles setState={setLayerObjects} />
                </>
              ) : !info ? (
                <CollectionInputForm presetSize={size} setState={setInfo} />
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
