import {
  Container,
  Stack,
  useColorModeValue,
  Heading,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  Box,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function CreateCollection() {
  // NextJS router.
  const router = useRouter();
  // Collection details.
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [artCollectionSize, setCollectionSize] = useState("");
  // Appears in the ".png" file name.
  const [imageNamePrefix, setImageNamePrefix] = useState("");

  // Creates a cookie on handle dispatch containing the art collection size.
  // This is inputted by the user. As the art collection is rendered on the
  // server side this is the easiest way to pass the variable.

  // Appears in the ".png" file name.
  const [prefixCookie, setImagePrefixCookie] = useCookies(["imagenameprefix"]);
  // Collection details.
  const [nameCookie, setNameCookie] = useCookies(["collectionname"]);
  const [descrCookie, setDescrCookie] = useCookies(["collectiondescription"]);
  const [sizeCookie, setSizeCookie] = useCookies(["artcollectionsize"]);

  /**
   * Using inputted data from the form this function will set the cookies as the
   * inputted data and then run the hashlips art engine to create multiple copies
   * of the art.
   */
  const createImageCollection = () => {
    // Set the cookie to be picked up in "web3/createartcollection.tsx" which
    // will pass the cookie as a variable to the art engine.
    setImagePrefixCookie("imagenameprefix", imageNamePrefix, {
      path: "",
      maxAge: 3600,
      sameSite: true,
    });
    setNameCookie("collectionname", collectionName, {
      path: "",
      maxAge: 3600,
      sameSite: true,
    });
    setDescrCookie("collectiondescription", collectionDescription, {
      path: "",
      maxAge: 3600,
      sameSite: true,
    });
    setSizeCookie("artcollectionsize", artCollectionSize, {
      path: "",
      maxAge: 3600,
      sameSite: true,
    });

    // Route the page which will create the art collection.
    router.push("/web3/createartcollection");
  };

  return (
    <Container>
      <Stack
        spacing={6}
        py={10}
        pb={20}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Heading fontSize={{ base: "3xl", md: "4xl" }} textAlign={"center"}>
          Create NFT Collection
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={6}>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection name</FormLabel>
              <Input
                onChange={(e) => setCollectionName(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection description</FormLabel>
              <Input
                onChange={(e) => setCollectionDescription(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter image prefix</FormLabel>
              <Input
                onChange={(e) => setImageNamePrefix(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection size</FormLabel>
              <NumberInput onChange={(e) => setCollectionSize(e)}>
                <NumberInputField bg="white" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <ButtonWithLoading
              buttontext="Create collection"
              loadingText="Creating.."
              size="md"
              variant="solid"
              onClick={createImageCollection}
            ></ButtonWithLoading>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateCollection;
