import React, { useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ICreateDropV1 } from "../../../lib/thirdweb/ICreateDropV1";
import { createDropV1 } from "../../../lib/thirdweb/CreateDropV1";

interface IMintImagesV1 {
  size: number;
  name: string;
  description: string;
  prefix: string;
  imgSrcs: string[];
}

/**
 * Creates a drop module on my ThirdWeb dashboard using my private key. This will
 * work but I am the one paying the gas fees to mint the collection. Alternatively
 * I could use their wallet but then I would need the ability to create modules
 * manually.
 *
 * @param props IMintImageV1
 */
function MintImagesV1(props: IMintImagesV1) {
  const { provider } = useWeb3();

  let options: ICreateDropV1;

  if (provider)
    options = {
      size: props.size,
      description: props.description,
      prefix: props.prefix,
      imgSrcs: props.imgSrcs,
      provider: provider,
    };

  useEffect(() => {
    createDropV1(options);
  }, []);

  return <></>;
}

export default MintImagesV1;
