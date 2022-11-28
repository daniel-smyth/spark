/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Link,
  Select,
  Stack,
  Text
} from '@chakra-ui/react';
import { Layer, TraitType } from '../../types/CreateCollection';
import useCreateCollection from '../../hooks/useCreateCollection';
import Spark3Black from '../Icon/spark3black';

// Artwork/images have several "traits". Each trait has several "types".
// A "layer" is a trait and its collection of types.

// For example:
// Layer: {
//  name: Hat - Trait name
//  types: [Red, Green, Blue] - Trait types
// }

function Upload() {
  const { setLayers, setCollectionSize } = useCreateCollection();
  const [_layers, _setLayers] = useState<Layer[]>([]); // Local state

  function uploadImages(files: FileList) {
    const newTraits: string[] = [];
    const newLayers: Layer[] = [];

    // Convert images to raw layers
    for (let i = 0; i < files.length; i += 1) {
      const image = files[i];

      // E.g. Hat
      const trait = image.name.substring(0, image.name.indexOf('_'));

      // E.g. Red, green, blue
      const type = image.name.substring(image.name.indexOf('_') + 1);

      const typeObject: TraitType = {
        name: type,
        url: URL.createObjectURL(image)
      };

      const traitMatch = newLayers.find((layer) => layer.name === trait);

      if (!traitMatch) {
        // New trait
        const newLayer: Layer = {
          name: trait,
          types: [typeObject]
        };

        newLayers.push(newLayer);
        newTraits.push(trait);
      } else {
        traitMatch.types.push(typeObject);
      }
    }

    // Get max possible collection size from images provided
    const maxSize = newLayers.reduce((acc, l) => acc * l.types.length, 1);

    setCollectionSize(maxSize);
    _setLayers(newLayers);
  }

  // Change the order of the layers, e.g. "Background" is layer 1
  function changeOrder(e: React.ChangeEvent<HTMLSelectElement>, i: number) {
    const match = _layers.find((layer) => layer.name === e.target.value);
    const index = _layers.indexOf(match!);

    _layers.splice(i, 0, _layers.splice(index, 1)[0]);

    const newLayers = [..._layers];

    _setLayers([...newLayers]);
  }

  // Submit the uploaded images and process layers
  function sumbit(event: any) {
    event.preventDefault();

    setLayers(_layers);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <form onSubmit={sumbit}>
      <Stack spacing={6}>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={3} h="8">
            <Heading size="md">Upload images</Heading>
          </GridItem>
          <GridItem colStart={6} colEnd={8} h="8">
            <Spark3Black width={60} />
          </GridItem>
        </Grid>

        {_layers.length === 0 ? (
          <>
            <Box>
              <label htmlFor="layer-upload">
                <Center
                  p={2}
                  cursor="pointer"
                  _hover={{ bg: 'gray.200' }}
                  transition="background-color 0.2s ease"
                  borderRadius={4}
                  border="3px dashed"
                  bg={_layers.length === 0 ? 'gray.100' : 'gray.300'}
                  borderColor="gray.300"
                >
                  <Input
                    isRequired
                    multiple
                    display="none"
                    id="layer-upload"
                    type="file"
                    name="myImage"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        uploadImages(e.target.files);
                      }
                    }}
                  />
                  <Text color="black">Upload artwork</Text>
                </Center>
              </label>
            </Box>

            <Text size="md">
              Spark3 detects NFT
              <Link color="blue.400" href="/traits">
                {' '}
                trait types and trait names{' '}
              </Link>
              from your image file name. Follow our naming convention:
            </Text>

            <Text variant="bold" size="md" alignSelf="center">
              &quot;TRAITTYPE_TRAIT.png&quot;
            </Text>

            <Box px={4} pb={4}>
              <Text pb={2} pl={4} fontSize="sm">
                <span style={{ fontStyle: 'italic' }}>
                  Trait examples: Background, Eyes, Fur, Mouth.
                </span>
              </Text>

              <Image shadow="md" src="/sampleCollection.jpg" />
            </Box>
          </>
        ) : (
          <>
            <Stack spacing={2} pt={{ base: 2, md: 0 }}>
              <Text size="md" fontWeight={500}>
                Layer Order
              </Text>
              <Text variant="badge">
                {_layers.map((layer, i) => (
                  <React.Fragment key={layer.name}>
                    {`${i + 1}. `}
                    <span key={layer.name} style={{ fontWeight: 400 }}>
                      {`${layer.name}`}{' '}
                    </span>
                  </React.Fragment>
                ))}
              </Text>
            </Stack>

            <Text size="md" display={{ base: 'none', md: 'inline' }}>
              Update layer order. Layer 1 located at the back, layer 2 is
              printed over layer 1.
            </Text>

            {_layers.map((layer, i) => (
              <Select
                onChange={(e) => changeOrder(e, i)}
                key={layer.name}
                size="md"
                value={layer.name}
              >
                {_layers.map((l) => (
                  <option key={l.name} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </Select>
            ))}

            <Button size="md" variant="solid" type="submit">
              Upload Layers
            </Button>

            <Text size="md">
              Make a mistake?{' '}
              <Link color="blue.400" href="/create-collection">
                Go back
              </Link>
            </Text>
          </>
        )}
      </Stack>
    </form>
  );
}

export default Upload;
