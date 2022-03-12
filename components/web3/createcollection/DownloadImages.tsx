import { useEffect } from "react";
import { download } from "../../../lib/jszip/download";

interface DownloadCollectionProps {
  imgSrcs: string[];
  name: string;
  prefiz: string;
}

function DownloadCollection(props: DownloadCollectionProps) {
  useEffect(() => {
    download(props.imgSrcs, props.name, props.prefiz);
  });

  return <></>;
}

export default DownloadCollection;
