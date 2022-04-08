import {
  ContractType,
  Edition,
  EditionDrop,
  Marketplace,
  NFTCollection,
  NFTDrop,
  Pack,
  Role,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";
import * as CSS from "csstype";
import { ValueOf } from "../utils/network";

export interface GasPrice {
  deployContract: number;
  setClaimPhase?: number;
  batchUpload?: number;
  mint?: number;
  claim?: number;
  distributeFunds?: number;
}

export const GasEstimatorMap: Record<ContractType, GasPrice> = {
  [NFTDrop.contractType]: {
    deployContract: 785405,
    setClaimPhase: 187999,
    batchUpload: 169832,
    claim: 277449,
  },
  [EditionDrop.contractType]: {
    deployContract: 746515,
    setClaimPhase: 168589,
    batchUpload: 168483,
    claim: 186485,
  },
  [NFTCollection.contractType]: {
    deployContract: 928006,
    mint: 208102,
  },
  [Edition.contractType]: {
    deployContract: 793195,
    mint: 160173,
  },
  [Marketplace.contractType]: {
    deployContract: 785536,
  },
  [Token.contractType]: {
    deployContract: 837345,
  },
  [Pack.contractType]: {
    deployContract: 0,
  },
  [Split.contractType]: {
    deployContract: 594540,
    distributeFunds: 153078,
  },
  [Vote.contractType]: {
    deployContract: 454740,
  },
};

interface ContractDeploy {
  title: ValueOf<typeof CONTRACT_TYPE_NAME_MAP>;
  subtitle: string;
  contractType: ContractType;
  comingSoon?: true;
}

export const CONTRACT_TYPE_NAME_MAP = {
  // drop
  [NFTDrop.contractType]: "NFT Drop" as const,
  [EditionDrop.contractType]: "Edition Drop" as const,

  // token
  [Token.contractType]: "Token" as const,
  [NFTCollection.contractType]: "NFT Collection" as const,
  [Edition.contractType]: "Edition" as const,

  // other
  [Vote.contractType]: "Vote" as const,
  [Marketplace.contractType]: "Marketplace" as const,
  [Pack.contractType]: "Pack" as const,
  [Split.contractType]: "Split" as const,
} as const;

interface ContractDeployMap {
  drop: ContractDeploy[];
  token: ContractDeploy[];
  [Marketplace.contractType]: ContractDeploy[];
  governance: ContractDeploy[];
}

export const TYPE_CONTRACT_MAP: ContractDeployMap = {
  drop: [
    {
      title: CONTRACT_TYPE_NAME_MAP[NFTDrop.contractType],
      subtitle: "Claimable drop of one-of-one NFTs",
      contractType: NFTDrop.contractType,
    },
    {
      title: CONTRACT_TYPE_NAME_MAP[EditionDrop.contractType],
      subtitle: "Claimable drop of N-of-one NFTs",
      contractType: EditionDrop.contractType,
    },
  ],
  token: [
    {
      title: CONTRACT_TYPE_NAME_MAP[Token.contractType],
      subtitle: "Your own ERC20 token",
      contractType: Token.contractType,
    },
    {
      title: CONTRACT_TYPE_NAME_MAP[NFTCollection.contractType],
      subtitle: "A collection of one-of-one NFTs",
      contractType: NFTCollection.contractType,
    },
    {
      title: CONTRACT_TYPE_NAME_MAP[Edition.contractType],
      subtitle: "A collection of N-of-one NFTs",
      contractType: Edition.contractType,
    },
    {
      title: CONTRACT_TYPE_NAME_MAP[Pack.contractType],
      subtitle: "Randomized rewards (loot boxes)",
      contractType: Pack.contractType,
      comingSoon: true,
    },
  ],
  [Marketplace.contractType]: [
    {
      title: CONTRACT_TYPE_NAME_MAP[Marketplace.contractType],
      subtitle: "Your very own marketplace",
      contractType: Marketplace.contractType,
      comingSoon: true,
    },
  ],
  governance: [
    {
      title: CONTRACT_TYPE_NAME_MAP[Vote.contractType],
      subtitle: "ERC20 based voting",
      contractType: Vote.contractType,
    },
    {
      title: CONTRACT_TYPE_NAME_MAP[Split.contractType],
      subtitle: "Fee splitting for your revenue",
      contractType: Split.contractType,
    },
  ],
};

export const ROLE_DESCRIPTION_MAP: Record<Role, string> = {
  admin:
    "Determine who can grant or revoke roles and modify settings on this contract.",
  minter: "Determine who can create new tokens on this contract.",
  pauser:
    "Determine who can pause (and unpause) all external calls made to this contract's contract.",
  transfer: "Determine who can transfer tokens on this contract.",
  lister: "Determine who can create new listings on this contract.",
  editor: "NOT IMPLEMENTED",
  asset: "Determine which assets can be listed on this marketplace.",
};
