import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  size: number;
  info: {
    name: string;
    description: string;
    prefix: string;
    mintTo: string;
  };
}

function Summary(props: Props) {
  console.log(props.info.description);

  return (
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
          <Td isNumeric>{props.size}</Td>
        </Tr>
        <Tr>
          <Td>Name</Td>
          <Td></Td>
          <Td isNumeric>{props.info.name}</Td>
        </Tr>
        <Tr>
          <Td>Description</Td>
          <Td></Td>
          <Td isNumeric>
            {props.info.description.length < 20
              ? props.info.description
              : `${props.info.description.substring(0, 10)}...`}
          </Td>
        </Tr>
        <Tr>
          <Td>Image Prefix</Td>
          <Td></Td>
          <Td isNumeric>{props.info.prefix}</Td>
        </Tr>
        <Tr>
          <Td>Mint To</Td>
          <Td></Td>
          <Td isNumeric>
            {}`${props.info.mintTo.substring(0, 10)}...`
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default Summary;
