import {
  Stack,
  Button,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { ICollectionProps, IMint } from "../../lib/thirdweb/interfaces/IMint";
import Spark3Black from "../icon/spark3black";

export default function Summary(props: ICollectionProps) {
  const { size, prefix } = props.mintProps;
  const { name, description, primary_sale_recipient } = props.moduleProps;

  return (
    <Stack spacing={5} alignItems="center" justifyContent={"center"}>
      <Spark3Black width={75} />
      <Stack alignItems="center">
        <Text size="md">You're ready.</Text>
        <Text size="md">A summary of your new NFT collection.</Text>
      </Stack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Collection Properties</Th>
            <Th></Th>
            <Th isNumeric>Values</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Size</Td>
            <Td></Td>
            <Td isNumeric>{size}</Td>
          </Tr>
          <Tr>
            <Td>Name</Td>
            <Td></Td>
            <Td isNumeric>{name}</Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td></Td>
            <Td isNumeric>
              {description!.length < 20
                ? description
                : `${description!.substring(0, 10)}...`}
            </Td>
          </Tr>
          <Tr>
            <Td>Image Prefix</Td>
            <Td></Td>
            <Td isNumeric>{prefix}</Td>
          </Tr>
          <Tr>
            <Td>Mint To</Td>
            <Td></Td>
            <Td isNumeric>{primary_sale_recipient.substring(0, 10)}...</Td>
          </Tr>
        </Tbody>
      </Table>
      <Text size="sm">
        This can take a few hours, make sure your PC is plugged in.
      </Text>
    </Stack>
  );
}
