import {
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
} from "@chakra-ui/react";
import React from "react";

interface FormNumberInputProps {
  name: string;
  maxSize: number | null;
  label: string;
  defaultValue: number;
  onChange: React.Dispatch<React.SetStateAction<number>> | undefined;
}

export default function FormNumberInput(props: FormNumberInputProps) {
  return (
    <FormControl isRequired>
      <FormLabel>{props.label}</FormLabel>
      {props.onChange ? (
        <NumberInput
          max={props.maxSize!}
          name={props.name}
          defaultValue={props.defaultValue}
          onChange={(e) => {
            props.onChange!(Number(e));
          }}
        >
          <NumberInputField bg="white" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      ) : (
        <NumberInput name={props.name} defaultValue={props.defaultValue}>
          <NumberInputField bg="white" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    </FormControl>
  );
}
