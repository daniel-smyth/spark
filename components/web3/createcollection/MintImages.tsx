import { useWeb3 } from "@3rdweb/hooks";
import React, { useEffect } from "react";
import { mint } from "../../../lib/thirdweb/mint";

interface StoreImageIpfsUrlsProps {
  size: number;
  name: string;
  description: string;
  namePrefix: string;
  allUrls: string[];
}

function MintImages(props: StoreImageIpfsUrlsProps) {
  const { provider } = useWeb3();

  useEffect(() => {
    mint(
      props.size,
      props.description,
      props.namePrefix,
      props.allUrls,
      provider
    );
  }, []);

  return <div>Minting...</div>;
}

export default MintImages;
