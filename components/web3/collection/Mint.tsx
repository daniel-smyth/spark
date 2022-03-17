import { useWeb3 } from "@3rdweb/hooks";
import { JsonRpcSigner } from "@ethersproject/providers";
import React, { useEffect } from "react";
import { createDropV2 } from "../../../lib/thirdweb/CreateDropV2";
import { ICreateDropV2 } from "../../../lib/thirdweb/ICreateDropV2";

interface IMintImagesV2 {
  size: number;
  name: string;
  description: string;
  prefix: string;
  mintAddress: string;
  saleRecipient: string;
  imgSrcs: string[];
}

function MintImagesV2(props: IMintImagesV2) {
  const { provider } = useWeb3();

  let signer: JsonRpcSigner;
  if (provider) signer = provider.getSigner();

  let options: ICreateDropV2;
  if (signer!)
    options = {
      size: props.size,
      description: props.description,
      prefix: props.prefix,
      imgSrcs: props.imgSrcs,
      signer: signer,
      toAddress: props.mintAddress,
      dropOptions: {
        name: props.name,
        primary_sale_recipient: props.saleRecipient,
      },
    };

  useEffect(() => {
    createDropV2(options);
  }, []);

  return <></>;
}

export default MintImagesV2;
