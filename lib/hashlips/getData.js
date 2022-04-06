import fs from "fs";

export function getCreatedImages(collectionSize) {
  var images = [];

  // Run a for loop of a user inputted amount minting an NFT every time.
  const basePath = process.cwd();
  for (let i = 1; i <= collectionSize; i++) {
    var image = fs.readFileSync(
      `${basePath}/lib/artengine/outputtedartwork/images/${i}.png`
    );
    images.push(image);
  }

  return images;
}
