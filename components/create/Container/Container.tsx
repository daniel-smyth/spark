'use client';

import { FC } from 'react';
import { useCollection } from '@app/create/context';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import s from './Container.module.css';
import { LoadingDots, Text } from '@components/ui';
import Upload from '../Upload';
import Properties from '../Properties';
import Mint from '../Mint';

const Container: FC = () => {
  const { collection } = useCollection();
  const address = useAddress();

  return (
    <>
      {address ? (
        <>
          {collection.artwork.length === 0 && <Upload />}
          {collection.artwork.length > 0 &&
            collection.properties.size === 0 && <Properties />}
          {collection.properties.size > 0 && <Mint />}
        </>
      ) : (
        <div className={s.connect}>
          <Text>Connect Wallet to Begin</Text>
          <ConnectWallet
            accentColor="#1b7dce"
            colorMode="light"
            auth={{
              loginConfig: {
                redirectTo: '/create'
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default Container;
