'use client';

import { FC } from 'react';
import { useCollection } from '@app/create/context';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import s from './Form.module.css';
import Upload from '../Upload';
import Properties from '../Properties';
import Mint from '../Mint';

const CreateForm: FC = () => {
  const {
    collection: { artwork, properties }
  } = useCollection();
  const address = useAddress();

  return (
    <>
      {!address && (
        <div className={s.connect}>
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
      {address &&
        (artwork.length === 0 ? (
          <Upload />
        ) : properties.size === 0 ? (
          <Properties />
        ) : (
          <Mint />
        ))}
    </>
  );
};

export default CreateForm;
