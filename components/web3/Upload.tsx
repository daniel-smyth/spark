import { Stack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { getLayer } from "../../lib/hashlips/createArt";
import { traitsFromImages } from "../../lib/thirdweb/traitsFromImages";
import SortImages from "./upload/SortImages";
import UploadImages from "./upload/UploadImages";

function Upload(props: {
  sizeState: Dispatch<SetStateAction<undefined>>;
  layerState: Dispatch<SetStateAction<any[] | undefined>>;
}) {
  const [traits, setTraits] = useState<any[]>([]);

  function upload(files: FileList) {
    let traits = traitsFromImages(files);
    let max = traits[0][1].length; // Max size.
    traits.forEach((t, i) => (i != 0 ? (max = max * t[1].length) : null));
    props.sizeState(max);
    setTraits(traits);
  }

  function sumbit(event: any) {
    event.preventDefault();
    props.layerState(
      traits.map((layerImg) =>
        getLayer([{ layerName: layerImg[0], layerImageSrcs: layerImg[1] }])
      )
    );
  }

  return (
    <form onSubmit={sumbit}>
      <Stack spacing={6}>
        {traits.length == 0 ? (
          <UploadImages handleUpload={upload} />
        ) : (
          <SortImages traits={traits} />
        )}
      </Stack>
    </form>
  );
}

export default Upload;
