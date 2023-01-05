'use client';

import { useSDK } from '@thirdweb-dev/react';
import { FC, useEffect } from 'react';
import { useCollection } from 'app/create/context';
import s from './Mint.module.css';

if (!process.env.NEXT_PUBLIC_ADDRESS) {
  throw new Error('NEXT_PUBLIC_ADDRESS is required in .env');
}

const address = process.env.NEXT_PUBLIC_ADDRESS;

const Mint: FC = () => {
  const sdk = useSDK();
  const { collection } = useCollection();

  useEffect(() => {
    const mint = async () => {
      const contractAddress = await sdk?.deployer.deployNFTCollection({
        ...collection.properties,
        primary_sale_recipient: address
      });

      if (contractAddress) {
        const contract = await sdk?.getContract(
          contractAddress,
          'nft-collection'
        );

        contract?.royalties.setDefaultRoyaltyInfo({
          seller_fee_basis_points: 100, // 1%
          fee_recipient: address
        });

        const tx = await contract?.mintBatchTo(
          collection.properties.recipient,
          collection.nfts
        );

        if (tx) {
          const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
          const firstTokenId = tx[0].id; // token id of the first minted NFT
          const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT

          console.log(receipt, firstTokenId, firstNFT);
        }
      }
    };

    mint();
  }, []);

  return (
    <>
      <div className={s.loading}>Minting artwork</div>
    </>
  );
};

export default Mint;
