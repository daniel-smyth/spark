import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";

interface DisplayImagesProps {
  count: number;
  allUrls: string[];
}

export default function DisplayImages(props: DisplayImagesProps) {
  const imageUrls = props.allUrls;
  const imageComponents: any[] = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    imageComponents.push(<Image key={i} maxW={"70px"} src={url} />);
  }

  return (
    <Stack maxW={"100%"} px={8} py={10} spacing={6}>
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>Your Collection</Heading>
      <Text size="lg">Created {props.count} images. </Text>
      <Box border={"8px"} p={2} borderColor="gray.200">
        <Wrap>{imageComponents}</Wrap>
      </Box>
    </Stack>
  );
}
