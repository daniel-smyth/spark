import { NFTContractDeployMetadata } from "@thirdweb-dev/sdk";

export interface ICreateDrop {
  size: number;
  description: string;
  prefix: string;
  imgSrcs: string[];
  dropOptions: NFTContractDeployMetadata;
}
