import cookie from "cookie";
import {
  buildSetup as buildImageDestinationFolders,
  startCreating as startCreatingImages,
} from "./artengine/main";
import { updateArtEngineImages as updateImagesMetaData } from "./artengine/utils/update_info";
import { nftStorage } from "./nftstorage/main";

/**
 * Create multiple artwork and store under an NFT.storage IPFS URL.
 *
 * @param {object} cookieObj Object containing art collection variables
 * @returns IPFS URLs and collection details
 */
export const createAndStoreArtwork = async (cookieObj) => {
  const collectionSize = parseInt(`${cookieObj.collectionsize}`);
  const collectionName = `${cookieObj.collectionname}`;
  const collectionDescription = `${cookieObj.collectiondescription}`;
  const imagePrefix = `${cookieObj.imageprefix}`;

  if (
    collectionSize &&
    imagePrefix &&
    collectionName &&
    collectionDescription
  ) {
    // Build the require output folders for images.
    buildImageDestinationFolders();
    // Create iamges.
    const result = await startCreatingImages(collectionSize);
    // Update image meta data.
    updateImagesMetaData(collectionName, collectionDescription, imagePrefix);

    // Store IPFS
    const ipfsUrlArray = await nftStorage(collectionSize);
    const arrayString = JSON.stringify(ipfsUrlArray);

    return {
      collectionSize: collectionSize,
      collectionDescription: collectionDescription,
      imageNamePrefix: imagePrefix,
      urlArray: arrayString,
    };
  }
};
