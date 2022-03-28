import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import FormNumberInput from "../FormNumberInput";
import Spark3Black from "../icon/spark3black";

interface Props {
  maxSize: number;
  infoState: any;
  sizeState: any;
}

function SetProps(props: Props) {
  const router = useRouter();
  const [size, setSize] = useState(props.maxSize);
  const [next, setNext] = useState(false);

  function handleClick() {
    setNext(true);
  }

  function goBack() {
    router.push("/create/collection");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleFormData(event: any) {
    event.preventDefault();
    const info = {
      name: event.target.name.value,
      description: event.target.description.value,
      prefix: event.target.prefix.value,
      mintTo: event.target.mintTo.value,
    };
    props.infoState(info);
    props.sizeState(size);
  }

  function getFormInput(name: string, label: string) {
    return (
      <FormControl isRequired>
        <FormLabel>{label}</FormLabel>
        <Input name={name}></Input>
      </FormControl>
    );
  }

  return (
    <>
      {!next ? (
        <>
          <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
            <GridItem colSpan={3} h="8">
              <Heading size="md">Collection Size</Heading>
            </GridItem>
            <GridItem colStart={6} colEnd={8} h="8">
              <Spark3Black width={60} />
            </GridItem>
          </Grid>
          <Stack pt={{ base: 4, md: 0 }} spacing={12}>
            <Stack spacing={6}>
              <Text size="md">
                This is the max size you can make your collection with your
                layers and traits.
              </Text>
              <FormNumberInput
                maxSize={size}
                label="Collection size"
                name="collectionSize"
                defaultValue={size}
                onChange={setSize}
              />
              <Button onClick={handleClick} size="md" variant="solid">
                Set collection size
              </Button>
              <Text px={2} size={"md"}>
                Make a mistake?{" "}
                <Link color={"blue.400"} onClick={goBack}>
                  Go back
                </Link>
              </Text>
            </Stack>
          </Stack>
        </>
      ) : (
        <form onSubmit={handleFormData}>
          <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
            <GridItem colSpan={3} h="8">
              <Heading size="md">Collection Info</Heading>
            </GridItem>
            <GridItem colStart={6} colEnd={8} h="8">
              <Spark3Black width={60} />
            </GridItem>
          </Grid>
          <Stack pt={{ base: 4, md: 0 }} spacing={12}>
            <Stack spacing={6}>
              <Text size="md">
                Enter collection details. This data will be the MetaData of your
                collection.
              </Text>
              {getFormInput("mintTo", "Address to mint NFTs to")}
              {getFormInput("name", "Enter collection name")}
              {getFormInput("description", "Enter description")}
              {getFormInput("prefix", "Enter image name prefix")}
              <Button
                onClick={scrollToTop}
                size="md"
                variant="solid"
                type="submit"
              >
                Create Collection
              </Button>
              <Text px={2} size={"md"}>
                Make a mistake?{" "}
                <Link color={"blue.400"} onClick={goBack}>
                  Go back
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
}

export default SetProps;
