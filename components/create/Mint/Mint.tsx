'use client';

import { useSDK } from '@thirdweb-dev/react';
import { FC, useEffect } from 'react';
import { useCollection } from 'app/create/context';

if (!process.env.NEXT_PUBLIC_ADDRESS) {
  throw new Error('NEXT_PUBLIC_ADDRESS is required in .env');
}

const spark = process.env.NEXT_PUBLIC_ADDRESS;

const Mint: FC = () => {
  const sdk = useSDK();
  const { collection } = useCollection();

  useEffect(() => {
    const mint = async () => {
      const nfts = await collection.generate();

      const address = await sdk?.deployer.deployNFTCollection({
        ...collection.properties,
        platform_fee_recipient: process.env.NEXT_PUBLIC_ADDRESS,
        seller_fee_basis_points: 100
      });

      if (address) {
        const contract = await sdk?.getContract(address, 'nft-collection');

        contract?.royalties.setDefaultRoyaltyInfo({
          seller_fee_basis_points: 100, // 1%
          fee_recipient: spark
        });

        const tx = await contract?.mintBatchTo(
          collection.properties.primary_sale_recipient,
          nfts
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

  return <div>Minting artwork</div>;
};

export default Mint;
