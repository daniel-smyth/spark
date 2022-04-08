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
import FormNumberInput from "../form/FormNumberInput";
import Spark3Black from "../icon/spark3black";
import {
  ICollectionProps,
  NFTCollectionMintData,
} from "../../lib/thirdweb/interfaces/IMint";
import { NFTContractDeployMetadata } from "@thirdweb-dev/sdk";

interface Props {
  setPropsState: React.Dispatch<
    React.SetStateAction<ICollectionProps | undefined>
  >;
  maxSize: number;
}

function SetProps(props: Props) {
  const router = useRouter();
  const [size, setSize] = useState(props.maxSize);
  const [next, setNext] = useState(false);

  function handleClick() {
    setNext(true);
  }

  function goBack() {
    if (next) setNext(false);
    else router.push("/create");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function uploadImage(file: File) {
    console.log(file);
  }

  function handleFormData(event: any) {
    event.preventDefault();
    const prefix = event.target.prefix.value!;
    const mintProps: NFTCollectionMintData = {
      size,
      prefix,
    };

    const name = event.target.name.value;
    const description = event.target.description.value;
    const external_link = event.target.external_link.value;
    const symbol = event.target.symbol.value;
    const primary_sale_recipient = event.target.primary_sale_recipient.value;
    const seller_fee_basis_points = Number(
      event.target.seller_fee_basis_points.value
    );

    const moduleProps: NFTContractDeployMetadata = {
      name,
      description,
      external_link,
      symbol,
      primary_sale_recipient,
      fee_recipient: primary_sale_recipient,
      seller_fee_basis_points: seller_fee_basis_points,
    };

    const collectionProps: ICollectionProps = { mintProps, moduleProps };
    props.setPropsState(collectionProps);
  }

  return !next ? (
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
            This is the max size you can make your collection with your uploaded
            artwork.
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
        </Stack>
      </Stack>
    </>
  ) : (
    <form onSubmit={handleFormData}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">Collection Metadata</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>
      <Stack pt={{ base: 4, md: 0 }} spacing={12}>
        <Stack spacing={6}>
          <Text size="md">This data cannot be changed</Text>
          {getFormInput("name", "Collection name")}
          {getFormInput("description", "Collection description")}
          {getFormInput("prefix", "Image name prefix (prefix.png)")}
          {getFormInput("primary_sale_recipient", "Address to mint NFTs to")}

          <Text size="md">Optional data</Text>
          {/* <UploadImageFiles handleUpload={uploadImage} /> */}
          {getFormInput("external_link", "Your collection's external link'")}
          {getFormInput("symbol", "Your collection symbol")}
          {getFormInput(
            "seller_fee_basis_points",
            "Your royalty on secondary sales"
          )}

          <Button onClick={scrollToTop} size="md" variant="solid" type="submit">
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
  );
}

export default SetProps;

function getFormInput(name: string, label: string) {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input name={name}></Input>
    </FormControl>
  );
}
