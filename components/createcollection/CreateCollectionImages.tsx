import { Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { startCreating } from "../../lib/artengine/mainClient";

interface CreateCollectionImagesProps {
  size: number;
  layerObjects: any[];
}

function CreateCollectionImages(props: CreateCollectionImagesProps) {
  const [imageUrls, setImageUrls] = useState<string[]>();

  useEffect(() => {
    const createImages = async () => {
      const images = await startCreating(props.size, props.layerObjects);
      setImageUrls(images);
    };
    createImages();
  });

  return <div>{imageUrls ? <Image src={imageUrls[0]}></Image> : null}</div>;
}

export default CreateCollectionImages;
