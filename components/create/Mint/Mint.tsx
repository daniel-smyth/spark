'use client';

import React, { FC, useEffect, useState } from 'react';
import { useSDK } from '@thirdweb-dev/react';
import s from './Mint.module.css';
import { useCollection } from '@app/create/context';
import { LoadingDots, Text } from '@components/ui';

if (!process.env.NEXT_PUBLIC_ADDRESS) {
  throw new Error('NEXT_PUBLIC_ADDRESS is required in .env');
}

const address = process.env.NEXT_PUBLIC_ADDRESS;

const Mint: FC = () => {
  const web3 = useSDK();
  const { collection } = useCollection();
  const [output, setOutput] = useState(<></>);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer | null>();

  const countDown = () => {
    // if (seconds > 10) {
    //   updateOutput('> Still working on it...');
    // }
    setSeconds((current) => current + 1);
  };

  const updateOutput = (output: string | React.ReactNode, newLine = false) => {
    setSeconds(0);
    if (timer) {
      setTimer(setInterval(countDown, 1000));
    } else {
      clearInterval(timer!);
      setTimer(setInterval(countDown, 1000));
    }

    setOutput((state) => (
      <>
        {state}
        <br />
        {newLine && <br />}
        {output}
      </>
    ));
  };

  useEffect(() => {
    const mint = async () => {
      updateOutput('> Multiplying artwork...');
      const nfts = await collection.generate();

      updateOutput('> Deploying contract...', true);
      const contractAddress = await web3?.deployer.deployNFTCollection({
        ...collection.properties,
        platform_fee_recipient: process.env.NEXT_PUBLIC_ADDRESS,
        seller_fee_basis_points: 100
      });

      if (contractAddress) {
        updateOutput('> Contract Address:', true);
        updateOutput(contractAddress);

        const contract = await web3?.getContract(
          contractAddress,
          'nft-collection'
        );

        contract?.royalties.setDefaultRoyaltyInfo({
          seller_fee_basis_points: 100, // 1%
          fee_recipient: address
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
    };

    mint();
  }, []);

  return (
    <div className={s.root}>
      <LoadingDots />
      <Text>Creating Collection</Text>
      <div className={s.output}>{output}</div>
    </div>
  );
};

export default Mint;
