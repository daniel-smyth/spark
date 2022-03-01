import fs from "fs";

/**
 * Loop each image which was created in "startCreating()" and
 * update the metadata with these inputs.
 *
 * @param {string} namePrefix for the ".png" file
 * @param {string} description collection description
 * @param {string} collectionName collection name
 */
export const updateArtEngineImages = (
  namePrefix,
  description,
  collectionName
) => {
  // read json data
  const basePath = process.cwd();
  const buildDir = `${basePath}/lib/artengine/outputtedartwork`;
  let rawdata = fs.readFileSync(`${buildDir}/json/_metadata.json`);
  let data = JSON.parse(rawdata);

  data.forEach((item) => {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `/${collectionName}${item.edition}.png`;
    fs.writeFileSync(
      `${buildDir}/json/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  });

  fs.writeFileSync(
    `${buildDir}/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  console.log(`Updated name prefix to: "${namePrefix}"`);
  console.log(`Updated description: "${description}"`);
};
