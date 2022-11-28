import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  name: string;
  label: string;
  defaultValue: number;
  maxSize: number | null;
  onChange: React.Dispatch<React.SetStateAction<number>> | undefined;
}

export default function FormNumberInput(props: Props) {
  const { name, label, defaultValue, maxSize, onChange } = props;

  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      {onChange ? (
        <NumberInput
          max={maxSize!}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => {
            onChange!(Number(e));
          }}
        >
          <NumberInputField bg="white" />

          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      ) : (
        <NumberInput name={name} defaultValue={defaultValue}>
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
