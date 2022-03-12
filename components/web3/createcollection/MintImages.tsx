import { useWeb3 } from "@3rdweb/hooks";
import { JsonRpcSigner } from "@ethersproject/providers";
import React, { useEffect } from "react";
import { createDrop } from "../../../lib/thirdweb/CreateDrop";
import { ICreateDrop } from "../../../lib/thirdweb/ICreateDrop";

interface StoreImageIpfsUrlsProps {
  size: number;
  name: string;
  description: string;
  namePrefix: string;
  allUrls: string[];
}

function MintImages(props: StoreImageIpfsUrlsProps) {
  var signer: JsonRpcSigner;
  const { provider } = useWeb3();
  if (provider) signer = provider.getSigner();

  const options: ICreateDrop = {
    size: 0,
    description: "",
    prefix: "",
    imgSrcs: [],
    dropOptions: {
      name: "",
      primary_sale_recipient: "",
    },
  };

  useEffect(() => {
    // mint(
    //   props.size,
    //   props.description,
    //   props.namePrefix,
    //   props.allUrls,
    //   provider)

    createDrop(signer, options);
  }, []);

  return <></>;
}

export default MintImages;
