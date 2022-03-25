import {
  Grid,
  GridItem,
  Heading,
  Stack,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import FormNumberInput from "../../form/FormNumberInput";
import Spark3Black from "../../logo/spark3black";

interface SetCollectionSizeProps {
  maxSize: number;
  setState: any;
}

function SetCollectionSize(props: SetCollectionSizeProps) {
  const router = useRouter();
  const [size, setSize] = useState(props.maxSize);

  function handleClick() {
    props.setState(size);
    localStorage.setItem("size", `${size}`);
  }

  function goBack() {
    router.push("/create/collection");
  }

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
        <GridItem colSpan={3} h="8">
          <Heading size="md">Enter Collection Size</Heading>
        </GridItem>
        <GridItem colStart={6} colEnd={8} h="8">
          <Spark3Black width={60} />
        </GridItem>
      </Grid>
      <Stack spacing={12}>
        <Stack spacing={6}>
          <Text size="md">
            This is the max size you can make your collection with your layers
            and traits.
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
  );
}

export default SetCollectionSize;
