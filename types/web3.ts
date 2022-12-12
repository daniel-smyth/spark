import { NFTContractDeployMetadata } from '@thirdweb-dev/sdk';

export declare type Trait = {
  name: string;
  url: string;
};

export declare type Layer = {
  name: string;
  types: Trait[];
};

export declare type ProcessedLayerElement = {
  id: number;
  name: string | undefined;
  fileName: string;
  path: string;
  weight: number;
};

export declare type ProcessedLayer = {
  id: number;
  elements: ProcessedLayerElement[];
  name: string;
  blend: string;
  opacity: number;
  bypassDNA: boolean;
};

export declare type CollectionProperties = NFTContractDeployMetadata & {
  size: number;
  prefix: string;
};

export declare type ProcessedImage = {
  imgSrc: string;
  metadata: string[][];
};

export declare type ConstructedLayer = {
  name: string;
  blend: string;
  opacity: number;
  selectedElement: ProcessedLayerElement | undefined;
};

export declare type CreateCollectionContextType = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  collectionSize: number;
  setCollectionSize: React.Dispatch<React.SetStateAction<number>>;
  collectionProperties: CollectionProperties | undefined;
  setCollectionProperties: React.Dispatch<
    React.SetStateAction<CollectionProperties | undefined>
  >;
  isPaid: boolean;
  setIsPaid: React.Dispatch<React.SetStateAction<boolean>>;
};
