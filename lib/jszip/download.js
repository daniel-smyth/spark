import saveAs from "file-saver";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";

export function download(imgSrcs, name) {
  var zip = new JSZip();
  zip.file("YourCollection.text", "Hello World\n");

  var imgZip = zip.folder("images");
  for (let i = 0; i < imgSrcs.length; i++) {
    const src = imgSrcs[i];
    imgZip.file(`${i}.png`, urlToPromise(src), { binary: true });
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
