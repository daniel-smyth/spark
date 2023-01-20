'use client';

import React, { FC, useEffect, useState } from 'react';
import { useSDK } from '@thirdweb-dev/react';
import s from './Mint.module.css';
import { useCollection } from '@app/create/context';
import { LoadingDots, Text } from '@components/ui';

if (!process.env.NEXT_PUBLIC_ADDRESS) {
  throw new Error('NEXT_PUBLIC_ADDRESS is required in .env');
}

const sparkAddress = process.env.NEXT_PUBLIC_ADDRESS;

const Mint: FC = () => {
  const web3 = useSDK();
  const { collection } = useCollection();
  const [mintOutput, setMintOutput] = useState(['> Multiplying artwork...']);

  const updateOutput = (output: string, newLine = false) => {
    if (newLine) {
      setMintOutput([...mintOutput, '', output]);
    } else {
      setMintOutput([...mintOutput, output]);
    }
  };

  useEffect(() => {
    const mint = async () => {
      const nfts = await collection.generateCollection();

      updateOutput('> Deploying contract...', true);
      try {
        const collectionAddress = await web3?.deployer.deployNFTCollection({
          ...collection.properties,
          platform_fee_recipient: process.env.NEXT_PUBLIC_ADDRESS,
          seller_fee_basis_points: 100
        });

        if (collectionAddress) {
          updateOutput('> Contract Address:', true);
          updateOutput(collectionAddress);

          const contract = await web3?.getContract(
            collectionAddress,
            'nft-collection'
          );

          contract?.royalties.setDefaultRoyaltyInfo({
            seller_fee_basis_points: 100, // 1%
            fee_recipient: sparkAddress
          });

          updateOutput('> Minting NFTs...', true);
          const tx = await contract?.mintBatchTo(
            collection.properties.primary_sale_recipient,
            nfts
          );

          if (tx) {
            updateOutput(`> ${tx.length} items minted`);
            updateOutput(`> Minted to ${tx[0].receipt.to}`);

            const receipt = tx[0].receipt;
            const firstTokenId = tx[0].id;
            const firstNFT = await tx[0].data();
            console.log(receipt, firstTokenId, firstNFT);
          }
        }
      } catch (e: any) {
        console.log(e);
        updateOutput(`> Error: ${JSON.parse(e).reason}`);
      }
    };

    mint();
  }, []);

  return (
    <div className={s.root}>
      <LoadingDots />
      <Text>Creating Collection</Text>
      <div className={s.output}>
        {mintOutput.map((line, i) => (
          <>
            {line}
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default Mint;
