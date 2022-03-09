import React, { useEffect } from "react";
import { download } from "../../lib/jszip/download";
import { withRouter } from "next/router";
import { Spinner, Stack, Text } from "@chakra-ui/react";

function DownloadCollection(props: any) {
  useEffect(() => {
    download(props.router.query.imgSrcs, props.router.query.name);
  });

  return (
    <Stack
      minH={"50vh"}
      spacing={8}
      py={10}
      alignItems="center"
      justifyContent={"center"}
    >
      <Spinner color={"blue.500"} />
      <Stack alignItems="center">
        <Text size="lg">Downloading images.</Text>
        <Text size="md">This may take a few minutes.</Text>
      </Stack>
    </Stack>
  );
}

export default withRouter(DownloadCollection);
