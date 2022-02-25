import React from "react";
import { Container, Stack } from "@chakra-ui/react";
import { FileDropZone } from "../components/FileDropZone";

export default function FileUploadPage() {
  return (
    <Container display={"flex"} alignItems={"center"}>
      <Stack p={4}>
        <FileDropZone />;
      </Stack>
    </Container>
  );
}
