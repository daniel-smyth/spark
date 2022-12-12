import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react';
import {
  CreateCollectionProvider,
  useCreateCollection
} from '../../context/CreateCollectionContext';
import CollectionPropertiesForm from '../../components/web3/CollectionPropertiesForm';
import FeesForm from '../../components/web3/FeesForm';
import Spark3Black from '../../components/icon/spark3black';
import UploadImages from '../../components/web3/UploadImages';
import Mint from '../../components/web3/Mint';

function CreateCollectionPage() {
  const { layers, collectionProperties, isPaid } = useCreateCollection();
  const [startMint, setStartMint] = useState(false);
  const address = useAddress();
  const router = useRouter();

  const mint = () => setStartMint(true);

  // If wallet disconnects end session prompt reconnect
  useEffect(() => {
    if (address === undefined) router.push('/web3/reconnect');
  }, [address, router]);

  return (
    <Container>
      {!startMint ? (
        <Stack py={8} px={6} bg="gray.50">
          <Box py={12} px={6} rounded="lg" boxShadow="lg" bg="white">
            {layers.length === 0 && !collectionProperties && <UploadImages />}

            {layers.length > 0 && !collectionProperties && (
              <CollectionPropertiesForm />
            )}

            {/* {collectionProperties && !isPaid && <FeesForm />} */}

            {/* {isPaid && collectionProperties && ( */}
            {collectionProperties && (
              <Stack spacing={2}>
                <Stack spacing={5} alignItems="center" justifyContent="center">
                  <Spark3Black width={75} />
                  <Stack alignItems="center">
                    <Text size="md">You&apos;re ready.</Text>
                    <Text size="md">A summary of your new NFT collection.</Text>
                  </Stack>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Collection Properties</Th>
                        <Th />
                        <Th isNumeric>Values</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Size</Td>
                        <Td />
                        <Td isNumeric>{collectionProperties.size}</Td>
                      </Tr>
                      <Tr>
                        <Td>Name</Td>
                        <Td />
                        <Td isNumeric>{collectionProperties.name}</Td>
                      </Tr>
                      <Tr>
                        <Td>Description</Td>
                        <Td />
                        <Td isNumeric>
                          {collectionProperties.description?.length! < 20
                            ? collectionProperties.description
                            : `${collectionProperties.description?.substring(
                                0,
                                10
                              )}...`}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Image Prefix</Td>
                        <Td />
                        <Td isNumeric>{collectionProperties.prefix}</Td>
                      </Tr>
                      <Tr>
                        <Td>Mint To</Td>
                        <Td />
                        <Td isNumeric>
                          {collectionProperties.primary_sale_recipient.substring(
                            0,
                            10
                          )}
                          ...
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <Text py={4} size="sm">
                    This can take a few hours, make sure your PC is plugged in.
                  </Text>
                </Stack>
                <Button width="100%" variant="solid" size="md" onClick={mint}>
                  MINT
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      ) : (
        <Mint />
      )}
    </Container>
  );
}

CreateCollectionPage.getLayout = function getLayout(page: ReactElement) {
  return <CreateCollectionProvider>{page}</CreateCollectionProvider>;
};

export default CreateCollectionPage;
