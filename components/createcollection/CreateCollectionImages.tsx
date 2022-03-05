import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { startCreating } from "../../lib/artengine/mainClient";

interface CreateCollectionImagesProps {
  size: number;
  layerObjects: any[];
}

function CreateCollectionImages(props: CreateCollectionImagesProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const createImages = async () => {
      const images = await startCreating(props.size, props.layerObjects);
      setImageUrls(images);
      setLoaded(true);
    };
    createImages();
  }, []);

  const imageComponents: any[] = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    imageComponents.push(<Image src={url} />);
  }

  return <Box>{loaded ? imageComponents : null}</Box>;
}

export default CreateCollectionImages;
