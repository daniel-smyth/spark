import saveAs from 'file-saver';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

function urlToPromise(url: string): any {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function downloadZip(imgSrcs, name, prefix) {
  const zip = new JSZip();

  zip.file(`${name}.text`, 'Thank you for using Spark3.io');

  const imgZip = zip.folder('images');

  for (let i = 0; i < imgSrcs.length; i += 1) {
    const src = imgSrcs[i];
    imgZip!.file(`${prefix}${i}.png`, urlToPromise(src), { binary: true });
  }

  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, `${name}`);
  });
}

export default downloadZip;
