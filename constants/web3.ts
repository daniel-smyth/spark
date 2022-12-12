import { ContractType } from '@thirdweb-dev/sdk';

export interface GasPrice {
  deployContract: number;
  setClaimPhase?: number;
  batchUpload?: number;
  mint?: number;
  claim?: number;
  claim5?: number;
  distributeFunds?: number;
}

export const GasEstimatorMap: Record<ContractType, GasPrice> = {
  'signature-drop': {
    deployContract: 800735,
    setClaimPhase: 143139,
    batchUpload: 169832,
    claim: 174604,
    claim5: 182572
  },
  'nft-drop': {
    deployContract: 785405,
    setClaimPhase: 187999,
    batchUpload: 169832,
    claim: 277449,
    claim5: 745113
  },
  'edition-drop': {
    deployContract: 746515,
    setClaimPhase: 168589,
    batchUpload: 168483,
    claim: 186485
  },
  'nft-collection': {
    deployContract: 928006,
    mint: 208102
  },
  edition: {
    deployContract: 793195,
    mint: 160173
  },
  marketplace: {
    deployContract: 785536
  },
  token: {
    deployContract: 837345
  },
  pack: {
    deployContract: 0
  },
  split: {
    deployContract: 594540,
    distributeFunds: 153078
  },
  vote: {
    deployContract: 454740
  },
  'token-drop': {
    deployContract: 0
  },
  custom: {
    deployContract: 0
  },
  multiwrap: {
    deployContract: 0
  }
};

export const CONTRACT_TYPE_NAME_MAP: Record<ContractType, string> = {
  // drop
  'nft-drop': 'NFT Drop' as const,
  'edition-drop': 'Edition Drop' as const,
  'token-drop': 'Token Drop' as const,
  'signature-drop': 'Signature Drop' as const,

  // token
  token: 'Token' as const,
  'nft-collection': 'NFT Collection' as const,
  edition: 'Edition' as const,
  multiwrap: 'Multiwrap' as const,

  // other
  vote: 'Vote' as const,
  marketplace: 'Marketplace' as const,
  pack: 'Pack' as const,
  split: 'Split' as const,

  custom: 'Custom' as const
} as const;
