import { Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import Spark3Black from "../icon/spark3black";

function FormHeader(props: { heading: string }) {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} pb={6}>
      <GridItem colSpan={3} h="8">
        <Heading size="md">{props.heading}</Heading>
      </GridItem>
      <GridItem colStart={6} colEnd={8} h="8">
        <Spark3Black width={60} />
      </GridItem>
    </Grid>
  );
}

export default FormHeader;
