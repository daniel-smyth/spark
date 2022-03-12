import { ethers } from "ethers";

export interface ICreateDropV1 {
  size: number;
  description: string;
  prefix: string;
  imgSrcs: string[];
  provider: ethers.providers.Provider;
}
