import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Button } from "@chakra-ui/react";
import { IMint, ICollectionProps } from "../../lib/thirdweb/interfaces/IMint";
import Mint from "../../components/web3/Mint";
import FormContainer from "../../components/FormContainer";
import UploadFiles from "../../components/web3/UploadFiles";
import SetProps from "../../components/web3/SetProps";
import Stripe from "../../components/util/Stripe";
import Summary from "../../components/web3/Summary";
import Reject from "../../components/web3/Reject";

function CreateCollection() {
  const [mintProps, setMintProps] = useState<IMint>();
  const [layers, setLayers] = useState<any[]>();
  const [props, setProps] = useState<ICollectionProps>();
  const [maxSize, setMaxSize] = useState();
  const address = useAddress();

  const mint = () => (layers && props ? setMintProps({ layers, props }) : null);

  if (address == undefined) return <Reject />;
  if (mintProps) return <Mint {...mintProps!} />;
  return !mintProps ? (
    <FormContainer>
      {!layers ? (
        <UploadFiles layerState={setLayers} sizeState={setMaxSize} />
      ) : !props ? (
        <SetProps setPropsState={setProps} maxSize={maxSize! - 1} />
      ) : (
        // ) : !paid ? (
        //   <Stripe amount={99.99} paidState={setPaid} />
        <>
          <Summary {...props} />
          <Button variant={"solid"} size={"md"} onClick={mint}>
            MINT
          </Button>
        </>
      )}
    </FormContainer>
  ) : null;
}

export default CreateCollection;
