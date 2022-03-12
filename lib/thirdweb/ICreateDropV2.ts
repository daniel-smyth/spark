import { NFTContractDeployMetadata } from "@thirdweb-dev/sdk";
import { JsonRpcSigner } from "@ethersproject/providers";

export interface ICreateDropV2 {
  size: number;
  description: string;
  prefix: string;
  imgSrcs: string[];
  signer: JsonRpcSigner;
  toAddress: string;
  dropOptions: NFTContractDeployMetadata;
}
