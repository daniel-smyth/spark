import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Button, Stack } from "@chakra-ui/react";
import { IMint, ICollectionProps } from "../lib/thirdweb/interfaces/IMint";
import Mint from "../components/web3/Mint";
import FormContainer from "../components/form/FormContainer";
import SetProps from "../components/web3/SetProps";
import Fees from "../components/web3/Fees";
import Summary from "../components/web3/Summary";
import Reject from "../components/web3/Reject";
import Gas from "../components/web3/util/Gas";
import UploadImages from "../components/web3/Upload";

function CreateCollection() {
  const [mintProps, setMintProps] = useState<IMint>();
  const [layers, setLayers] = useState<any[]>();
  const [props, setProps] = useState<ICollectionProps>();
  const [paid, setPaid] = useState(false);
  const [maxSize, setMaxSize] = useState();
  const address = useAddress();

  const mint = () => (layers && props ? setMintProps({ layers, props }) : null);
  if (mintProps) return <Mint {...mintProps!} />;

  if (address == undefined) return <Reject />;
  return !mintProps ? (
    <FormContainer>
      {!layers ? (
        <UploadImages layerState={setLayers} sizeState={setMaxSize} />
      ) : !props ? (
        <SetProps setPropsState={setProps} maxSize={maxSize! - 1} />
      ) : !paid ? (
        <Fees size={props.mintProps.size} paidState={setPaid} />
      ) : (
        <Stack spacing={2}>
          <Summary {...props} />
          <Button isFullWidth variant={"solid"} size={"md"} onClick={mint}>
            MINT
          </Button>
        </Stack>
      )}
    </FormContainer>
  ) : null;
}

export default CreateCollection;
