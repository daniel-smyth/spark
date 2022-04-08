import { Button, Link, Select, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

function SortImages(props: { traits: any[] }) {
  // Sort props.
  const traits = props.traits;
  const traitNames = traits.map((layer) => layer[0]);
  traitNames.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  // JSX Elements.
  const [order, setOrder] = useState<JSX.Element>(
    <Text variant="badge">{traitNames.join(", ")}</Text>
  );

  const traitOptions: JSX.Element[] = traitNames.map((t, i) => (
    <option key={i} value={t}>
      {t}
    </option>
  ));

  const dropdowns: JSX.Element[] = traitNames.map((t, i) => (
    <Select
      onChange={(e) => changeOrder(e, i)}
      key={i}
      placeholder={"Layer " + (i + 1)}
      size="md"
    >
      {traitOptions}
    </Select>
  ));

  // Layers order.
  function changeOrder(e: any, i: number) {
    const index = traits.indexOf(
      traits.find((layer) => (layer[0] == e.target.value ? layer : null))
    );
    traits.splice(i, 0, traits.splice(index, 1)[0]);
    const traitNames = traits.map((layer) => layer[0]);

    const string = traitNames.join(", ");
    const order = <Text variant="badge">{string}</Text>;
    setOrder(order);
  }

  return (
    <>
      <Text size="md" display={{ base: "none", md: "inline" }}>
        Layer 1 is background and layer 2 will be printed over layer 1.
      </Text>
      <Stack spacing={2} pt={{ base: 2, md: 0 }}>
        <Text size="md" fontWeight={500}>
          Current layer order
        </Text>
        {order}
      </Stack>
      {dropdowns}
      <Button size="md" variant="solid" type="submit">
        Upload Layers
      </Button>
      <Text size={"md"}>
        Make a mistake?{" "}
        <Link color={"blue.400"} onClick={() => {}}>
          Go back
        </Link>
      </Text>
    </>
  );
}

export default SortImages;
