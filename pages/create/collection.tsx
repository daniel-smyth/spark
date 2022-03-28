import { Start } from "./../../components/web3/Start";
import React, { useState } from "react";
import { withRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import FormContainer from "../../components/FormContainer";
import UploadFiles from "../../components/web3/UploadFiles";
import SetProps from "../../components/web3/SetProps";
import Stripe from "../../components/util/Stripe";
import Create from "../../components/web3/Mint";
import Reject from "../../components/web3/Reject";
import {
  Stack,
  Button,
  Text,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Spark3Black from "../../components/icon/spark3black";
import Summary from "../../components/web3/Summary";

function CreateCollection() {
  const [info, setInfo] = useState<any>();
  const [maxSize, setMaxSize] = useState();
  const [size, setSize] = useState<number>();
  const [layers, setLayers] = useState<any[]>();
  const [paid, setPaid] = useState(false);
  const [start, setStart] = useState(false);
  const address = useAddress();

  function handleClick() {
    setStart(true);
  }

  return address != undefined ? (
    paid && start ? (
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
          <Stripe amount={99.99} paid={paid} paidState={setPaid} />
        ) : !start ? (
          <Start size={size!} info={info} startState={setStart} />
        ) : null}
      </FormContainer>
    )
  ) : (
    <Reject />
  );
}

export default withRouter(CreateCollection);
