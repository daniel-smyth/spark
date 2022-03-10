import { useEffect } from "react";
import { download } from "../../../../lib/jszip/download";

interface DownloadCollectionProps {
  imgSrcs: string[];
  collectionName: string;
  imageNamePrefix: string;
}

function DownloadCollection(props: DownloadCollectionProps) {
  useEffect(() => {
    download(props.imgSrcs, props.collectionName, props.imageNamePrefix);
  });

  return <></>;
}

export default DownloadCollection;
