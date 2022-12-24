import React, { ReactElement } from 'react';
import { FiDatabase, FiFolder } from 'react-icons/fi';
import { IconType } from 'react-icons';
import {
  Container,
  Flex,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';

interface DescriptionCardProps {
  titleText: string;
  titleIcon: IconType;
  bodyText: ReactElement;
  imageUrl: string;
  imageCaptcha?: string;
  imageShadow?: string;
  imageWidth?: string;
}

function DescriptionCard({
  titleText,
  titleIcon,
  bodyText,
  imageUrl,
  imageCaptcha,
  imageShadow,
  imageWidth
}: DescriptionCardProps) {
  return (
    <Stack spacing={3} divider={<StackDivider borderColor="gray.100" />}>
      <Stack direction="row" align="center">
        <Flex
          bg="blue.400"
          align="center"
          justify="center"
          rounded="full"
          w={8}
          h={8}
        >
          <Icon as={titleIcon} color="white" w={5} h={5} />
        </Flex>
        <Text color="black" variant="bold">
          {titleText}
        </Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 2, md: 10 }}>
        <Stack maxW={imageWidth} alignSelf="center" justifySelf="center">
          <Image src={imageUrl} shadow={imageShadow} />
          {imageCaptcha && (
            <Text fontSize="sm">
              <span style={{ fontStyle: 'italic' }}>{imageCaptcha}</span>
            </Text>
          )}
        </Stack>
        <Text size="sm" py={4}>
          {bodyText}
        </Text>
      </SimpleGrid>
    </Stack>
  );
}

export default function TraitsInformationPage() {
  return (
    <Container maxW="6xl" pt={10} px={10}>
      <Stack spacing={10}>
        <DescriptionCard
          titleText="1. Layers & Traits"
          titleIcon={FiFolder}
          bodyText={
            <Text size="md">
              <span style={{ fontWeight: '650' }}>
                Most NFTs require multiple layers which are stacked on top of
                each other to generate a final image of what you want. These are
                also called traits.
              </span>
              <br />
              <br />
              BoredApes have a layer (or trait), &quot;background&quot;, with
              variations like &quot;
              <span style={{ fontStyle: 'italic' }}>Army Green</span>&quot; and
              &quot;
              <span style={{ fontStyle: 'italic' }}>New Punk Blue</span>.&quot;
              <br />
              <br /> A collection can have many layers to increase collection
              size and style.
            </Text>
          }
          imageUrl="/layers.jpg"
          imageCaptcha="BoredApe traits/layers"
          imageShadow="lg"
        />
        <DescriptionCard
          titleText="2. How do I upload layers?"
          titleIcon={FiFolder}
          bodyText={
            <>
              <span style={{ fontWeight: '650' }}>
                Spark3 will detect the layer name from the image.
              </span>
              We handle the rest including NFT metadata.
              <br />
              <br />
              <span style={{ fontWeight: '650' }}>
                &quot;TRAITTYPE_TRAIT.png&quot;
              </span>
              <br />
              <br />
              Ready to start?{' '}
              <Link color="blue.400" href="/create-collection">
                Upload layers
              </Link>
            </>
          }
          imageUrl="/sampleCollection.jpg"
          imageCaptcha="Example with 4 layers"
          imageShadow="lg"
        />
        <DescriptionCard
          titleText="3. Layer names traits in metadata"
          titleIcon={FiDatabase}
          bodyText={
            <>
              Layer names are added to the NFT Metadata and displayed on
              exchanges like OpenSea.
              <br />
              <br />
              Each layer then has a certain number of unique traits, which are
              more specific, and each unique trait would appear a certain number
              of times in the NFT collection.
            </>
          }
          imageUrl="/opensealogo.png"
          imageWidth="350px"
        />
      </Stack>
    </Container>
  );
}
