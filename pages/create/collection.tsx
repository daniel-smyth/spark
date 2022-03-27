import React, { useState } from "react";
import { withRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import FormContainer from "../../components/form/FormContainer";
import UploadFiles from "../../components/web3/collection/UploadFiles";
import SetProps from "../../components/web3/collection/SetProps";
import Stripe from "../../components/utilities/Stripe";
import Create from "../../components/web3/collection/Mint";
import Reject from "../../components/web3/Reject";

function CreateCollection() {
  const [info, setInfo] = useState();
  const [maxSize, setMaxSize] = useState();
  const [size, setSize] = useState();
  const [layers, setLayers] = useState<any[]>();
  const [paid, setPaid] = useState(false);
  const address = useAddress();

  return address != undefined ? (
    paid ? (
      <Create size={size!} info={info!} layerObjs={layers!} />
    ) : (
      <FormContainer>
        {!layers ? (
          <UploadFiles layerState={setLayers} sizeState={setMaxSize} />
        ) : !size && !info ? (
          <SetProps
            maxSize={maxSize! - 1}
            infoState={setInfo}
            sizeState={setSize}
          />
        ) : !paid ? (
          <Stripe amount={199.99} paid={paid} paidState={setPaid} />
        ) : null}
      </FormContainer>
    )
  ) : (
    <Reject />
  );
}

export default withRouter(CreateCollection);
