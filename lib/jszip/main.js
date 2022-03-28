import saveAs from "file-saver";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";

/**
 * Store image sources in a ZIP file and initiate a download of this
 * zip file on the user's web browser.
 *
 * @param {Array} imgSrcs
 * @param {string} name collection name
 * @param {string} prefix image prefix
 */
export function downloadZip(imgSrcs, name, prefix) {
  var zip = new JSZip();
  zip.file(`${name}.text`, "Thank you for using Spark3.io");

  var imgZip = zip.folder("images");
  for (let i = 0; i < imgSrcs.length; i++) {
    const src = imgSrcs[i];
    imgZip.file(`${prefix}${i}.png`, urlToPromise(src), { binary: true });
  }

  zip.generateAsync({ type: "blob" }).then(function callback(blob) {
    saveAs(blob, `${name}`);
  });

  function urlToPromise(url) {
    return new Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
