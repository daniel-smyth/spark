import { NFTContractDeployMetadata } from "@thirdweb-dev/sdk";

export interface IMint {
  layers: any[];
  props: ICollectionProps;
}

export interface ICollectionProps {
  mintProps: NFTCollectionMintData;
  moduleProps: NFTContractDeployMetadata;
}

export interface NFTCollectionMintData {
  size: number;
  prefix: string;
}
