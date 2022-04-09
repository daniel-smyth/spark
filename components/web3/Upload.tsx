import { Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { getLayer } from "../../lib/hashlips/createArt";
import { traitsFromImages } from "../../lib/thirdweb/traitsFromImages";
import FormHeader from "../form/FormHeader";
import SortImages from "./upload/SortImages";
import Upload from "./upload/UploadImages";

interface Props {
  layerState: any;
  sizeState: any;
}

function UploadFiles(props: Props) {
  const [traits, setTraits] = useState<any[]>([]);
  const [heading, setHeading] = useState("Upload Images");

  function upload(files: FileList) {
    let traits = traitsFromImages(files);
    let max = traits[1].length; // Max size.
    traits.forEach((t, i) => (i != 0 ? (max = max * t[1].length) : null));
    props.sizeState(max);
    setTraits(traits);
    setHeading("Set Layer Order");
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
      <FormHeader heading={heading} />
      <Stack spacing={6}>
        {traits.length == 0 ? (
          <Upload handleUpload={upload} />
        ) : (
          <SortImages traits={traits} />
        )}
      </Stack>
    </form>
  );
}

export default UploadFiles;
