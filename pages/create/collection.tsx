import React, { useState } from "react";
import { withRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import Reject from "../../components/web3/Reject";
import FormContainer from "../../components/form/FormContainer";
import UploadFiles from "../../components/web3/collection/UploadFiles";
import UploadLayersAsFolders from "../../components/web3/collection/UploadFolders";
import SetCollectionProps from "../../components/web3/collection/SetProps";
import Create from "../../components/web3/collection/Mint";
import SetCollectionSize from "../../components/web3/collection/SetSize";
import Payment from "../../components/web3/collection/Payment";
/**
 * Contains all components. Props may contain a preset collection size
 * from the calculator.
 *
 * @returns react component
 */
function CreateCollection() {
  let collectionDetails: {
    name: string;
    description: string;
    prefix: string;
    mintTo: string;
    saleRecipient: string;
  };
  const [info, setInfo] = useState(collectionDetails!);
  const [maxSize, setMaxSize] = useState(0);
  const [paid, setPaid] = useState(false);
  const [size, setSize] = useState(0);

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
      {address != undefined ? (
        <>
          {paid && info && layerObjects ? (
            <Create size={size} info={info} layerObjs={layerObjects} />
          ) : (
            <FormContainer>
              {!layerObjects ? (
                <UploadFiles
                  setLayers={setLayerObjects}
                  setMaxSize={setMaxSize}
                />
              ) : !size ? (
                <SetCollectionSize maxSize={maxSize - 1} setState={setSize} />
              ) : !info ? (
                <SetCollectionProps setState={setInfo} />
              ) : !paid ? (
                <Payment setState={setPaid} />
              ) : null}
            </FormContainer>
          )}
        </>
      ) : (
        <Reject />
      )}
    </>
  );
}

export default withRouter(CreateCollection);
