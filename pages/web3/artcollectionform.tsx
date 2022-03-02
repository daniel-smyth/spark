import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
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
  Text,
} from "@chakra-ui/react";
import ButtonWithLoading from "../../components/utils/ButtonWithLoading";
import { ConnectWallet } from "@3rdweb/react";

function ArtCollectionForm() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState("");

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    const body = new FormData();
    body.append("file", image!);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };

  // Collection details.
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSize, setCollectionSize] = useState("");
  // Appears before ".png" in file name.
  const [imagePrefix, setImageNamePrefix] = useState("");
  const router = useRouter();

  // TODO
  // Creates a cookie on handle dispatch containing collection details.
  // As the art collection is rendered on the server side this is the
  // easiest way to pass the variable.
  const [prefixCookie, setImagePrefixCookie] = useCookies(["imageprefix"]);
  const [nameCookie, setNameCookie] = useCookies(["collectionname"]);
  const [descrCookie, setDescrCookie] = useCookies(["collectiondescription"]);
  const [sizeCookie, setSizeCookie] = useCookies(["collectionsize"]);

  const createImageCollection = () => {
    // Set cookies to be used in "web3/createartcollection.tsx".
    setSizeCookie("collectionsize", collectionSize, {
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
    setImagePrefixCookie("imageprefix", imagePrefix, {
      path: "",
      maxAge: 3600,
      sameSite: true,
    });

    // Route the page which will create the art collection.
    router.push("/web3/artcollectionminter");
  };

  return (
    <Container display={"flex"}>
      <Stack
        spacing={6}
        py={10}
        px={10}
        pb={20}
        align={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Heading fontSize={{ base: "3xl", md: "4xl" }}>
          Create NFT Collection
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={6}>
            <div>
              <img src={createObjectURL} />
              <h4>Select Image</h4>
              <input type="file" name="myImage" onChange={uploadToClient} />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={uploadToServer}
              >
                Send to server
              </button>
            </div>
            <ConnectWallet w={"60%"} variant={"solid"} alignSelf="center" />
            <Text size="md">
              Enter the metadata to be stored with your NFT collection
            </Text>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection name</FormLabel>
              <Input
                onChange={(e) => setCollectionName(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl is="count" isRequired>
              <FormLabel>Enter collection description</FormLabel>
              <Input
                h={"5em"}
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
              w="100%"
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

export default ArtCollectionForm;
