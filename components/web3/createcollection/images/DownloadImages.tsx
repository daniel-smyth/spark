import { Stack, Spinner, Text } from "@chakra-ui/react";
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

  return (
    <Stack
      //   minH={"50vh"}
      py={8}
      spacing={8}
      alignItems="center"
      justifyContent={"center"}
    >
      <Spinner color={"blue.500"} />
      <Stack alignItems="center">
        <Text size="lg">Downloading images.</Text>
        <Text size="lg">This may take a few minutes.</Text>
      </Stack>
    </Stack>
  );
}

export default DownloadCollection;
