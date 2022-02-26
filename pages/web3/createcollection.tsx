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
} from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function CreateCollection() {
  const router = useRouter();
  const [artCollectionSize, setArtCollectionSize] = useState(0);

  // Creates a cookie on handle dispatch containing the art collection size.
  // This is inputted by the user. As the art collection is rendered on the
  // server side this is the easiest way to pass the variable.
  const [cookie, setCookie] = useCookies(["artcollectionsize"]);

  const handleDispatch = () => {
    // Set the cookie to be picked up in "web3/createartcollection.tsx" which
    // will pass the cookie as a variable to the art engine.
    setCookie("artcollectionsize", artCollectionSize, {
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
              <FormLabel>Enter collection size</FormLabel>
              <NumberInput onChange={(e) => setArtCollectionSize(Number(e))}>
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
              onClick={handleDispatch}
            ></ButtonWithLoading>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default CreateCollection;
